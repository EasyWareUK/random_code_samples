/**
 * The AnnotationHandler is responsible for the communication of data between the other
 * controllers in the system that make use of annotations.
 * Author: Victor Amokeodo
 */

/*
 * License
 */

var OUANNOTATE = (function (OU, $) {

	/**
	 * @tags #PowerConstructor
	 */
	OU.AnnotationHandler = function (
			pinController, commentDialogController, filteringModel ) {

		var pub, priv, pinInit, dialogInit;  //private variables 

		//TODO: Deprecate these inits.  Use the power constructor instead.
		pinInit = pinController.init();
		dialogInit = commentDialogController.init();

		//PRIV IS AN ARRAY ....
		priv = {
			
			pinEventObject: null,
			
			commentDialogEventObject: null,
			
			annotationModelIndex: [], //increase-able array undex(????) 
			
			/**
			 * Maintain a map of collision hashes to CommentDialogModels populated with Pin and
			 * Annotation Models with the same collision hash
			 */
			collisionMap: {},
			
			/**
			 * Define the logic for a collision. Currently all annotations without highlights have a
			 * collision hash of bookmark, and everything else combines the fragment with start selector
			 */
			generateCollisionHash: function ( annotation ) 
			{
				
				if ( annotation.getSelection() == null ) 
				{
					return 'bookmark';
				
				/*
				 * Group selections with no address (dashboard) and selections with
				 * no elements (broken) under the broken pin
				 */
				} 
				else if ( annotation.getSelection().getAddress() == null || annotation.getSelection().getElements() == null ) 
				{
					return 'broken';
				} 
				else 
				{
					
					/*
					 * Group annotations by their start position
					 */
					return annotation.getSelection().getAddress().getStartSelector() +
					       annotation.getSelection().getAddress().getStartNodeIndex();
				}
			}
			
		};

		priv.pinEventObject = pinController.getEventObject();
		priv.commentDialogEventObject = commentDialogController.getEventObject();
		
		/**
		 * Bind to the filters changed and update all pins
		 */
		filteringModel.onChange(function () {
			
			$.each( priv.collisionMap, function ( key, dialogue ) {
				
				priv.pinEventObject.trigger( "onPinForDisplay", dialogue.getPinModel() );
				
			});
			
		});
		
		
		/*
		 * Update the pins and open dialogues when the window is resized
		 * 
		 * When this part of the system is refactored, this implementation will
		 * need to be reconsidered
		 */
		$( window ).resize(function () {
			
			$.each( priv.collisionMap, function ( key, dialogue ) {

				priv.pinEventObject.trigger(
						"onPinForDisplay", dialogue.getPinModel() );
				
				// If a pin has a comment placement, the dialogue is open
				if ( dialogue.getPinModel().getCommentPlacement() === "left" ||
				     dialogue.getPinModel().getCommentPlacement() === "right" ) {

					priv.commentDialogEventObject.trigger(
							"onCommentDialogForDisplay", dialogue );				
				}

			});
			
		});

		return (pub = {
			
			/**
			 * Returns a deferred object that resolves when its controllers are ready
			 */
			loading: function () {
				return $.when(pinInit, dialogInit);
			},
			
			/**
			 * Register a new annotation model with this handler
			 */
			addAnnotation: function ( annotation ) {

				var pin, collisionHash, commentDialog;

				collisionHash = priv.generateCollisionHash( annotation );

				if ( ! annotation.getID() ) throw OU.EXCEPTION.annotationIDNotSet();
				
				if ( $.inArray(annotation.getID(), priv.annotationModelIndex) !== -1 ) {
					throw "Annotation " + annotation.getID() + " added to handler twice";
				}

				if ( priv.collisionMap[ collisionHash ] === undefined ) {
					
					// @todo Testing that the AnnotationHandler is using the FilteredCommentDialogModel
					//       is very difficult without decoupling the collision logic
					priv.collisionMap[ collisionHash ] = OU.FilteredCommentDialogModel(
							OU.CommentDialogModel(),
							filteringModel );
							
					priv.collisionMap[ collisionHash ].setMyAnnotationModels( [] );
					priv.collisionMap[ collisionHash ].setSharedAnnotationModels( [] );
					
					/*
					 * Create a PinModel decorated with AnnotationPinModel to
					 * give it a consistent interface with AnnotationModel when
					 * editing.
					 * 
					 * This is then decorated with a FilteredPinModel to modify
					 * the output of getStates to factor in the current
					 * filtering active.
					 */
					pin = OU.FilteredPinModel(
						OU.AnnotationPinModel( OU.PinModel() ),
						filteringModel );
						
					pin.setID( collisionHash );
					
					if ( annotation.getAuthor() !== null ) {
						
						pin.addState( 'Unlocked' );							
						pin.setHighlight( annotation.getSelection() );
						
					}
					
					// Configure a click callback for this collision hash
					pin.setClickCallback( function () {
						priv.commentDialogEventObject.trigger( "onCommentDialogForDisplay", priv.collisionMap[ collisionHash ] );
						
						if ( priv.collisionMap[ collisionHash ].getMyAnnotationModels().length > 0 ) {
							priv.collisionMap[ collisionHash ].getMyAnnotationModels()[0].setActive();
						}
					});
					
					// Pin is only created the first time this collision hash is accessed
					priv.collisionMap[ collisionHash ].setPinModel( pin );
				}

				// Use a more legible reference to the comment dialog for this annotation
				commentDialog = priv.collisionMap[ collisionHash ];
				pin = commentDialog.getPinModel();
				
				/*
				 * Any time a current user annotation is added to this dialogue & pin,
				 * perform some updates, and subscribe to its events
				 */
				if ( annotation.getAuthor() == null ) {

					commentDialog.getMyAnnotationModels().push( annotation );
					
					// If this is the first current user annotation, update pin state
					if ( commentDialog.getMyAnnotationModels().length === 1 ) {
						pin.setHighlight( annotation.getSelection() );
						pin.setVisibility( annotation.getVisibility() );
						pin.addState( 'Mine' );
					}

					annotation.onChange(function () {

						// Only update the pin view if this is the top current user annotation
						if ( commentDialog.getMyAnnotationModels()[0] === annotation ) {
							pin.setVisibility( annotation.getVisibility() );
							priv.pinEventObject.trigger( "onPinForDisplay", pin );
						}
						
						// Always update the dialogue
						priv.commentDialogEventObject.trigger( "onCommentDialogForDisplay", commentDialog );

					});

					annotation.onRemove(function () {
						
						var myAnnos = commentDialog.getMyAnnotationModels();
						var annoIndex =  $.inArray(annotation, myAnnos);

						// Remove this annotation from the dialogue
						commentDialog.getMyAnnotationModels().splice( annoIndex, 1 );
						
						// Update the Pin State
						if ( commentDialog.getMyAnnotationModels().length === 0 ) {
							
							pin.removeState( 'Mine' );
							pin.removeState( 'Locked' );
							pin.addState( 'Unlocked' );
							
							if ( commentDialog.getSharedAnnotationModels().length === 0 ) {
								
								pin.removeState( 'NotHidden' );
								pin.addState( 'Hidden' );

							}
							
						} else {
							
							commentDialog.getPinModel().setVisibility(
									myAnnos[0].getVisibility() );
									
							myAnnos[0].setActive();
						}

						// Update the controllers
						priv.pinEventObject.trigger( "onPinForDisplay", pin );
						priv.commentDialogEventObject.trigger(
								"onCommentDialogForDisplay", commentDialog );
					});
					
				} else {
					commentDialog.getSharedAnnotationModels().push( annotation );	

					// Update the Pin Model if a shared annotation is added at any point
					commentDialog.getPinModel().addState( 'Shared' );
				}
				
				priv.pinEventObject.trigger( "onPinForDisplay", commentDialog.getPinModel() );

			}
			
		});

	};

	return OU;

}(OUANNOTATE || {}, jQuery));

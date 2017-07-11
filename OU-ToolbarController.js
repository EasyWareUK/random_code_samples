/**
 * A power constructor for the ToolbarController.
 *
 * Initialises the ViewContainer for the toolbar and provides actions for the
 * toolbar events to trigger. These actions will update the toolbar and
 * communicate with the models as required.
 *
 */

var OUANNOTATE = ( function ( OU, $ ) {	

	OU.ToolbarController = function (
			$containerElement, annotationDataFactory,
			filteringModel, defaultsModel, currentUserModel, viewLoader ) {

		// public interface object
		var pub;
		var	$toolbarView
		var priv = {
			
			disabled: false,
			
			newModel: false,
			
			modified: false,
			
			// Is set to false when a bookmark already exists
			bookmarking: true,
			
			buttonAction: function () {},
			
			/**
			 *
			 */
			setStateToNewModel: function () {
				
				$toolbarView.getComponentElement('CommentField').val( "" );
				$toolbarView.getComponentElement('TagsField').val( "Add tags" )
				$toolbarView.getComponentElement('VisibilityField').val( "private" )

				if ( priv.bookmarking ) {
					
					priv.buttonAction = function () {
						pub.getEventObject().trigger( "onBookmarkCreated" );
					};
					priv.setStateToUnmodified();
					$toolbarView.setComponentState( 'SubmitButton', 'Bookmark' );
					
				} else {
					priv.setStateToDisabled();
				}

				priv.newModel = true;
			},
			
			/**
			 *
			 */
			setStateFromModel: function ( annotationModel ) {

				$toolbarView.getComponentElement('CommentField').val( annotationModel.getComment() );
				$toolbarView.getComponentElement('TagsField').val( annotationModel.getTags() );
				$toolbarView.getComponentElement('VisibilityField').val( annotationModel.getVisibility() );
				$toolbarView.getComponentElement('HighlightColourField').find('input').removeAttr( 'checked' ).filter( '[value="' + annotationModel.getColour() + '"]' ).attr( 'checked', 'checked' );

				priv.setStateToUnmodified();
				$toolbarView.setComponentState( 'SubmitButton', 'Save' );
				
				priv.newModel = false;
			},
			
			/**
			 *
			 */
			setStateToModified: function () {
				
				// Enable a warning should the user navigate away
				OU.WINDOW.setAlertOnLocationChange( OU.DEFINITIONS.MESSAGE_UNSAVED_CHANGES_WILL_BE_LOST );

				$toolbarView.setComponentState( 'SubmitButton', 'Active' );
				priv.modified = true;
			},
			
			/**
			 *
			 */
			setStateToUnmodified: function () {
				OU.WINDOW.setAlertOnLocationChange( null );
				priv.setStateToEnabled();
				$toolbarView.setComponentState( 'SubmitButton', 'Inactive' );
				priv.modified = false;
				
			},
			
			/**
			 * This is currently repeating unmodified but at some point it will need
			 * to fully disabled the toolbar
			 */
			setStateToDisabled: function () {
				OU.WINDOW.setAlertOnLocationChange( null );
				$toolbarView.setComponentState( 'SubmitButton', 'Disabled' );
				
				$toolbarView.getComponentElement('CommentField')
				            .attr( "disabled", true )
				            .val( OU.DEFINITIONS.MESSAGE_TOOLBAR_DISABLED )
				            .addClass( "disabled" );

				$toolbarView.getComponentElement('TagsField')
				            .attr( "disabled", true )
				            .addClass( "disabled" );


				$toolbarView.getComponentElement('VisibilityField')
				            .attr( "disabled", true )
				            .addClass( "disabled" );
										
				priv.disabled = true;
			},
			
			/**
			 *
			 */
			setStateToEnabled: function () {
				
				$toolbarView.getComponentElement('CommentField')
				            .attr( "disabled", false )
				            .removeClass( "disabled" );
										
				$toolbarView.getComponentElement('TagsField')
				            .attr( "disabled", false )
				            .removeClass( "disabled" );
				
				$toolbarView.getComponentElement('VisibilityField')
				            .attr( "disabled", false )
				            .removeClass( "disabled" );
										
				priv.disabled = false;
			}
			
		};

		pub = {
			
			/**
			 *
			 */
			loading: function () {
				return viewLoader.loading();
			},

			/**
			 * Triggers:
			 * onBookmarkCreated
			 */
			getEventObject: function () {

				var eventObject = OU.EventObject();

				// Make this method static
				return ( pub.getEventObject = function () {
					return eventObject;
				} )();

			},


			addAnnotation: function ( annotationModel, setActive ) {
				
				if ( annotationModel.getType() === "bookmark" &&
				     annotationModel.getAuthor() == null ) {
					priv.bookmarking = false;
					
					/*
					 * Having discovered that bookmarking is no longer valid but
					 * currently active, disable the toolbar
					 */
					if ( priv.newModel ) {
						priv.setStateToDisabled();
					}
				}
				
				var activateAnnotation = function () {
					
					priv.setStateFromModel( annotationModel );
					
					// Set the button action
					priv.buttonAction = function () {
						annotationModel.update( pub.getToolbarData() ).done(function () {
							priv.setStateToUnmodified();
						});
					};

				};
				
				if ( setActive ) {
					activateAnnotation();
				}
				
				annotationModel.onActive( activateAnnotation );
				
				annotationModel.onChange(function () {
					$toolbarView.getComponentElement('VisibilityField').val( annotationModel.getVisibility() );
				});
				
				annotationModel.onRemove(function () {

					if ( annotationModel.getType() === "bookmark" &&
							 annotationModel.getAuthor() == null ) {
						priv.bookmarking = true;
					}
					
					priv.setStateToNewModel();

				});
				
			},
			
			/**
			 *
			 */
			getToolbarData: function () {
				
				var data = annotationDataFactory.create();

				data.set({
					Comment:  $toolbarView.getComponentElement('CommentField').val(),
					Tags:  $toolbarView.getComponentElement('TagsField').val(),
					Visibility: $toolbarView.getComponentElement('VisibilityField').val(),
					Colour: $toolbarView.getComponentElement('HighlightColourField').find('input:checked').val(),
					SecurityID: $toolbarView.getComponentElement('SecurityID').val()
				});

				return data;				
			}

		};
		
		// Loading is complete so setup events and actions
		pub.loading().done(function () {
			
			$toolbarView = OU.ViewContainer(
					viewLoader.getHtml(), viewLoader.getLayout() );

			// Make the initial bindings for view components
			(function () {
				
				var inputFields = [
					$toolbarView.getComponentElement( "CommentField" ),
					$toolbarView.getComponentElement( "TagsField" )
				];

				$(inputFields).each(function( key, $inputField ) {
					$inputField.keydown( function () {
						priv.setStateToModified();
					})
				});
				
				// Visibility Field
				$toolbarView.getComponentElement( "VisibilityField" ).change(function () {
					priv.setStateToModified();
				});
				
				// Colour field
				$toolbarView.getComponentElement( "HighlightColourField" ).find( "input" ).click(function () {

					if ( !priv.disabled ) {
						priv.setStateToModified();
					}

					defaultsModel.setDefaultColour( $(this).val() );
				});
				
				// Click event for submit button
				$toolbarView.getComponentElement( 'SubmitButton' ).click(function () {
					if ( priv.modified && !priv.disabled ) {
						priv.buttonAction();
					}
				});
				
				// Set the management link href
				$toolbarView.getComponentElement( 'ManagementLink' )
						.attr( 'href', OU.DEFINITIONS.URI_DASHBOARD )
						.attr( 'target', '_blank' );
				// Set the close button href (makes tabbable)
				$toolbarView.getComponentElement( 'CloseButton' )
						.attr( 'href', '#' )
						.attr( 'target', '_blank' );
				// Set the close button action
				$toolbarView.getComponentElement( 'CloseButton' ).click(function () {
					if ( OU.WINDOW.confirm(OU.DEFINITIONS.MESSAGE_EXIT_CONFIRM) ) {
						window.location.reload( true );
					}
					return false;
				});
				
				priv.setStateToNewModel();
				
				$containerElement.append( $toolbarView );
				
			}());
			
			/*
			 * Set up the filtering fields to be checked by default, and to trigger
			 * onFiltersChanged with a ToolbarFiltersModel reflecting their current
			 * state when either is clicked
			 */
			(function () {
				
				var filterFields = [];
				filterFields.push( $toolbarView.getComponentElement('MyCommentsFilterField') );
				filterFields.push( $toolbarView.getComponentElement('SharedCommentsFilterField') );

				var filterTimeoutId;

				$.each( filterFields, function (key, $filter) {

					// Checked by default
					$filter.attr('checked',true);

					// Click event
					$filter.change(function () {

						// Set a 1000ms delay on the timeout
						window.clearTimeout( filterTimeoutId );

						filterTimeoutId = window.setTimeout(function () {

							if ( filterFields[0].is(':checked') ) {
								filteringModel.showMine( true );
							} else {
								filteringModel.showMine( false );
							}

							if ( filterFields[1].is(':checked') ) {
								filteringModel.showTheirs( true );
							} else {
								filteringModel.showTheirs( false );
							}
							
							/*
							 * @TODO The toolbar shouldn't assume that we are closing all
							 * the dialogues (and thus needing default state again).
							 * 
							 * When the Dialogues have been updated to the pubsub model fully,
							 * they can trigger a deactivate() on the current annotation,
							 * which will cause this behaviour more reactively.
							 */
							priv.setStateToNewModel();

						}, 1000);

					});	
				});
				
			}());
			

			/**
			 * Subscribe to when the currentUserModel has completed the handshaking,
			 * then populate the visibility drop down with groups for the current
			 * user.
			 * 
			 * Also set up the href for the help page links
			 */
			(function () {
				
				currentUserModel.handshaking().done(function () {
					
					var $visibilityField = $toolbarView.getComponentElement( "VisibilityField" );
					$visibilityField.find( "option" ).remove();

					$visibilityField.append( $('<option value="private">Private</option>' ) );

					if ( currentUserModel.getGroups() ) {

						$.each( currentUserModel.getGroups(), function ( key, group ) {
							$visibilityField.append( $('<option value="' + group.ID + '">' + group.Title + '</option>' ) );
						} );

					}
					
					$toolbarView.getComponentElement('SecurityID').attr('value', currentUserModel.getSecurityID());

					$visibilityField.append( $('<option value="public">Public</option>' ) );
					
					// Set the help link href
					$toolbarView.getComponentElement( 'HelpLink' )
							.attr( 'href', OU.DEFINITIONS.URI_HELP_PAGE )
							.attr( 'target', '_blank' );
					
				});
				
			}());
			
		});
		
		return pub;
	};

	return OU;
	
} ( OUANNOTATE || {}, jQuery ) );

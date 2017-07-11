/**
 * A bootstrap script to load and initialise the OUAnnotate Bookmarklet
 *
 * Begins by loading jQuery, then uses jQuery to load the bookmarklet src files.
 * Finally initialises the entry controller to begin the app.
 *
 */
var OUANNOTATE = OUANNOTATE || {};

( function ( window, document ) {

	// Ensure the bootstrap will only run once 
	if ( OUANNOTATE.BASE_URL != null ) {
		return;
	}
	
	var onBootstrapComplete = function () {
		
		rangy.init();

		var dep = OUANNOTATE.Dependencies();
		$( "body" ).append( dep.ContainerElement() );
		
		// Notify the user if the browser is running in quirks mode
		if ( document.compatMode === "BackCompat" || document.getElementsByTagName('FrameSet').length > 0) {
			dep.NotificationHelper().warning(
					OUANNOTATE.DEFINITIONS.MESSAGE_QUIRKS_MODE );
		}
		
		var app = OUANNOTATE.OUAnnotate(
				dep.CurrentUserModel(), dep.ToolbarController(),
				dep.AnnotationHandler(),
				dep.AnnotationFactory(), dep.AnnotationDataFactory(),
				dep.SelectionFactory(), dep.DocumentEvents(),
				dep.NodeFactory() );

		// Restore existing jquery state
		window.jQuery.noConflict(true);
	};

	var onJQueryLoaded = function ( $ ) {

		OUANNOTATE.jQueryVersion = $.fn.jquery;
		$( '<link>' ).appendTo( 'head' ).attr({
			rel: 'stylesheet',
			type: 'text/css',
			href: OUANNOTATE.BASE_URL+'/bookmarklet/css/ouannotate.css'// + '?' + new Date().getTime()
		});

		$.when(

			// Load functionality missing from older browsers.
			$.getScript( OUANNOTATE.BASE_URL+'/bookmarklet/js/OUAnnotate/Common.js' ),

			// Load thirdparty files
			$.getScript( OUANNOTATE.BASE_URL+'/bookmarklet/thirdparty/easyXDM/easyXDM.min.js' ),
			
			// Only load json lib if it isn't natively supported
			$.Deferred(function ( deferred ) {

				if ( window["JSON"] && typeof( window["JSON"] ) === 'object' ) {

					deferred.resolve();

				} else {

					$.getScript( OUANNOTATE.BASE_URL+'/bookmarklet/thirdparty/easyXDM/json2.js', function () {
						deferred.resolve();
					});

				}
			}),
			
			$.getScript( OUANNOTATE.BASE_URL+'/bookmarklet/thirdparty/rangy-core.js' ),
			
			/*
			 * If a file does not exist the app will fail silently. Consequently this
			 * list should be kept alphabetised and grouped by starting letter,
			 * not application context, so it is easy to identify missing files
			 */
			$.getScript( OUANNOTATE.BASE_URL+'/bookmarklet/js/OUAnnotate/AnnotationData.js' ),
			$.getScript( OUANNOTATE.BASE_URL+'/bookmarklet/js/OUAnnotate/AnnotationDataFactory.js' ),
			$.getScript( OUANNOTATE.BASE_URL+'/bookmarklet/js/OUAnnotate/AnnotationFactory.js' ),
			$.getScript( OUANNOTATE.BASE_URL+'/bookmarklet/js/OUAnnotate/AnnotationGroup.js' ),
			$.getScript( OUANNOTATE.BASE_URL+'/bookmarklet/js/OUAnnotate/AnnotationGroupFactory.js' ),
			$.getScript( OUANNOTATE.BASE_URL+'/bookmarklet/js/OUAnnotate/AnnotationHandler.js' ),
			$.getScript( OUANNOTATE.BASE_URL+'/bookmarklet/js/OUAnnotate/AnnotationModel.js' ),
			$.getScript( OUANNOTATE.BASE_URL+'/bookmarklet/js/OUAnnotate/AnnotationPinModel.js' ),
			$.getScript( OUANNOTATE.BASE_URL+'/bookmarklet/js/OUAnnotate/AnnotationService.js' ),
			$.getScript( OUANNOTATE.BASE_URL+'/bookmarklet/js/OUAnnotate/AuthorModel.js' ),
			
			$.getScript( OUANNOTATE.BASE_URL+'/bookmarklet/js/OUAnnotate/CommentDialogController.js' ),
			$.getScript( OUANNOTATE.BASE_URL+'/bookmarklet/js/OUAnnotate/CommentDialogModel.js' ),
			$.getScript( OUANNOTATE.BASE_URL+'/bookmarklet/js/OUAnnotate/CurrentUserModel.js' ),
			
			$.getScript( OUANNOTATE.BASE_URL+'/bookmarklet/js/OUAnnotate/DefaultsModel.js' ),
			$.getScript( OUANNOTATE.BASE_URL+'/bookmarklet/js/OUAnnotate/Dependencies.js' ),
			$.getScript( OUANNOTATE.BASE_URL+'/bookmarklet/js/OUAnnotate/DocumentEvents.js' ),
			
			$.getScript( OUANNOTATE.BASE_URL+'/bookmarklet/js/OUAnnotate/EventObject.js' ),
			
			$.getScript( OUANNOTATE.BASE_URL+'/bookmarklet/js/OUAnnotate/FilteredAnnotationGroup.js' ),
			$.getScript( OUANNOTATE.BASE_URL+'/bookmarklet/js/OUAnnotate/FilteredCommentDialogModel.js' ),
			$.getScript( OUANNOTATE.BASE_URL+'/bookmarklet/js/OUAnnotate/FilteredDocumentEvents.js' ),
			$.getScript( OUANNOTATE.BASE_URL+'/bookmarklet/js/OUAnnotate/FilteredPinModel.js' ),
			$.getScript( OUANNOTATE.BASE_URL+'/bookmarklet/js/OUAnnotate/FilteringModel.js' ),
			
			$.getScript( OUANNOTATE.BASE_URL+'/bookmarklet/js/OUAnnotate/JsonpViewLoader.js' ),
			
			$.getScript( OUANNOTATE.BASE_URL+'/bookmarklet/js/OUAnnotate/NodeFactory.js' ),
			$.getScript( OUANNOTATE.BASE_URL+'/bookmarklet/js/OUAnnotate/NodeMapHelper.js' ),
			$.getScript( OUANNOTATE.BASE_URL+'/bookmarklet/js/OUAnnotate/NodeModel.js' ),
			$.getScript( OUANNOTATE.BASE_URL+'/bookmarklet/js/OUAnnotate/NotificationHelper.js' ),
			
			$.getScript( OUANNOTATE.BASE_URL+'/bookmarklet/js/OUAnnotate/OUAnnotate.js' ),
			$.getScript( OUANNOTATE.BASE_URL+'/bookmarklet/js/OUAnnotate/OUAnnotateDefinitions.js' ),
			$.getScript( OUANNOTATE.BASE_URL+'/bookmarklet/js/OUAnnotate/OUAnnotateException.js' ),
			
			$.getScript( OUANNOTATE.BASE_URL+'/bookmarklet/js/OUAnnotate/PinController.js' ),
			$.getScript( OUANNOTATE.BASE_URL+'/bookmarklet/js/OUAnnotate/PinModel.js' ),
			$.getScript( OUANNOTATE.BASE_URL+'/bookmarklet/js/OUAnnotate/PubSub.js' ),
			
			$.getScript( OUANNOTATE.BASE_URL+'/bookmarklet/js/OUAnnotate/RangeAddress.js' ),
			$.getScript( OUANNOTATE.BASE_URL+'/bookmarklet/js/OUAnnotate/RangeAddressHelper.js' ),
			$.getScript( OUANNOTATE.BASE_URL+'/bookmarklet/js/OUAnnotate/Rest.js' ),
			
			$.getScript( OUANNOTATE.BASE_URL+'/bookmarklet/js/OUAnnotate/Selection.js' ),
			$.getScript( OUANNOTATE.BASE_URL+'/bookmarklet/js/OUAnnotate/SelectionFactory.js' ),
			$.getScript( OUANNOTATE.BASE_URL+'/bookmarklet/js/OUAnnotate/SelectionValidator.js' ),
			
			$.getScript( OUANNOTATE.BASE_URL+'/bookmarklet/js/OUAnnotate/ToolbarController.js' ),
			
			$.getScript( OUANNOTATE.BASE_URL+'/bookmarklet/js/OUAnnotate/UserService.js' ),
			
			$.getScript( OUANNOTATE.BASE_URL+'/bookmarklet/js/OUAnnotate/ViewContainer.js' ),

			$.getScript( OUANNOTATE.BASE_URL+'/bookmarklet/js/OUAnnotate/Window.js' ),

			// DOM ready deferred object
			$.Deferred(function ( deferred ) {
				$( deferred.resolve );
			})

		).done(function () {
			onBootstrapComplete();
		});
	};

	/**
	 * Begin the bootstrapping with a self calling anonymous function
	 */
	(function ( window, document ) {

		var b = document.getElementById('ou_a_b');
		OUANNOTATE.BASE_URL = b.src.split('/').slice(0,4).join('/');

		var s = document.createElement( 'script' );
		s.src = OUANNOTATE.BASE_URL+'/bookmarklet/thirdparty/jquery-1.5.2.js';
		s.onload = s.onreadystatechange = function () {
			var readyState;
			if ( !( readyState = s.readyState ) || readyState === 'loaded' || readyState === 'complete' ) {
				var $ = window.jQuery;
				$(b).remove();
				$(s).remove();
				onJQueryLoaded($);
			}
		};
		document.body.appendChild( s );

	}( window, document ));

} ( window, document ) );

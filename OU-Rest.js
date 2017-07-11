/**
 * The REST object is static method interface encapsulating the chosen
 * client server cross domain communication mechanism.
 *
 * See http://easyxdm.net/ for more information
 *
 * Changes to the signature of this interface will need to be mirrored in
 * tests/js/RestMocker.js
 *
 */

var OUANNOTATE = ( function ( OU, $ ) {

	/**
	 * A static function for getting an easyXDM XHR object
	 */
	var getXhrObject = function () {

		/**
		 * This defines the remote script to handle cross domain, and
		 * a method that will be accessible on that script (request)
		 */
		xhrObject = new easyXDM.Rpc( {
			remote: OU.DEFINITIONS.EASYXDM_PROVIDER,
			swf: OU.DEFINITIONS.EASYXDM_SWF
		}, {
			remote: {
				request: {}
			}
		});

		return ( getXhrObject = function () {
			return xhrObject;
		} )();
	};

	OU.REST = {

		/**
		 * Perform get request
		 */
		get: function ( url, params, onSuccess, onFail ) {

			var xhr = getXhrObject();

			xhr.request(
			
				/**
				 * First argument is request object; properties include:
				 * 
				 * url
				 * method
				 * data - plain object
				 *
				 * There may be more options available in full docs
				 */
				{
					url: url,
					method: "GET",
					data: params
				},

				/**
				 * Success callback passes response object with properties:
				 *
				 * status - HTTP status code
				 * headers - Headers from response
				 * data - Data received from server
				 */
				function( response ) {

					onSuccess( $.parseJSON(response.data), response.status );

				},

				/**
				 * Error callback passes object with properties:
				 *
				 * code - Error code as created by easyXDM (not HTTP status code)
				 * message - Error type as defined by easyXDM
				 * data - Response object with properties:
				 *
				 *		status - HTTP status code
				 *		data - Data received from server
				 */
				function ( error ) {
					alert(error.data.status);
					onFail();
				}
			);
		},

		/**
		 * Perform post request
		 */
		post: function (url,data,onSuccess,onFail) {

			var xhr = getXhrObject();

			xhr.request( {
					url: url,
					data: data,
					method: "POST"
				},

				function( response ) {
					onSuccess( $.parseJSON(response.data), response.status );
				},

				function ( error ) {
					alert(error.data.status);
					for ( var i in error.data ) {
						alert( error.data[i] );
					}
					onFail();
				}
			);
		},

		/**
		 * Perform put request
		 */
		put: function ( url, id, data, onSuccess, onFail ) {

			data.ID = id;

			var xhr = getXhrObject();

			xhr.request( {
					url: url,
					data: data,
					method: "PUT"
				},

				function( response ) {
					onSuccess( $.parseJSON(response.data), response.status );
				},

				function ( error ) {
					alert(error.data.status);
					onFail();
				}
			);
		},
		
		
		/**
		 * Perform delete request
		 */
		del: function ( url, id, data, onSuccess, onFail ) {

			data.ID = id;

			var xhr = getXhrObject();

			xhr.request( {
					url: url,
					data: data,
					method: "DELETE"
				},

				function( response ) {
					onSuccess( $.parseJSON(response.data), response.status );
				},

				function ( error ) {
					alert(error.data.status);
					onFail();
				}
			);
		}

	};

	return OU;

} ( OUANNOTATE || {}, jQuery ) );

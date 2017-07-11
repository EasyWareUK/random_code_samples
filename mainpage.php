
	

        <script src="js/plugins.js"></script>

		<!-- Bootstrap JS CDN -->
		<!-- script src="js/bootstrap.min.js"></script -->
		<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js" integrity="sha384-Tc5IQib027qvyjSMfHjOMaLkfuWVxZxUPnCJA7l2mCWNIpG9mGCD8wGNIcPD7Txa" crossorigin="anonymous"></script>
		<!-- Bootstrap JS local fallback -->
		<script>if(typeof($.fn.modal) === 'undefined') {document.write('<script src="js/bootstrap.min.js"><\/script>')}</script>

		<!-- script to allow mobile swiping -->
		<script src="js/jquery.mobile.custom-touch-only.min.js"></script>
		
		
		<!-- Script to Activate the Carousel -->
		<script>
		/*
		console.log("starting carousel...");
		$('.carousel').carousel({
			interval: 5000 //changes the speed
		})
		*/
		</script>
	
        <!-- Google Analytics: change UA-XXXXX-X to be your site's ID. -->
        <script>
            (function(b,o,i,l,e,r){b.GoogleAnalyticsObject=l;b[l]||(b[l]=
            function(){(b[l].q=b[l].q||[]).push(arguments)});b[l].l=+new Date;
            e=o.createElement(i);r=o.getElementsByTagName(i)[0];
            e.src='https://www.google-analytics.com/analytics.js';
            r.parentNode.insertBefore(e,r)}(window,document,'script','ga'));
            ga('create','UA-XXXXX-X','auto');ga('send','pageview');
        </script>
		
		

		
		<script>
			var app = angular.module("myApp", ["ngRoute"]);
			app.config(function($routeProvider) 
			{
				$routeProvider
			    .when("/", {
			        templateUrl : "main_fcp.php"
			    })
			    .when("/login", {
					controller: 'loginCtrl',
			        templateUrl : "loginform_fcp.php",
					hrActiveTab : "logintab1"
			    })
			    .when("/logintab1", {
					controller: 'loginCtrl',
			        templateUrl : "loginform_fcp.php",
					hrActiveTab : "logintab1"
			    })
			    .when("/register", {
					controller: 'loginCtrl',
			        templateUrl : "loginform_fcp.php",
					hrActiveTab : "register"
			    })
			    .when("/resendpw", {
					controller: 'loginCtrl',
			        templateUrl : "loginform_fcp.php",
					hrActiveTab : "resendpw"
			    })
			    .when("/changepassword", { 
					controller: 'loginCtrl',
			        templateUrl : "changepassword_fcp.php"
			    })
				.when("/logout", {
					controller: 'logoutCtrl',
			        templateUrl : "logout_fcp.php"
			    })
				.when("/logout2", {
			        templateUrl : "logout_fcp.php"
			    })
				.when("/searchresult", {
			        //templateUrl : "mobile_search_result_fcp.php?endage=78&searchingfor=female_male&startage=18&formname=searchForm"
					controller: 'searchResultCtrl',
					 templateUrl : function(params) {
										//console.log("query string =  " + JSON.stringify($scope.searchform));
										console.log("params =  " + params);
										//console.log("location =  " + params);
										var qryStr = "";
										for (prop in params) 
										{
											//console.log("**** " + prop + " = " + params[prop] + "\n");
											qryStr += (prop + "=" + params[prop] + "&")
										}
										console.log("qryStr = " + qryStr);
										return 'mobile_search_result_fcp.php?' + qryStr;
									}
			    })

			    .when("/advancedsearch", {
					controller: 'viewAmendCtrl',
			        templateUrl : "advanced_search_fcp.php"
			    })
				.when("/profile", {
					controller: 'viewAmendCtrl',
			        templateUrl : "mobile_view_account_fcp.php"
			    })
			    .when("/amend_account", {
					// do not specify ng-controller directive in html pege you are loading in ng-view, if you are using routes)
					controller: 'viewAmendCtrl',
					templateUrl : "mobile_amend_account_fcp.php"
					
			    })
			    .when("/inbox", {
					templateUrl : function(params) {
										//console.log("Inbox params =  " + params);
										var qryStr = "";
										for (prop in params) 
										{
											qryStr += (prop + "=" + params[prop] + "&")
										}
										console.log("inbox qryStr = " + qryStr);
										return 'mailbox_fcp.php?' + qryStr;
									}

			    })
				.when("/openmail", {
					controller: 'openmailCtrl',
					templateUrl : function(params) {
										//console.log("openmail params =  " + params);
										var qryStr = "";
										for (prop in params) 
										{
											qryStr += (prop + "=" + params[prop] + "&")
										}
										console.log("openmail qryStr = " + qryStr);
										return 'openmail_fcp.php?' + qryStr;
									}

			    })
				.when("/sendresponse", {
			        templateUrl : "sendresponse_fcp.php"
			    })
				.when("/statistics", {
			        templateUrl : "statistics_fcp.php"
			    })
				.when("/favourites", {
					controller: 'searchResultCtrl',
					templateUrl : function(params) {
										var qryStr = "";
										for (prop in params) 
										{
											qryStr += (prop + "=" + params[prop] + "&")
										}
										console.log("qryStr = " + qryStr);
										return 'favourites_fcp.php?' + qryStr;
									}
			    })
				.when("/fans", {
					controller: 'searchResultCtrl',
					templateUrl : function(params) {
										var qryStr = "";
										for (prop in params) 
										{
											qryStr += (prop + "=" + params[prop] + "&")
										}
										console.log("qryStr = " + qryStr);
										return 'fans_fcp.php?' + qryStr;
									}
			    })
			
			
			
			
			
			    .when("/hr", {
			        templateUrl : "hr_angular.html",
					subhead : "hr"
			    })
			    .when("/hr", {
			        templateUrl : "hr_angular.html",
					subhead : "hr",
					hrActiveTab : "hrtab1"
			    })
			    .when("/hrPricingTab", {
			        templateUrl : "hr_angular.html",
					subhead : "hr",
					hrActiveTab : "hrPricingTab"
			    })
			    .when("/tv", {
			        templateUrl : "tv_angular.html",
					subhead : "tv"
			    })
			    .when("/faq", {
			        templateUrl : "faq_angular.php",
					subhead : "faq"
			    })
			    .when("/downloads", {
			        templateUrl : "downloads_angular.html",
					subhead : "downloads"
			    })
			    .when("/buy", {
			        templateUrl : "buy_angular.html",
					subhead : "",
					buyActiveTab : "buytab1"
			    })
				.when("/buyHRM", {
			        templateUrl : "buy_angular.html",
					subhead : "",
					buyActiveTab : "buytab1"
			    })
				.when("/buyB2B", {
			        templateUrl : "buy_angular.html",
					subhead : "",
					buyActiveTab : "buytab2"
			    })
			    .when("/contact-us", {
			        templateUrl : "contact-us_fcp.html"
			    })
			}).run(['$rootScope', '$http', '$browser', '$timeout', "$route", "$window", "$location", "$httpParamSerializerJQLike",  function ($scope, $http, $browser, $timeout, $route, $window, $location, $httpParamSerializerJQLike) {
				
				
				$scope.$on("$routeChangeSuccess", function (scope, next, current) {
					
					$scope.collapseNavBar();
					$("html, body").animate({ scrollTop: 0 }, "slow");
					//console.log("$route.current.templateUrl = " + $route.current.templateUrl);
					if($route.current.templateUrl == "mobile_amend_account_fcp.php")
					{
						//console.log("calling getProfileFromDB from routeChangeSuccess");
						//getProfileFromDB();
						//console.log("calling getProfileFromDB from routeChangeSuccess 2222");
					}
					
					$scope.theUrl = $route.current.templateUrl;
					$scope.submenu = $route.current.submenu;
					$scope.hrActiveTab = $route.current.hrActiveTab;
					$scope.buyActiveTab = $route.current.buyActiveTab;
					$scope.location = $window.location.href;
					if($scope.location.search)
					{
						/*
						var obj = $window.location.search;
						for (prop in obj) 
						{
							console.log("--- " + prop + " = " + obj[prop] + "\n");
						}
						*/
					}
				});
				
				$scope.$on('$viewContentLoaded', function() {
					if($route.current.templateUrl == "statistics_fcp.php")
					{
						//This scope is actually the rootscope!!!
						console.log("deleting $rootScope.newMessages = " + $scope.newMessages);
						$scope.newMessages = "";
						console.log("deleted $rootScope.newMessages = " + $scope.newMessages);
					}
				});
				$scope.$on("$locationChangeStart", function (scope, next, current) {
					/*
					if($route.current.templateUrl == "mobile_search_result_fcp.php")
					{
						$window.location.path += JSON.stringify($scope.searchform);
						//$route.reload();
					}*/
					//console.log("starting location.search() = " + $location.search());
				});
				
				
				
				// onclick event handlers
				$scope.showForm = function () {
					$('.contactRow').slideToggle();
				};
				$scope.closeForm = function () {
					$('.contactRow').slideUp();
				};
				
				$scope.collapseNavBar = function($event){
					 if ($('.navbar-collapse').hasClass('in')) {
						$('.navbar-collapse').collapse('hide');
					}
				};
			}]);
			
			
			app.filter("trust", ['$sce', function($sce) {
				return function(htmlCode){
					return $sce.trustAsHtml(htmlCode);
				}
			}]);
			

			
			app.directive('fileUpload', function () {
				return {
					scope: true,        //create a new scope
					link: function (scope, el, attrs) {
						el.bind('change', function (event) {
							var files = event.target.files;
							//iterate files since 'multiple' may be specified on the element
							for (var i = 0;i<files.length;i++) {
								//emit event upward
								scope.$emit("fileSelected", { file: files[i] });
							}                                       
						});
					}
				};
			});
			
			app.directive('file', function () {
			return {
				scope: {
					file: '='
				},
				link: function (scope, element, attrs) {
						element.bind('change', function (event) {
							var file = event.target.files[0];
							scope.file = file ? file : undefined;
							scope.$apply();
						});
					}
				};
			});


			
		
			app.controller('myCtrl', function($rootScope, $scope, $http, $httpParamSerializerJQLike, $window) {
				//$scope.home = true;
				$scope.message = {};
				
				
				// save the 'Contact Us' form
				$scope.submitMessage = function () {
					//$scope.loaded = true;
					//$scope.process = true;
					console.log("submitting message.name -> " + $scope.message.name);
					
					var req = {
							method: 'POST',
							url: 'sendmail_easyware.php',
 							headers: {'Content-Type': 'application/x-www-form-urlencoded'},
							data: $httpParamSerializerJQLike($scope.message)
							//data: 'name=xxx'
						}

					$http(req).then(function successCallback(response) {
							// this callback will be called asynchronously
							// when the response is available
							console.log(response);
							console.log(response.data);
							console.log(response.data.errors);
							
							$scope.success = true;
							$scope.process = false;
							$scope.message = {};
							
						}, function errorCallback(response) {
							// called asynchronously if an error occurs
							// or server returns response with an error status.
						});
				};
				
				
				
				
				
				// submit general forms
				$scope.submitForm = function (theForm, theTarget, formData) {
					//$scope.loaded = true;
					//$scope.process = true;
					console.log("submitting searchform.searchingfor -> " + $scope.searchform.searchingfor);
					
					var req = {
							method: 'POST',
							url: theTarget,
 							headers: {'Content-Type': 'application/x-www-form-urlencoded'},
							data: $httpParamSerializerJQLike($scope.searchform)
							//data: 'name=xxx'
						}

					$http(req).then(function successCallback(response) {
							// this callback will be called asynchronously
							// when the response is available
							console.log(response);
							console.log(response.data);
							console.log(response.data.errors);
							
							$scope.success = true;
							$scope.process = false;
							$scope.searchform = {};
							
						}, function errorCallback(response) {
							// called asynchronously if an error occurs
							// or server returns response with an error status.
						});
				};

				

				$scope.submit = function(event) {
							event.preventDefault();
							
							$scope.searchform.formname = "searchForm";
							data = $httpParamSerializerJQLike($scope.searchform)
							console.log("data = " + data);
							$window.location.href="#!/searchresult?" + data
							//$window.location.href="#!/searchresult"
							//$window.location.search = JSON.stringify($scope.searchform);
				};


				//**********************************************//
				//	GLOBAL VARIABLES
				//**********************************************//
				//Mail + favourites/Likes
				//prototypical inheritance problem: In order to make child scopes have access to root/parent scopes, always use '.' (dot separators) in your variables

				$rootScope.unreadMail = "<?php echo $_SESSION['unreadMail']; ?>";
				$rootScope.newMessages = "<?php echo $_SESSION['new_message']; ?>";
				
				$scope.login = {
					username: "<?php echo $_SESSION['username']; ?>",
					regid: "<?php echo $_SESSION['regid']; ?>"
				}
				
				//$scope.login.username = "<?php echo $_SESSION['username']; ?>";
				//$scope.login.regid = "<?php echo $_SESSION['regid']; ?>";
				//**********************************************//


			});


	
			app.controller('viewAmendCtrl', function($scope, $http, $httpParamSerializerJQLike, $window, $templateCache) {
				
				$scope.updateprofile = {};
				//$scope.updateprofile.gender = "male";
				
				$scope.$on('$viewContentLoaded', function() {
						$templateCache.removeAll();
						$scope.getProfileFromDB();
					});
				
				$scope.getProfileFromDB = function () { 
					var req = {
							method: 'POST',
							url: 'ajaxcalls/getprofile_fcp.php',
 							headers: {'Content-Type': 'application/x-www-form-urlencoded'}
							//data: $httpParamSerializerJQLike($scope.message)
							//data: 'name=xxx'
						}
						
						

					$http(req).then(function successCallback(response) {

							$scope.updateprofile = response.data;
							
							$scope.updateprofile.languagesArray = response.data.languages.split("\n");
							//$scope.updateprofile.lookingforArray = response.data.lookingfor.split("\n");
							
							var lookingforArray = response.data.lookingfor.split("\n");
							
							$scope.updateprofile.looking_male = (lookingforArray.indexOf("male") != -1); //false; //
							$scope.updateprofile.looking_female = (lookingforArray.indexOf("female") != -1);;
							


							
							var obj = $scope.updateprofile;
							    for (prop in obj) 
								{
									try
									{
										//console.log("--- " + prop + " = " + obj[prop] + "\n");
										//$scope.updateprofile.prop = response.data.prop;
									}
									catch(err)
									{
										console.log("Error: " + err);
									}
								}
								
								
								//$scope.$apply();
						}, function errorCallback(response) {
							// called asynchronously if an error occurs
							// or server returns response with an error status.
						});
				};
				
				
				$scope.do_amendProfile = function()
				{
					console.log("$scope.files = " + $scope.files);
					
					console.log("$scope.updateprofile.source = " + $scope.updateprofile.source);
					$scope.updateprofile.source = "amend account";
					$scope.updateprofile.languagelist = $scope.updateprofile.languagesArray;
					
					
					if ($scope.files == undefined)
					{
						tmpData = {};
					}
					else
					{
					
						var ErrorObj = $scope.files;
						dataSize = -1;
						for (prop in ErrorObj) 
						{
							dataSize++;
							
							try
							{
								console.log("--- " + prop + " = " + ErrorObj[prop] + "\n");
								ErrStr += (ErrorObj[prop] + ".\n ");
								
								tmpData["upload" + dataSize] = $scope.files[dataSize];
							}
							catch(err)
							{
								console.log("Error: " + err);
							}
						}
					
					}
					var req = {
							method: 'POST',
							url: 'ajaxcalls/do_register_fcp.php',
							 headers: {
								'Content-Type': undefined
							},
							data: tmpData,
							/*
							data: {
								'upload0': $scope.files[0],
								'upload1': $scope.files[1],
								'upload2': $scope.files[2],
								'upload3': $scope.files[3],
								'upload4': $scope.files[4],
								'upload5': $scope.files[5]
							},
							*/
							transformRequest: function (data) {
								//data.concat($httpParamSerializerJQLike($scope.updateprofile));
								var formData = new FormData();
								angular.forEach(data, function (value, key) {
									//console.log(key + "xxx=xxx" + value);
									formData.append(key, value);
								});
								angular.forEach($scope.updateprofile, function (value, key) {
									//console.log(key + "yyy=yyy" + value);
									formData.append(key, value);
								});
								return formData;
							}
						}

					$http(req).then(function successCallback(response) {
							var ErrorObj = response.data.errors;
							var ErrorLen = Object.keys(ErrorObj).length;
							console.log("ErrorLen = " + ErrorLen);
							var ErrStr = "";
							if(ErrorLen > 0)
							{
								for (prop in ErrorObj) 
								{
									try
									{
										console.log("--- " + prop + " = " + ErrorObj[prop] + "\n");
										ErrStr += (ErrorObj[prop] + ".\n ");
									}
									catch(err)
									{
										console.log("Error: " + err);
									}
								}
								
								//$scope.login.error = ErrStr;
								openContentDialog(ErrStr, "Amend Profile Error", 280, 350);
							}
							else
							{
								openContentDialog(response.data.amendedmsg, "Amend Profile", 290, 300, function(){
									$window.location.href="#!/profile";
									$("html, body").animate({ scrollTop: 0 }, "fast");
								});
							}
							
							
						}, function errorCallback(response) {
							// called asynchronously if an error occurs
							// or server returns response with an error status.
							console.log("Ajax Failure response = " + response);
						});
				};
				
				
				
				$scope.deleteAcct = function(regId)
				{
					if(!confirm("<?php echo $confirmDelAccStr; ?>") ) {
						return;
					}
					var req = {
							method: 'POST',
							url: 'ajaxcalls/account_deleted_fcp.php',
 							headers: {'Content-Type': 'application/x-www-form-urlencoded'},
							data: 'acct=' + regId
						}

					$http(req).then(function successCallback(response) {
							// this callback will be called asynchronously
							// when the response is available
							console.log(response);
							console.log(response.data);
							console.log(response.data.errors);
							
							var ErrorObj = response.data.errors;
							var ErrorLen = Object.keys(ErrorObj).length;
							console.log("ErrorLen = " + ErrorLen);
							var ErrStr = "";
							if(ErrorLen > 0)
							{
								for (prop in ErrorObj) 
								{
									try
									{
										console.log("--- " + prop + " = " + ErrorObj[prop] + "\n");
										ErrStr += (ErrorObj[prop] + ".\n ");
									}
									catch(err)
									{
										console.log("Error: " + err);
									}
								}
								
								console.log("All errors = " + ErrStr);
								openContentDialog(ErrStr, "Delete Account Error", 300, 400);
								//$scope.login.error = ErrStr;
							}
							else
							{
								console.log("response.data.msg = " + response.data.msg);
								//$templateCache.removeAll();
								$scope.login = {};
								$scope.login = {
									username: "<?php echo $_SESSION['username']; ?>",
									regid: "<?php echo $_SESSION['regid']; ?>"
								}
				
								
								//$scope.login.username = "";
								//$scope.login.regid = "";
								
								openContentDialog("<?php echo $photoDelStr; ?>", "Delete Account", 300, 200, function(){
									$window.location.href="#!/";
									$("html, body").animate({ scrollTop: 0 }, "fast");
								});
							}
							

							
						}, function errorCallback(response) {
							// called asynchronously if an error occurs
							// or server returns response with an error status.
						});
				};
				
				$scope.deletePhoto = function(photoId){
					
					if(!confirm("Are you sure you want to delete this photo?") ) {
						return;
					}
					
					var req = {
							method: 'POST',
							url: 'ajaxcalls/delete_image_fcp.php',
 							headers: {'Content-Type': 'application/x-www-form-urlencoded'},
							data: 'delThumbId=' + photoId
						}

					$http(req).then(function successCallback(response) {
						
							var ErrorObj = response.data.errors;
							var ErrorLen = Object.keys(ErrorObj).length;
							console.log("ErrorLen = " + ErrorLen);
							var ErrStr = "";
							if(ErrorLen > 0)
							{
								for (prop in ErrorObj) 
								{
									try
									{
										console.log("--- " + prop + " = " + ErrorObj[prop] + "\n");
										ErrStr += (ErrorObj[prop] + ".\n ");
									}
									catch(err)
									{
										console.log("Error: " + err);
									}
								}
								
								console.log("All errors = " + ErrStr);
								openContentDialog(ErrStr, "Delete Image Error", 300, 400);
								//$scope.login.error = ErrStr;
							}
							else
							{
								console.log("response.data.msg = " + response.data.msg);
								//$templateCache.removeAll();
								
								openContentDialog(response.data.msg, "Delete Image", 300, 400, function(){
									$window.location.href="#!/profile";
									$("html, body").animate({ scrollTop: 0 }, "fast");
								});
							}
						}, function errorCallback(response) {
							// called asynchronously if an error occurs
							// or server returns response with an error status.
						});
				};
				
				
			});
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			//http://shazwazza.com/post/Uploading-files-and-JSON-data-in-the-same-request-with-Angular-JS
			
			app.controller('loginCtrl', function($rootScope, $scope, $http, $httpParamSerializerJQLike, $window, $templateCache) {
				
				
				 //an array of files selected
				$scope.files = [];
				$scope.resendpw = [];
				$scope.resendpw.msg = "";

				//listen for the file selected event
				$scope.$on("fileSelected", function (event, args) {
					console.log("adding....");
					$scope.$apply(function () {    
						console.log("applying....");        
						//add the file object to the scope's files collection
						$scope.files.push(args.file);
					});
				});
				

				$scope.do_register = function()
				{
					console.log("$scope.file = " + $scope.files);
					
					
					var ErrorObj = $scope.files;
					for (prop in ErrorObj) 
								{
									try
									{
										console.log("--- " + prop + " = " + ErrorObj[prop] + "\n");
										ErrStr += (ErrorObj[prop] + ".\n ");
									}
									catch(err)
									{
										console.log("Error: " + err);
									}
								}
					
					
					var req = {
							method: 'POST',
							url: 'ajaxcalls/do_register_fcp.php',
							 headers: {
								'Content-Type': undefined
							},
							data: {
								'upload0': $scope.files[0],
								'upload1': $scope.files[1],
								'upload2': $scope.files[2],
								'upload3': $scope.files[3],
								'upload4': $scope.files[4],
								'upload5': $scope.files[5]
							},
							transformRequest: function (data) {
								//data.concat($httpParamSerializerJQLike($scope.doregister));
								var formData = new FormData();
								angular.forEach(data, function (value, key) {
									//console.log(key + "xxx=xxx" + value);
									formData.append(key, value);
								});
								angular.forEach($scope.doregister, function (value, key) {
									//console.log(key + "yyy=yyy" + value);
									formData.append(key, value);
								});
								return formData;
							}
						}

					$http(req).then(function successCallback(response) {
							var ErrorObj = response.data.errors;
							var ErrorLen = Object.keys(ErrorObj).length;
							console.log("ErrorLen = " + ErrorLen);
							var ErrStr = "";
							if(ErrorLen > 0)
							{
								for (prop in ErrorObj) 
								{
									try
									{
										console.log("--- " + prop + " = " + ErrorObj[prop] + "\n");
										ErrStr += (ErrorObj[prop] + ".\n ");
									}
									catch(err)
									{
										console.log("Error: " + err);
									}
								}
								
								//$scope.login.error = ErrStr;
								openContentDialog(ErrStr, "Registration Error", 280, 350);
							}
							else
							{
								openContentDialog("<?php echo $regEmailSentStr;?>", "Registration", 290, 380, function(){
									$scope.doregister = {};
									$scope.files = [];
									$window.location.href="#!/";
									$("html, body").animate({ scrollTop: 0 }, "fast");
								});
							}
							
							
						}, function errorCallback(response) {
							// called asynchronously if an error occurs
							// or server returns response with an error status.
							console.log("Ajax Failure response = " + response);
						});
				};
				




				
				$scope.doLoginDB = function () {
					$templateCache.removeAll();
					//$scope.login = {};
					$scope.login.error = "";
					console.log("data = " + $httpParamSerializerJQLike($scope.dblogin));
					var req = {
							method: 'POST',
							url: 'ajaxcalls/dbLogin_fcp.php',
 							headers: {'Content-Type': 'application/x-www-form-urlencoded'},
							data: $httpParamSerializerJQLike($scope.dblogin)
						}
						
						

					$http(req).then(function successCallback(response) {
							// this callback will be called asynchronously
							// when the response is available
							
							/*
							console.log("response = " + response);
							console.log("response.data = " + response.data);
							console.log("response.data.errors = " + response.data.errors);
							console.log("response.data.errors.length = " + Object.keys(response.data.errors).length);
							*/
							
							var ErrorObj = response.data.errors;
							var ErrorLen = Object.keys(ErrorObj).length;
							var ErrStr = "";
							if(ErrorLen > 0)
							{
								for (prop in ErrorObj) 
								{
									try
									{
										console.log("--- " + prop + " = " + ErrorObj[prop] + "\n");
										ErrStr += (ErrorObj[prop] + ".\n ");
									}
									catch(err)
									{
										console.log("Error: " + err);
									}
								}
								
								$scope.login.error = ErrStr;
							}
							else
							{
								try
								{
									$scope.login.error = "";
									var dataObj = response.data;
								
									$scope.login.WelcomeMsg = dataObj['welcome'];

									
									$rootScope.unreadMail  = dataObj['unreadMail'];
									$rootScope.newMessages = dataObj['newmessages'];
									
									$scope.login.AdminComents = dataObj['admincomments'];
									$scope.login.username =  dataObj['username'];
									$scope.login.regid =  dataObj['regid'];
								
									/*
									if($rootScope.newMessages != undefined && $rootScope.newMessages != "")
										$("#loginNewMessagesIcon").removeClass("elementHide"); //force, since we used addClass in logout
									*/
									
									console.log("login.username = " + $scope.login.username);
									console.log("login.regid = " + $scope.login.regid);
									console.log("login.WelcomeMsg = " + $scope.login.WelcomeMsg);
									console.log("rootScope.unreadMail = " + $rootScope.unreadMail);
									console.log("newMessages = " + $rootScope.newMessages);
									console.log("login.AdminComents = " + $scope.login.AdminComents);
									$window.location.href="#!/profile";
								}
								catch(err)
								{
									console.log("Error: " + err);
								}
								
							}

							/*
							console.log("$scope = " + $scope);
							console.log("current first name = " + $scope.updateprofile.firstname);
							$scope.updateprofile = response.data;
							*/


								//$scope.$apply();
						}, function errorCallback(response) {
							// called asynchronously if an error occurs
							// or server returns response with an error status.
						});
						
				};
				
				
				$scope.checkEmailExists = function(emailAddress){
					
					console.log("emailAddress = " + emailAddress);
					console.log("doregister.email = " + $scope.doregister.email);
					
					var req = {
							method: 'POST',
							url: 'ajaxcalls/ajax_mailvalidate_fcp.php',
 							headers: {'Content-Type': 'application/x-www-form-urlencoded'},
							//data: $httpParamSerializerJQLike($scope.doregister)
							data: 'email=' + $scope.doregister.email
						}

					$http(req).then(function successCallback(response) {
							
							console.log(response.data.errors);
							var ErrorObj = response.data.errors;
							var ErrorLen = Object.keys(ErrorObj).length;
							console.log("ErrorLen = " + ErrorLen);
							var ErrStr = "";
							if(ErrorLen > 0)
							{
								for (prop in ErrorObj) 
								{
									try
									{
										//console.log("--- " + prop + " = " + ErrorObj[prop] + "\n");
										ErrStr += (ErrorObj[prop] + ".\n ");
									}
									catch(err)
									{
										console.log("Error: " + err);
									}
								}
								
								console.log("All errors = " + ErrStr);
								openContentDialog(ErrStr, "Email Error", 280, 300);
								//$scope.login.error = ErrStr;
							}
							else
							{
								
							}
							

							
						}, function errorCallback(response) {
							// called asynchronously if an error occurs
							// or server returns response with an error status.
						});
					
				};
				
				$scope.resendPassword = function(){
					var req = {
							method: 'POST',
							url: 'ajaxcalls/resend_password_fcp.php',
 							headers: {'Content-Type': 'application/x-www-form-urlencoded'},
							data: 'theEmail=' + $scope.resendpw.email
						}

					$http(req).then(function successCallback(response) {
							
							console.log("Resend password errors = " + response.data.errors);
							var ErrorObj = response.data.errors;
							var ErrorLen = Object.keys(ErrorObj).length;
							console.log("ErrorLen = " + ErrorLen);
							var ErrStr = "";
							if(ErrorLen > 0)
							{
								for (prop in ErrorObj) 
								{
									try
									{
										//console.log("--- " + prop + " = " + ErrorObj[prop] + "\n");
										ErrStr += (ErrorObj[prop] + ".\n ");
									}
									catch(err)
									{
										console.log("Error: " + err);
									}
								}
								
								console.log("All errors = " + ErrStr);
								//openContentDialog(ErrStr, "Email Error", 280, 300);
								$scope.resendpw.msg = ErrStr;
							}
							else
							{
								$scope.resendpw.msg = response.data.msg;
								
							}
							

							
						}, function errorCallback(response) {
							// called asynchronously if an error occurs
							// or server returns response with an error status.
						});
				};
				
				
				$scope.changePassword = function(){
					var req = {
							method: 'POST',
							url: 'ajaxcalls/change_password_fcp.php',
 							headers: {'Content-Type': 'application/x-www-form-urlencoded'},
							data: $httpParamSerializerJQLike($scope.changepassword)
							
						}

					$http(req).then(function successCallback(response) {
							
							console.log("Resend password errors = " + response.data.errors);
							var ErrorObj = response.data.errors;
							var ErrorLen = Object.keys(ErrorObj).length;
							console.log("ErrorLen = " + ErrorLen);
							var ErrStr = "";
							if(ErrorLen > 0)
							{
								for (prop in ErrorObj) 
								{
									try
									{
										//console.log("--- " + prop + " = " + ErrorObj[prop] + "\n");
										ErrStr += (ErrorObj[prop] + ".\n ");
									}
									catch(err)
									{
										console.log("Error: " + err);
									}
								}
								
								console.log("All errors = " + ErrStr);
								//openContentDialog(ErrStr, "Email Error", 280, 300);
								$scope.changepassword.msg = ErrStr;
							}
							else
							{
								$scope.changepassword.msg = response.data.msg;
								
							}
							

							
						}, function errorCallback(response) {
							// called asynchronously if an error occurs
							// or server returns response with an error status.
						});
				}

				
			});
			
			
			
			
			
			
			app.controller('logoutCtrl', function($rootScope, $scope, $http, $httpParamSerializerJQLike, $window, $templateCache) { 
				
				$scope.$on('$viewContentLoaded', function() {
						$templateCache.removeAll();

						$scope.doLogout(); //Same thing as calling ng-init, eg: in mobile_search_result_fcp.php: <div id="searchResultPage" ng-app="searchResultApp">
						//window.location.href="<?php baseUrl ?>" + "#!/logout2"; //we cannot use '#!/logout' as that will lead to a vicious circle of reloads
						//window.location.href="<?php baseUrl ?>";
						//window.location.reload();
					});
				
				
				$scope.doLogout = function () {
					//$scope.login = {};
					var req2 = {
							method: 'POST',
							url: 'common/angular_clearsession_fcp.php',
 							headers: {'Content-Type': 'application/x-www-form-urlencoded'}
						}
						
					$http(req2).then(function successCallback(response) {
							// this callback will be called asynchronously
							// when the response is available
							
							$scope.login = {};
								$scope.login = {
									username: "",
									regid: ""
								}
								
							$rootScope.unreadMail = "";
							$rootScope.newMessages = "";
							
							/*
							//force it, sinceAngular is not working :( :(  Make sure we don't keep adding it!!!!
							if (!$("#loginNewMessagesIcon").hasClass("elementHide"))
								$("#loginNewMessagesIcon").addClass("elementHide"); 
							*/
							
							/*
							$scope.login = [];
							$scope.login.username = "";
							$scope.login.regid = "";
							$scope.login.UnreadMaail = "";
							$scope.newMessages = "";
							$scope.login.WelcomeMsg = "";
							$scope.login.AdminComents = "";
							*/
						}, function errorCallback(response) {
							// called asynchronously if an error occurs
							// or server returns response with an error status.
						});
						
				};
			});
			
			
			
			
			
			app.controller('searchResultCtrl', function($scope, $http, $httpParamSerializerJQLike, $compile, $timeout) {
				
					$scope.postreply = {}; //why must we do this???? andnot for dbLogin???
				
					$scope.$on('$viewContentLoaded', function() {
						console.log("searchResultCtrl 3333");
						$scope.doResultOnload(); //Same thing as calling ng-init, eg: in mobile_amend_account_fcp.php: <div id="amendPage" ng-app="amendApp" ng-init="getProfileFromDB()">
					});
						
						
				$scope.doResultOnload = function()
				{
					$(".carousel").on("swiperight",function(){
						//alert("You swiped right on carousel!!! This.id = " + this.id );
						 $(this).carousel('prev');
					});
		
					$(".carousel").on("swipeleft",function(){
						//alert("You swiped left on carousel!!!");
						 $(this).carousel('next');
					});
				}
				
				
				$scope.addFave = function(favename, faveid, toAdd)
				{
					var req3 = {
							method: 'GET',
							url: 'ajaxcalls/ajax_setfav_fcp.php?favename=' + favename + "&faveid=" + faveid + "&toadd=" + toAdd,
 							headers: {'Content-Type': 'application/x-www-form-urlencoded'}
						}
						
					$http(req3).then(function successCallback(response) {
							console.log("response.data.favemsg = " + response.data.favemsg);
							
							var ErrorObj = response.data.errors;
							var ErrorLen = Object.keys(ErrorObj).length;
							var ErrStr = "";
							if(ErrorLen > 0)
							{
								for (prop in ErrorObj) 
								{
									try
									{
										ErrStr += (ErrorObj[prop] + ".\n ");
									}
									catch(err)
									{
										console.log("Error: " + err);
									}
								}
								openContentDialog(ErrStr, "Fave Info", 280, 280);
							}
							else
							{
								console.log("add/remove " + faveid); //last: 58610
								changeFaveButton(favename, faveid, toAdd);
								//After dynamically adding some ng- directiveto apiee of HTML, you have to compile it in order for that new directive to become part of angular!!!
								var generated = $('#favediv' + faveid);
								$compile(generated.contents())($scope);

								openContentDialog(response.data.favemsg, "Fave Info", 280, 200);
							}
						}, function errorCallback(response) {
							// called asynchronously if an error occurs
							// or server returns response with an error status.
						});
				}
				
				
				
				
				
				
				        // onclick event handlers
				$scope.showReplyForm = function(recUsername, recId, formType){

					//console.log("$scope.postreply = " + $scope.postreply);
					console.log("formType = " + formType);
					$scope.replyFormType = formType;

					//default. (formType == "reply")
					replyPostUrl = "ajaxcalls/ajax_sendmail_fcp.php";
					if (formType == "report")
					{
						replyPostUrl = "ajaxcalls/ajax_postcomplaint_fcp.php";
						$scope.postreply.subject = "blank message"; //enter something here because this input element is 'required'!
					}

					$scope.postreply.recipientid = recId;
					$scope.postreply.recipientname =  recUsername;
					
					$('#replytable').slideToggle();
					$('#replytable').focus();
					//openContentDialog($('#replytable').html(), "reply " + recUsername, 300, 450);
				};
				
				
				$scope.closeReplyForm = function () {
					$('#replytable').slideUp("slow", "linear", function(){
						$scope.loaded = false;
						$scope.success = false;
						$scope.process = false;
						$scope.postreply = {};
					});
					
				};
				
				$scope.sendReply = function () { 
					$scope.loaded = true;
					$scope.process = true;
					
					var reqSendReply = {
							method: 'POST',
							url: replyPostUrl,
 							headers: {'Content-Type': 'application/x-www-form-urlencoded'},
							data: $httpParamSerializerJQLike($scope.postreply)
						}
						
						
					$http(reqSendReply).then(function successCallback(response) {
							$scope.process = false;

							console.log("response.data = " + response.data);
							console.log("response.data = " + response.data);
							console.log("response.data.errors = " + response.data.errors);
							console.log("response.data.errors.length = " + Object.keys(response.data.errors).length);
							
							var ErrorObj = response.data.errors;
							var ErrorLen = Object.keys(ErrorObj).length;
							var ErrStr = "";
							if(ErrorLen > 0)
							{
								for (prop in ErrorObj) 
								{
									try
									{
										//console.log("--- " + prop + " = " + ErrorObj[prop] + "\n");
										ErrStr += (ErrorObj[prop] + ".\n ");
									}
									catch(err)
									{
										console.log("Error: " + err);
									}
								}
								
								$scope.postreply.error = ErrStr;
								
								$timeout(function(){
									$scope.closeReplyForm();
								}, 7000);
								
							}
							else
							{
								$scope.success = true;
								$timeout(function(){
									$scope.closeReplyForm();
								}, 3000);
							}

						}, function errorCallback(response) {
							// called asynchronously if an error occurs
							// or server returns response with an error status.
						});
					
					
					
				};
				
				
				
			});
			
			
			
			
			
			
			
			
			
			app.controller('openmailCtrl', function($rootScope, $scope, $http, $httpParamSerializerJQLike, $window, $templateCache) {
				
				$scope.$on('$viewContentLoaded', function() {

						$http.get("ajaxcalls/sessionValues_fcp.php?theSession=unreadMail").then(function (response) {
							console.log("unreadMail mail from session object data = " + response.data);
							$rootScope.unreadMail = response.data;
								
						});
						//do function to reduce opened mail????
						//
					});
					
				$scope.sendMailResponse = function () {
					console.log("data = " + $httpParamSerializerJQLike($scope.mailresponse));
					var req = {
							method: 'POST',
							url: 'ajaxcalls/sendmailresponse_fcp.php',
 							headers: {'Content-Type': 'application/x-www-form-urlencoded'},
							data: $httpParamSerializerJQLike($scope.mailresponse)
						}
						
						

					$http(req).then(function successCallback(response) {
							// this callback will be called asynchronously
							// when the response is available
							
							console.log("response.data = " + response.data);
							console.log("response.data.errors = " + response.data.errors);
							console.log("response.data.errors.length = " + Object.keys(response.data.errors).length);
							
							var ErrorObj = response.data.errors;
							var ErrorLen = Object.keys(ErrorObj).length;
							var ErrStr = "";
							if(ErrorLen > 0)
							{
								for (prop in ErrorObj) 
								{
									try
									{
										console.log("--- " + prop + " = " + ErrorObj[prop] + "\n");
										ErrStr += (ErrorObj[prop] + ".\n ");
									}
									catch(err)
									{
										console.log("Error: " + err);
									}
								}
								
								//$scope.mailresponse.error = ErrStr;
								openContentDialog(ErrStr, "email error", 290, 300);
							}
							else
							{
								$scope.mailresponse = {};
								
								//Just do a regular non-angular alert here???
								//$scope.mailresponse.error = "Thank you, you mail has been sent."; 
								
								openContentDialog("Thank you. Your mail has been sent.", "send response", 290, 300, function(){
									$window.location.href="#!/inbox";
								});
							}
								//$scope.$apply();
						}, function errorCallback(response) {
							// called asynchronously if an error occurs
							// or server returns response with an error status.
						});
						
				};
			});
			

</script>

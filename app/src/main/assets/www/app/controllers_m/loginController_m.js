(function(){
    "use strict";
    
    var app = angular.module('schoolApp');
 
	app.controller('loginController_m',['$scope','$rootScope', 'connectHostFactory', 'connectHostImageFactory','$location', 'userAuth','messageFactory','aesCryptoFactory','appConstants','sharedProperties','$window','$mdDialog', function($scope, $rootScope, connectHostFactory,connectHostImageFactory, $location, userAuth, messageFactory, aesCryptoFactory,appConstants,sharedProperties,$window,$mdDialog){
		

		var methodAction=null;
		var message=null;
		var jsonData=null;
		var result=null;

		var deviceToken=null;

		var key=null;

		$scope.wrapper = [];
		$scope.wrapper.checkboxFlag="N";

		var destination=null;

        $scope.imageFileNames=[];
        $scope.image=null;

        $scope.myInterval = 5000;
        $scope.noWrapSlides = false;
        $scope.active = 0;

        var slides = $rootScope.slides;
        var currIndex = 0;
		var encryptedPassword=null;

		$scope.disableSpace=function(event){
			//alert('alert-1'+event);
			if (event.keyCode == 32) {
                event.returnValue = false;
                return false;
            }
		}

		$scope.slides =
		 		  [{

        			image: 'app/images/dashboard-1.jpg',
                    id: currIndex++
        		  },
        		  {
        			image: "app/images/dashboard-2.jpg",
                    id: currIndex++
        		  },
        		  {
                    image: 'app/images/dashboard-3.jpg',
                    id: currIndex++
                  },
                  {
                     image: "app/images/dashboard-4.jpg",
                     id: currIndex++
                  },
                  {
                     image: "app/images/dashboard-5.jpg",
                     id: currIndex++
                  },
                  {
                     image: "app/images/dashboard-6.jpg",
                     id: currIndex++
                  }
        		  ];

		//------- Start loadData Function-------------
		$scope.loadData=function(){


						//replace 14APR2018
						// if(Android.LoadPreferences("checkFlagKey")=="Y"){

						// 		//Android.showToast("Flag username "+Android.LoadPreferences("usernameKey"));

						// 		$scope.wrapper.username= Android.LoadPreferences("usernameKey");
						// 		$scope.wrapper.password = Android.LoadPreferences("passwordKey");
						// 		$scope.wrapper.checkboxFlag = Android.LoadPreferences("checkFlagKey");

						// 		//Android.LoadPreferences("imageIDKey");

						// 		//$scope.login('STUDENT');

						// }

						if($window.localStorage.getItem("checkFlagKey")!= null && $window.localStorage.getItem("checkFlagKey")=="Y")
						{

							$scope.wrapper.username=$window.localStorage.getItem("usernameKey");
							$scope.wrapper.password = $window.localStorage.getItem("passwordKey");
							$scope.wrapper.checkboxFlag =$window.localStorage.getItem("checkFlagKey");


						}



		}
		//------- Ends loadData Function-------------




//------- Start login Function-------------
$scope.login=function(userGroup){

	// if(Android.isNetworkAvailable()){

		if ($scope.wrapper.username!=null && $scope.wrapper.password!=null)
		{

			//replace 14APR2018

				deviceToken = Android.LoadPreferences("fcmToken");
				methodAction="validateUser";
			//replace 14APR2018
				//encryptedPassword = Android.aes128Encryption($scope.wrapper.password);

				// messageFactory("Encrypted Password:: "+encryptedPassword);

				//var decryptedPassword = Android.aes128Decryption(encryptedPassword);

				message={
							"userid" : $scope.wrapper.username,
							"password" : aesCryptoFactory($scope.wrapper.password),
							"deviceToken" : deviceToken,
							"userGroup" : userGroup
						};

				$rootScope.userid=$scope.wrapper.username;

				$rootScope.deviceToken=deviceToken;

				$rootScope.loading=true;
				$rootScope.buttonDisabled=true;
				
				$scope.updateFireStore();

				jsonData=connectHostFactory(methodAction,message);

				jsonData.returnData(function(value)
				{

					//Android.openDialog("value "+JSON.stringify(value));

					if(value != null)
					{
							result=value.validateUser;

							if(value.success == true)
							{

								//messageFactory(JSON.stringify(result.usersWrapper[0].validUser));
								if(result.usersWrapper[0].recordFound==false || result.usersWrapper[0].validUser==false)
								{

											$rootScope.userid='';
											$rootScope.deviceToken='';
											$rootScope.sessionid='';
											$rootScope.isUserLogged=false;

											messageFactory('Invalid userid or password. WhatsApp Support # +919849342551');
								}
								else
								{

											//-----rootScope

											$rootScope.usersWrapper=result.usersWrapper[0].studentProfileWrapper;
											$rootScope.userid=result.usersWrapper[0].userid;
											$rootScope.lastLoginDate=result.usersWrapper[0].lastLoginDate;
											$rootScope.deviceToken=result.usersWrapper[0].deviceToken;
											$rootScope.sessionid=result.usersWrapper[0].sessionid;
											$rootScope.isUserLogged=true;


											if(result.usersWrapper[0].userGroup =='STUDENT')
											{
												sharedProperties.setRefNo(result.usersWrapper[0].studentProfileWrapper[0].refNo);
												sharedProperties.setStudentID(result.usersWrapper[0].studentID);
												sharedProperties.setStudentName(result.usersWrapper[0].studentProfileWrapper[0].studentName);
												sharedProperties.setSurname(result.usersWrapper[0].studentProfileWrapper[0].surname);
												sharedProperties.setGradeID(result.usersWrapper[0].studentProfileWrapper[0].gradeID);
												sharedProperties.setGradeIDValue(result.usersWrapper[0].studentProfileWrapper[0].gradeIDValue);
												sharedProperties.setSectionID(result.usersWrapper[0].studentProfileWrapper[0].sectionID);
												sharedProperties.setSectionIDValue(result.usersWrapper[0].studentProfileWrapper[0].sectionIDValue);
												sharedProperties.setAcademicYearID(result.usersWrapper[0].studentProfileWrapper[0].academicYearID);
												sharedProperties.setAcademicYearIDValue(result.usersWrapper[0].studentProfileWrapper[0].academicYearIDValue);
												sharedProperties.setSchoolIDValue(result.usersWrapper[0].studentProfileWrapper[0].schoolIDValue);
												sharedProperties.setSchoolID(result.usersWrapper[0].studentProfileWrapper[0].schoolID);

												if($scope.wrapper.checkboxFlag=="Y")
												{

																			//replace 14APR2018

														//Android.SavePreferences("usernameKey",$scope.wrapper.username,"passwordKey",$scope.wrapper.password,"checkFlagKey","Y");
														$window.localStorage.setItem("usernameKey",$scope.wrapper.username);
														$window.localStorage.setItem("passwordKey",$scope.wrapper.password);
														$window.localStorage.setItem("checkFlagKey","Y");
														

												}
												else
												{
														//replace 14APR2018

														//Android.SavePreferences("usernameKey","","passwordKey","","checkFlagKey","N");
														$window.localStorage.setItem("usernameKey","");
														$window.localStorage.setItem("passwordKey","");
														$window.localStorage.setItem("checkFlagKey","N");
														

												}

												}

												//----Service
												userAuth.setUserId(result.usersWrapper[0].userid);
												userAuth.setDeviceToken(result.usersWrapper[0].deviceToken);
												userAuth.setSessionId(result.usersWrapper[0].sessionid);

												//---User Group

												$rootScope.userGroup=result.usersWrapper[0].userGroup;

												//$scope.load_DashBoardImageID();
												$scope.updateFireStore();

												$location.path('/dashBoard');

								}

							}
							else
							{

										messageFactory(appConstants.SYSTEM_NORESPONSE);
							}

					}
					else
					{
									messageFactory(appConstants.SYSTEM_ERROR);

					}        	//--response---else condition close---

								$rootScope.loading = false;
								$rootScope.buttonDisabled=false;

					});      	//--------return data function close----

					}

					else{

							messageFactory("Enter user name and password");
					}
				// }
				// else{

				// 	messageFactory("No internet connection, please try again");
				// }

	}

	//------- Ends login Function-------------



//----------Start load_DashBoardImageID Data---------
$scope.load_DashBoardImageID = function(){

								//Android.showToast("Load Data called");
								if($rootScope.slides.length<=0)
								{
									methodAction="fetchImageFileNames";
									message={

												"refNo" : '9999999999',
												"imageStatus" : "ACTIVE"
										};

								//var destination=null;

								//$rootScope.loading=true;

								jsonData=connectHostImageFactory(methodAction,message,destination);
								jsonData.returnData(function(value){

								//Android.openDialog("value ",JSON.stringify(value));


										if(value !=null){

											result=value.fetchImageFileNames;


											if(value.success == true){

												if(result.imageDetailsWrapper[0].recordFound==true){

													$scope.wrapper=result.imageDetailsWrapper;


													//Android.openDialog("Image ",JSON.stringify($scope.wrapper));

													for(var i=0; i<=result.imageDetailsWrapper.length-1; i++)
													{

														//$scope.imageFileNames[i]=result.imageDetailsWrapper[i].imageFileName;

														//Android.openDialog("Image Id before",result.imageDetailsWrapper[i].imageId);

														sharedProperties.setImageId(result.imageDetailsWrapper[i].imageId);

														$scope.fetchImages_M();

														//var newWidth = 600 + slides.length + 1;


													}
												}
												else{
													//messageFactory(appConstants.SYSTEM_NORECORDS);
												}

											}
											else{
												//messageFactory(appConstants.SYSTEM_NORESPONSE);
											}
										}
										//$rootScope.loading=false;
										else{
												//messageFactory(appConstants.SYSTEM_ERROR);
										}

								});

							} //----Slides length check----
		}

	//--Ends load_DashBoardImageID Data---------

//----------Start Fetch Images_M--------

$scope.fetchImages_M=function(){

			//Android.openDialog("Image Id ",sharedProperties.getImageId());
			methodAction="fetchImageDetails";
			message={
							"refNo" : '9999999999',
							"imageId" : sharedProperties.getImageId()
					};

			//$rootScope.loading=true;
			jsonData=connectHostImageFactory(methodAction,message,destination);
			jsonData.returnData(function(value){
					if(value != null){
						result=value.fetchImageDetails;
							if(value.success == true){
								$scope.image=value.image;
								slides.push({
											image: value.image,
											id: currIndex++
									});
							}
							else{
								//messageFactory(appConstants.SYSTEM_NORESPONSE);
							}

					}

					//$rootScope.loading=false;
					else{
						// messageFactory(appConstants.SYSTEM_ERROR);
					}

			});

	}

		//---------------End Fetch Images_M---------
													   
	$scope.schoolRegister=function()
	{
		// console.log($rootScope.isUserLogged);

		// 	var confirm = $mdDialog.confirm()
		// 	.title('Confirm')
		// 	.content('Would you like to register a school and access school management app?')
		// 	.ok('Proceed')
		// 	.cancel('Cancel');
		
		//   $mdDialog.show(confirm).then(function() {

				$window.location.href = 'https://myschool.rootmindtech.com';
				
			// }, function() {
										
			// 	//$scope.status = 'confirm Result cancel.';
				
			// }); ///---alert condition

	}

	
	$scope.geolocation=function(){

		// Try HTML5 geolocation.
		if ($window.navigator.geolocation) {
		   
		   $window.navigator.geolocation.getCurrentPosition($scope.successCallback,
															$scope.errorCallback,{ maximumAge: 3000, timeout: 5000, enableHighAccuracy: true });
		   
	   } else {
		   // Browser doesn't support Geolocation
		   //alert('Browser doesnot support Geolocation');
		   handleLocationError(false, infoWindow, $scope.map.getCenter());
	   }

   } //geolocation

   $scope.handleLocationError=function (browserHasGeolocation, infoWindow, pos) {
	   console.log(browserHasGeolocation ?
					 'Error: The Geolocation service failed.' :
					 'Error: Your browser doesn\'t support geolocation.');
   }

   //Success function
   $scope.successCallback=function(position){

	   $rootScope.latitude=position.coords.latitude;
	   $rootScope.longitude=position.coords.longitude;

	   // $rootScope.pos = {
	   // 	lat: position.coords.latitude,
	   // 	lng: position.coords.longitude
	   // };

	   // console.log('lag '+ $rootScope.latitude);
	   // console.log('lng ' + $rootScope.longitude);

	   var geocoder = new google.maps.Geocoder;

	   var latlng = {lat: parseFloat($rootScope.latitude), lng: parseFloat($rootScope.longitude)};
	   geocoder.geocode({'location': latlng}, function(results, status) {
		   if (status === 'OK') {
				   if (results[0]) {
					   console.log(results[0].formatted_address);
					   $rootScope.geolocation = results[0].formatted_address;

					   $scope.updateFireStore();

				   } else {
					   console.log('No results found');
				   }
		   } else {
				console.log('Geocoder failed due to: ' + status);
		   }
	   });
	   


   } //----end of successCallback
   


   //--------------create firestore register after successful server side completion
	$scope.updateFireStore=function()
	{

		var message = {latitude:$rootScope.latitude, longitude:$rootScope.longitude, 
			geolocation:$rootScope.geolocation, userid:$rootScope.userid, timestamp: firebase.firestore.FieldValue.serverTimestamp()}

		var loginRef = firebase.firestore().collection("app").doc()
		loginRef
		.set(message)
		.then(function(docRef) {
			console.log("Document created");
		})
		.catch(function(error) {
			console.error("Error adding document: ", error);
		});




	}//-------------
   
	//---------these functions to be executed after all function declarations
	$scope.geolocation();


	}]);  
	
})();
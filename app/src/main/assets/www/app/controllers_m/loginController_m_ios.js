(function(){
    "use strict";
    
    var app = angular.module('schoolApp');
 
	app.controller('loginController_m',['$scope','$rootScope', 'connectHostFactory', 'connectHostImageFactory','$location', 'userAuth','messageFactory','appConstants','sharedProperties', function($scope, $rootScope, connectHostFactory,connectHostImageFactory, $location, userAuth, messageFactory, appConstants,sharedProperties){
		

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


		$scope.slides =
		 		  [{

        			image: "app/images/dashboard-1.jpg",
                    id: currIndex++
        		  },
        		  {
        			image: "app/images/dashboard-2.jpg",
                    id: currIndex++
        		  },
        		  {
                    image: "app/images/dashboard-3.jpg",
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



//						if(Android.LoadPreferences("checkFlagKey")=="Y"){
//
//								//Android.showToast("Flag username "+Android.LoadPreferences("usernameKey"));
//
//								$scope.wrapper.username= Android.LoadPreferences("usernameKey");
//								$scope.wrapper.password = Android.LoadPreferences("passwordKey");
//								$scope.wrapper.checkboxFlag = Android.LoadPreferences("checkFlagKey");
//
//								//Android.LoadPreferences("imageIDKey");
//
//								//$scope.login('STUDENT');
//
//						}
                                        
                        //ioscomment
                        var credentialData = retrieveUserCredentialsJS();
                        
                        //alert(JSON.stringify(credentialData));
                        
                        //alert(credentialData.usernameKey);
                        
                        if(credentialData.checkFlagKey=="Y"){
                        
     
                        
                            $scope.wrapper.username= credentialData.usernameKey;
                            $scope.wrapper.password = credentialData.passwordKey;
                            $scope.wrapper.checkboxFlag = credentialData.checkFlagKey;
                            
             
                        
                        }
                                        
                                        
                                        

		}
		//------- Ends loadData Function-------------




		//------- Start login Function-------------
		$scope.login=function(userGroup){

                //ioscomment
				//if(Android.isNetworkAvailable()){

					if ($scope.wrapper.username!=null && $scope.wrapper.password!=null)
					{

                         //ioscomment
						 //deviceToken = Android.LoadPreferences("gcmToken");
						 
                                        
                         methodAction="validateUser";
						 
                         //ioscomment
                         //encryptedPassword = Android.aes128Encryption($scope.wrapper.password);

                         encryptedPassword=passwordEncryptJS($scope.wrapper.password);
						 // messageFactory("Encrypted Password:: "+encryptedPassword);

						 //var decryptedPassword = Android.aes128Decryption(encryptedPassword);

						  message={
										"userid" : $scope.wrapper.username,
										"password" : encryptedPassword.encryptedPassword,
								        "deviceToken" : deviceToken,
										"userGroup" : userGroup
								  };

						  $rootScope.userid=$scope.wrapper.username;

						  $rootScope.deviceToken=deviceToken;

						  $rootScope.loading=true;
						  $rootScope.buttonDisabled=true;

					      jsonData=connectHostFactory(methodAction,message);

						  jsonData.returnData(function(value)
						  {

								//Android.openDialog("value "+JSON.stringify(value));
								if(value != null)
								{
										result=value.validateUser;

										if(value.success == true && result.usersWrapper[0].recordFound==true)
										{

											if(result.usersWrapper[0].validUser==false)
											{

														$rootScope.userid='';
														$rootScope.deviceToken='';
														$rootScope.sessionid='';
														$rootScope.isUserLogged=false;

														messageFactory('Invalid userid or password');
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

    														if($scope.wrapper.checkboxFlag=="Y")
    														{

                                                                    //ioscoment
    																//Android.SavePreferences("usernameKey",$scope.wrapper.username,"passwordKey",$scope.wrapper.password,"checkFlagKey","Y");
                                              
                                                                    syncUserCredentialsJS($scope.wrapper.username,$scope.wrapper.password,"Y");

    														}
    														else
    														{
                                                                    //ioscomment
    																//Android.SavePreferences("usernameKey","","passwordKey","","checkFlagKey","N");
                                              
                                                                    syncUserCredentialsJS("","","N");

    														}

												         }

															//----Service
															userAuth.setUserId(result.usersWrapper[0].userid);
															userAuth.setDeviceToken(result.usersWrapper[0].deviceToken);
															userAuth.setSessionId(result.usersWrapper[0].sessionid);

															//---User Group

															$rootScope.userGroup=result.usersWrapper[0].userGroup;

															//$scope.load_DashBoardImageID();

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
				   			//}
                   			//else{

                   			//	messageFactory("No internet connection, please try again");
                   			//}

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

	}]);  
	
})();
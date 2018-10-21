(function(){
    "use strict";
    
    var app = angular.module('schoolApp');
 
	app.controller('loginController',['$scope','$rootScope', 'connectHostFactory', '$location', 'userAuth','messageFactory','appConstants','sharedProperties', function($scope, $rootScope, connectHostFactory, $location, userAuth, messageFactory, appConstants,sharedProperties){
		
		//var userProfile=null;
		var methodAction=null;
		var message=null;
		var jsonData=null;
		var result=null;
		
		$scope.wrapper = [];
		var key=null;
		//var encryptedPassword=null;
		
		$scope.login=function(userGroup){
			
								
								
								//alert("button login clicked");
								
								
								 
								 if ($scope.form.$valid) 
								 {
												
										 		/*userProfile={
													      	  "userid" : "",
													    	  "password" : "",
													    	  "deviceToken" : "",
													    	  "sessionid" : ""	  
													    	};*/
															
											    methodAction="validateUser";
											    
											    
											    //var key = CryptoJS.enc.Utf8.parse('AbcDefGhILmnoPQr'); 
											    
											    var key = CryptoJS.enc.Utf8.parse(appConstants.AES_ENCRYPTKEY);
									               
											    var encryptedPassword = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse($scope.wrapper.password), key,  
										                {  
										                    keySize: 128 / 8,  
										                  
										                    mode: CryptoJS.mode.ECB,  
										                    padding: CryptoJS.pad.Pkcs7  
										                });  
											    
											    //alert("Encrypted "+encryptedPassword);
											 
											    
											   /* var decryptedpass = CryptoJS.AES.decrypt(encrypted, key,  
										                {  
										                    keySize: 128 / 8,  
										                    //iv: iv,  
										                    mode: CryptoJS.mode.ECB,  
										                    padding: CryptoJS.pad.Pkcs7  
										                });  */
											    
											    //alert("Decrypted "+decryptedpass.toString(CryptoJS.enc.Utf8));
											    
												//key= "{'A', 'b', 'c', 'D', 'e', 'f', 'G', 'h', 'I', 'L', 'm', 'n', 'o', 'P', 'Q', 'r'}";
											
											    //var encryptedPassword = CryptoJS.AES.encrypt($scope.wrapper.password,key);
											    
											    //alert('encryptedPassword '+encryptedPassword);
											    
											    

											  /*  var key = CryptoJS.enc.Hex.parse('AbcDefGhILmnoPQr');
											    var iv  = CryptoJS.enc.Hex.parse('AbcDefGhILmnoPQr');
											    var userpswd = $scope.wrapper.password;
											    var padMsg = padString(userpswd);*/

											   // var encrypted = CryptoJS.AES.encrypt(padMsg, key, { iv: iv, padding: CryptoJS.pad.Pkcs7, mode: CryptoJS.mode.CBC});
											    
											    
											    //alert('encrypted ='+encrypted);
											    
											  /*  if($scope.wrapper.username=="mani")
											    {
											    	var password="bmyHzfiq1pQKHyxbNklYYw==";
											    	
											    }
											    else
											    {
											    	var password="l/TRqcLexLc/x/0VzSpaUg==";
											    }*/
											    
											    //var username=$scope.wrapper.username;
											    //var password=$scope.wrapper.password;
											   
											    message={ "userid" : $scope.wrapper.username,
													      "password" : encryptedPassword.toString(),                 
													      "deviceToken" : "",
													      "userGroup" :userGroup
											    		};
											    //alert('userid ='+$scope.wrapper.username);
											    $rootScope.userid=$scope.wrapper.username;
											    //alert('message '+JSON.stringify(message));
											    
											    $rootScope.loading=true;
											    
												jsonData=connectHostFactory(methodAction,message);
						
												jsonData.returnData(function(value)
												{
																		
																	
																		
																//alert('Value '+JSON.stringify(value));
																		
																		
																		if(value != null)	
																		{
																			
																							
																	
																							result=value.validateUser;
																							
																							//alert('result Data = '+JSON.stringify(result));
																							
																							//alert(' success = '+value.success);
																							//alert(' recordFound = '+result.usersWrapper[0].recordFound);
																							
																							if(value.success == true && result.usersWrapper[0].recordFound==true)
																							{
																								
																								//$scope.usersWrapper=result.usersWrapper[0];
																							
						
																									
																								
																												if(result.usersWrapper[0].validUser==false)
																												{
																													
																													//$rootScope.userid='';
																													$rootScope.deviceToken='';
																													$rootScope.sessionid='';
																													$rootScope.isUserLogged=false;
																													
																													//--------dialog----------------
																													
																													messageFactory('Invalid userid or password');
																													
																													/*$mdDialog.show(
																														      $mdDialog.alert()
																														        .clickOutsideToClose(true)
																														        .content('Invalid userid or password')
																														        .ariaLabel('Alert Dialog Demo')
																														        .ok('Ok')
																														       
																														    );
																														   */
																												
																													
																															
																													//--------Dialog end----------------
																													
																													
																												}
																												else
																												{
																													 
																															
																													//alert("else block="+result.usersWrapper[0].userid);
																													//-----rootScope
																													$rootScope.userid=result.usersWrapper[0].userid;
																													//$rootscope.studentID=result.usersWrapper[0].studentID;
																													//$rootscope.refNo=result.usersWrapper[0].refNo;
																													$rootScope.lastLoginDate=result.usersWrapper[0].lastLoginDate;
																													$rootScope.deviceToken=result.usersWrapper[0].deviceToken;
																													$rootScope.sessionid=result.usersWrapper[0].sessionid;
																													$rootScope.isUserLogged=true;
																													$rootScope.isTabBarDisable=true; 
																													
																													//sharedProperties.setRefNo(result.usersWrapper[0].refNo);
																													//sharedProperties.setStudentID(result.usersWrapper[0].studentID);
																													
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
	                                                                                                                    
																													}

																													
		 
																													//----Service
																													userAuth.setUserId(result.usersWrapper[0].userid);
																													userAuth.setDeviceToken(result.usersWrapper[0].deviceToken);
																													userAuth.setSessionId(result.usersWrapper[0].sessionid);
																													
																													//---User Group
																													//alert("User Group"+ result.usersWrapper[0].userGroup);
																													//alert("User Group rootscope"+ $rootScope.userGroup);
																													$rootScope.userGroup=result.usersWrapper[0].userGroup;
																													
																													//alert($rootScope.userGroup);
																													
																													
																												
																													//------- user menu
																													
																													/*for(var i=0; i<result.usersWrapper[0].userMenuWrapper.length; i++)
																													{
																														//alert('User Menu id= '+JSON.stringify(result.usersWrapper[0].userMenuWrapper[i].menuId));
																														
																														$rootScope.userMenu[i]=result.usersWrapper[0].userMenuWrapper[i].menuId;
																														
																													}
										*/
																													//alert('userMenu array ='+$rootScope.userMenu);
																													
																							
																													
																													$location.path('/dashBoard');
																													
																													
																													
																												}
																												
																							}
																							else
																							{
																								//alert('User not found');
																										
																								//--------dialog----------------
																								
																								messageFactory('Invalid userid or password');
																								//messageFactory(appConstants.SYSTEM_NORESPONSE);
																								
																								 //toaster.pop('error', "Login", 'Invalid userid or password');
																								
																									/*$mdDialog.show(
																										      $mdDialog.alert()
																										        .clickOutsideToClose(true)
																										        .content('Invalid userid or password')
																										        .ariaLabel('Alert Dialog Demo')
																										        .ok('Ok')
																										       
																										    );
																						          */
																						         
																										
																								//--------Dialog end----------------
					
																							}
																						
																							
																							
																						
																		}
																		else
																		{
																							
																							
																								//alert('No response from host system');
																								
																			 messageFactory(appConstants.SYSTEM_ERROR);
																								
																								/*$mdDialog.show(
																									      $mdDialog.alert()
																									        .clickOutsideToClose(true)
																									        .content('Error encountered,Please contact system adminstrator')
																									        .ariaLabel('Alert Dialog Demo')
																									        .ok('Ok')
																									       
																									    );*/
																							
																							
																			
																		}//--response---else condition close---
																		
																	
																		
																		
																		
																		$rootScope.loading = false;				
																			
																		
												});//--------return data function close----
												
								}//------form validation close
				   
				}//------login function close
				
		function padString(source) {
	        var paddingChar = ' ';
	        var size = 16;
	        var x = source.length % size;
	        var padLength = size - x;
	        
	        for (var i = 0; i < padLength; i++) source += paddingChar;
	        
	        return source;
	    }
		
		
	
		

	
	}]);  
	
})();
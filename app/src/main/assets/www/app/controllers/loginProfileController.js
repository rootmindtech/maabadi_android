(function(){
    "use strict";
    
    var app = angular.module('schoolApp');
 
	app.controller('loginProfileController',['$scope', '$rootScope', 'connectHostFactory', 'connectHostImageFactory', '$location', 'sharedProperties', 'commonControls', 'alertsManager', '$mdDialog','messageFactory','appConstants', function($scope ,$rootScope, connectHostFactory,connectHostImageFactory, $location, sharedProperties, commonControls, alertsManager, $mdDialog, messageFactory, appConstants){
		
	
		var methodAction=null;
		var message=null;
		var jsonData=null; 
		var result=null;
		
		
	
		
		$scope.menuName= sharedProperties.getMenuName();
		$scope.refNo= sharedProperties.getRefNo();
		$scope.actionMode=sharedProperties.getActionMode();
		$scope.studentName= sharedProperties.getStudentName();
		$scope.surname= sharedProperties.getSurname();
		
        //------------start loadData Function----------------
		$scope.loadData=function(){  
			

				 		methodAction="fetchLoginProfile";
						
						message={
						
					    		"studentID": sharedProperties.getStudentID()  
					    				
				    		};
				
						
				//alert('message = '+JSON.stringify(message));
				$scope.buttonDisabled=true;
				$rootScope.loading=true; 
				
				jsonData=connectHostFactory(methodAction,message);
				jsonData.returnData(function(value){
					
					if(value != null){
						
									result=value.fetchLoginProfile;

									if(value.success == true){
										
										//alert('value = '+JSON.stringify(value));
										
										if( result.usersWrapper[0].recordFound==true)
										{

												$scope.wrapper= result.usersWrapper[0];
												
												//alert('$scope.wrapper = '+JSON.stringify($scope.wrapper));

										}
										else
										{
											
												
												for(var i=0; i<result.errorWrapper.length; i++)
												{
													
													$scope.error = result.errorWrapper[i].errorDesc;
													alertsManager.addAlert($scope.error, 'alert-error');
													$scope.alerts = alertsManager.alerts;
													
												}
											
											
										}
									
								} 
								else
								{
									
									messageFactory(appConstants.SYSTEM_NORESPONSE);
								}
									
					}
					else{
						
						messageFactory(appConstants.SYSTEM_ERROR);
					}
						
					$rootScope.loading=false;
					$scope.buttonDisabled=false;
				});
			 
			
		        	
		} 
		
		//------------end loadData Function------------------
	
		
		$scope.saveData=function(){   
			

			 alertsManager.clearAlerts();
		
			 $scope.submitted = true;
			 
			
			 
			 if ($scope.form.$valid) {
				 
				 if(!angular.equals($scope.wrapper.password,$scope.wrapper.retypepassword))
				 {
					 
					 return; //alert('password and reentered passwords are same ');
				 }
				 
							 
				 		methodAction="updateLoginProfile";
					
				 		
				 		
						message={
						
					    		
					    		"userid": $scope.wrapper.userid,  		//sharedProperties.getRefNo(),  
					    		"password": $scope.wrapper.password,  
					    		"studentID": sharedProperties.getStudentID(),    
					    		"refNo": sharedProperties.getRefNo(), 
					    		"status":  $scope.wrapper.status 	
				    		};
				
						
				//alert('message = '+JSON.stringify(message));
				$scope.buttonDisabled=true;
				$rootScope.loading=true; 
				
				jsonData=connectHostFactory(methodAction,message);
				jsonData.returnData(function(value){
					
					if(value != null){
					
										 
									result=value.updateLoginProfile;
					
									
						
									if(value.success == true){
										
										
										if( result.usersWrapper[0].recordFound==true)
										{
											
					
														
											messageFactory("Password changed successfully");
												
												

									
										}
										else{
											
										
											 messageFactory("Password not changed");
												/*for(var i=0; i<result.errorWrapper.length; i++)
												{
													
													$scope.error = result.errorWrapper[i].errorDesc;
													alertsManager.addAlert($scope.error, 'alert-error');
													$scope.alerts = alertsManager.alerts;
													
												}*/
											
											
											}
									
								} 
								else
								{
									
									messageFactory(appConstants.SYSTEM_NORESPONSE);
								}
									
					}
					else{
						
						messageFactory(appConstants.SYSTEM_ERROR);
					}
						
					$rootScope.loading=false;
					$scope.buttonDisabled=false;
				});
			 }
			
		        	
		}  //------------ends saveData Function-------------
		
	

			
			
    
			//--------START btnBack function-----------
			  $scope.btnBack=function(){
					$location.path('/queue');
			   }
			//--------ends btnBack function----------- 
	}]);  
	
})();










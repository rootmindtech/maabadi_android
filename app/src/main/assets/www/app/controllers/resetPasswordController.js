(function(){
    "use strict";
    
    var app = angular.module('schoolApp');
 
	app.controller('resetPasswordController',['$scope', '$rootScope', 'connectHostFactory', 'connectHostImageFactory', '$location', 'sharedProperties', 'commonControls', 'alertsManager', '$mdDialog','messageFactory','appConstants', function($scope ,$rootScope, connectHostFactory,connectHostImageFactory, $location, sharedProperties, commonControls, alertsManager, $mdDialog, messageFactory, appConstants){
		
	
		var methodAction=null;
		var message=null;
		var jsonData=null; 
		var result=null;
		
		
	
		
		$scope.menuName= sharedProperties.getMenuName();
		//$scope.refNo= sharedProperties.getRefNo();
		//$scope.actionMode=sharedProperties.getActionMode();
		//$scope.studentName= sharedProperties.getStudentName();
		//$scope.surname= sharedProperties.getSurname();
		
     
		$scope.saveData=function(){   
			

			
			//alert('button click');
			
			 $scope.submitted = true;
			 
			
			 
			 if ($scope.form.$valid) {
				 
				 if(!angular.equals($scope.wrapper.password,$scope.wrapper.retypepassword))
				 {
					 
					 return; //alert('password and reentered passwords are same ');
				 }
				 	 
				 
				 		methodAction="changePassword";
					
				 		
						message={
								
								"userid": $rootScope.userid, 		
					    		"staffUserID":$rootScope.userid,
					    		"password": $scope.wrapper.password  
					    		
				    		};
				
						
				//alert('message = '+JSON.stringify(message));
				$scope.buttonDisabled=true;
				$rootScope.loading=true; 
				
				jsonData=connectHostFactory(methodAction,message);
				jsonData.returnData(function(value){
					
					if(value != null){
					
										 
									result=value.changePassword;
					
									
						
									if(value.success == true){
										
										
										if( result.usersWrapper[0].recordFound==true)
										{
											
					
														
											messageFactory("Password changed successfully");
												
												

									
										}
										else{
											
										
											messageFactory("Password not changed");
												
											
											
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
					$location.path('/dashBoard');
			   }
			//--------ends btnBack function----------- 
	}]);  
	
})();










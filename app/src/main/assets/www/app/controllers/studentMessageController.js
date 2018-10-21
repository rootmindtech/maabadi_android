(function(){
    "use strict";
    
    var app = angular.module('schoolApp');
 
	app.controller('studentMessageController',['$scope', '$rootScope', 'connectHostFactory', '$location', 'sharedProperties', 'commonControls', 'alertsManager', '$mdDialog','messageFactory','appConstants', function($scope ,$rootScope, connectHostFactory, $location, sharedProperties, commonControls, alertsManager, $mdDialog, messageFactory, appConstants){
		
	
		var methodAction=null;
		var message=null;
		var jsonData=null; 
		var result=null;
		
		$scope.menuName= sharedProperties.getMenuName();
		
		$scope.academicYearIDValue= sharedProperties.getAcademicYearIDValue();
		$scope.gradeIDValue= sharedProperties.getGradeIDValue();
		$scope.sectionIDValue= sharedProperties.getSectionIDValue();
                                               
        $scope.pageAnimation="view-animate";
                                               
		/*$scope.menu= sharedProperties.getMenu();
		
		$scope.menuName= sharedProperties.getMenuName();
		$scope.refNo= sharedProperties.getRefNo();
		$scope.customerName=sharedProperties.getCustomerName();
		$scope.actionMode=sharedProperties.getActionMode();*/
		
		//$rootScope.isTabBarDisable=true;
		
		
        //------------start loadData Function----------------
		
		$scope.loadData=function(){
				

	 		 if(sharedProperties.getActionMode()=='UPDATE'){
				 
					 		
								methodAction="fetchStudentMessage";
											
								message={
										      "refNo" : sharedProperties.getRefNo()
									    };
									 		
								$rootScope.loading=true;	 	
								
								jsonData=connectHostFactory(methodAction,message);
								
									jsonData.returnData(function(value){
										
										if(value != null){
												
												result=value.fetchStudentMessage;
												
												if(value.success == true){
													
															if(result.studentMessageWrapper[0].recordFound==true)
															{
																	$scope.wrapper=result.studentMessageWrapper;
															}
															
															else{
																	messageFactory(appConstants.SYSTEM_NORECORDS);
															}
												}
												
												else{
														messageFactory(appConstants.SYSTEM_NORESPONSE);
												}
										
										}
										else{
											messageFactory(appConstants.SYSTEM_ERROR);
										}

										$rootScope.loading=false;
									});
							 
	 		 			}	
		
		 }   //------------------- ends loadData Function-----------------       
		
		
			
		
		
        //--------------start saveData Function-----------------
		
		$scope.saveData=function(){   
			
			 alertsManager.clearAlerts();
		
			 $scope.submitted = true;
			 
			 if ($scope.form.$valid) {
				 
				
				 		 if(sharedProperties.getActionMode()=='UPDATE'){
							 
				 			 	methodAction="updateStudentMessage";
						 
				 		 }
				 		 else {
				 			 
				 			 	methodAction="insertStudentMessage";
				 		 }
				 		
				 		
						message={
						
								"refNo" : sharedProperties.getRefNo(),
								"studentID" : $scope.wrapper.studentID,
								"messageID" : $scope.wrapper.messageID,
								"message" : $scope.wrapper.message,
								//"messageDateTime" : $scope.wrapper.messageDateTime,
								//"delivered": $scope.wrapper.delivered,
					    		//"recordStatus" : sharedProperties.getRecordStatus()
					    			
				    		};
				
				$scope.buttonDisabled=true;
				$rootScope.loading=true; 
				
				jsonData=connectHostFactory(methodAction,message);
				jsonData.returnData(function(value){
					
					if(value != null){
						
									if(sharedProperties.getActionMode()=='UPDATE'){
										 
										result=value.updateStudentMessage;
					
									}
									else{
						 			 
							 			result=value.insertStudentMessage;
							 			
									}
					
						
									if(value.success == true){
										
										
										if( result.studentMessageWrapper[0].recordFound==true)
										{
											
													sharedProperties.setActionMode('UPDATE');
													
												
										 					
													
											
											
										}
										else{
											
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
			
		        	
		}  //------------ends saveData Function-------------
		
			
			$scope.nextPage=function(){ 
					
			  		//$rootScope.selectedIndex = 1;
					//$location.path('/' + 'identification');
					
			}
			  	
			  
			  
			//--------START btnBack function-----------
			  $scope.btnBack=function(){
					//$location.path('/queue');
			   }
			//--------ends btnBack function----------- 
	}]);  
	
})();










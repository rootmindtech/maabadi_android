(function(){
    "use strict";
    
    var app = angular.module('schoolApp');
 
	app.controller('schoolMessageController',['$scope', '$rootScope', 'connectHostFactory', '$location', 'sharedProperties', 'commonControls', 'alertsManager', '$mdDialog','messageFactory','appConstants', function($scope ,$rootScope, connectHostFactory, $location, sharedProperties, commonControls, alertsManager, $mdDialog, messageFactory, appConstants){
		
		
		var methodAction=null;
		var message=null;
		var jsonData=null; 
		var result=null;
		
		$scope.wrapper=[];
		$scope.schoolMessageWrapper=[];
		
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
			
		
			
			methodAction="fetchMultiPopoverData";
								
			message=[
			               
			             {
							 "tableName" : "MST_Grade",
						 	 "filter" : ""    		
					     }
					     
					  
					];
				    
				    $rootScope.loading=true;
						 			
					jsonData=connectHostFactory(methodAction,message);
					jsonData.returnData(function(value){
						
							//alert('Popover Data='+JSON.stringify(value));
						
							if(value != null){
								
										
										
										result=value.fetchMultiPopoverData;
									
										if(value.success == true){
											
											$scope.popoverWrapper=result.popoverWrapper;
											
											
											
											//alert('popoverWrapper '+JSON.stringify($scope.popoverWrapper));

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
				
					
				
	
		
		 }   //------------------- ends loadData Function-----------------       
		
		
     
		
        //--------------start saveData Function-----------------
		
		$scope.saveData=function(){   
			
	
			 $scope.submitted = true;
			 
			 if ($scope.form.$valid) {
				 
				
				 		
				 	methodAction="insertSchoolMessage";
				 		
		
					 message={
						
								
								"message" : $scope.wrapper.message,
								"gradeList" : $scope.wrapper.gradeID,
								"delivered":'N'
					    			
				    		};
				//alert('message '+JSON.stringify(message));
				$scope.buttonDisabled=true;
				$rootScope.loading=true; 
				
				jsonData=connectHostFactory(methodAction,message);
				jsonData.returnData(function(value){
					
					if(value != null)
					{
						
 
							 		result=value.insertSchoolMessage;

						
									if(value.success == true)
									{
										
											
											if(result.recordFound==true)
											{
												
												$scope.submitted = false; // when fetchSchoolMessage call grade and message fields not required to enter it
												
												$scope.form.gradeID.$invalid=true;
										    	$scope.form.gradeID.$dirty=false;
										    	$scope.form.message.$invalid=true;
										    	$scope.form.message.$dirty=false;
										    	
												messageFactory(appConstants.RECORD_UPDATED);
												
												$scope.fetchSchoolMessage(); 
												
												
												
											}
											else
											{
													
												messageFactory(appConstants.SYSTEM_NORECORDS);
												
												
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
		
		
   //------------start fetchSchoolMessage Function----------------
		
		$scope.fetchSchoolMessage=function(){
			
			
			
			
				methodAction="fetchSchoolMessage";
											
								message={
										      "MessageID" :'' 
									    };
									 		
								
								$rootScope.loading=true;	 	
								
								jsonData=connectHostFactory(methodAction,message);
								
									jsonData.returnData(function(value){
										
										if(value != null){
												
												result=value.fetchSchoolMessage;
												
												//alert('message:'+JSON.stringify(result));
												
												if(value.success == true){
													
															if(result.recordFound==true)
															{
																	$scope.schoolMessageWrapper=result.schoolMessageWrapper;
																	
																	//alert('$scope.wrapper:'+JSON.stringify($scope.wrapper));
																	
																	 //--pagination--
																	
																	 $scope.totalItems = result.schoolMessageWrapper.length;
																	 $scope.currentPage = 1;
																  	 $scope.itemsPerPage =5;
																  	 $scope.maxSize = 5; //Number of pager buttons to show
																  	
																  	 
																  	  if($scope.totalItems >  $scope.itemsPerPage  && $scope.totalItems != null)
																  	  {
																  		$scope.pagination=true;
																  		
																  	  }
																  	  //---pagination end--
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
							 
	 		 			
		
		 }   //------------------- ends fetchSchoolMessage Function-----------------       
		
		
			
		   
		
		  //---------- back button---------
		   $scope.btnBack=function(){

				$location.path('/dashBoard');
		   }
			
			//----------end -back button----------
		   
		   
		   
	}]);  
	
})();










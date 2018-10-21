(function(){
    "use strict";
    
    var app = angular.module('schoolApp');
 
	app.controller('gradeSubjectsController',['$scope', '$rootScope', 'connectHostFactory', '$location', 'sharedProperties', 'commonControls', 'alertsManager', '$mdDialog','messageFactory','appConstants', function($scope ,$rootScope, connectHostFactory, $location, sharedProperties, commonControls, alertsManager, $mdDialog, messageFactory, appConstants){
		
	
		var methodAction=null;
		var message=null;
		var jsonData=null; 
		var result=null;
		$scope.subjectsWrapper=[];
		/*$scope.menuName= sharedProperties.getMenuName();*/
		
		/*$scope.menu= sharedProperties.getMenu();
		
		$scope.menuName= sharedProperties.getMenuName();
		$scope.refNo= sharedProperties.getRefNo();
		$scope.customerName=sharedProperties.getCustomerName();
		$scope.actionMode=sharedProperties.getActionMode();*/
		
		$scope.academicYearIDValue= sharedProperties.getAcademicYearIDValue();
		$scope.gradeIDValue= sharedProperties.getGradeIDValue();
		$scope.sectionIDValue= sharedProperties.getSectionIDValue();
		
		
        //------------start loadData Function----------------
		
		$scope.loadData=function(){
			
		
			
			methodAction="fetchMultiPopoverData";
								
			message=[
							{
								 "tableName" : "MST_Grade",
							    "filter" : ""    		
							},
												     
						     {
								 "tableName" : "MST_Subject",
							     "filter" : ""    		
							 },
							 {
								 "tableName" : "MST_AcademicYear",
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
				 
				
							 
				 		methodAction="updateGradeSubjects";
	
						message={
						
					    			"academicYearID": $scope.wrapper.academicYearID,
					    			"gradeID": $scope.wrapper.gradeID,   
					    			"subjectID": $scope.wrapper.subjectID
					    			
					    			
				    		    };
				

				$scope.buttonDisabled=true;
				$rootScope.loading=true; 
				
				jsonData=connectHostFactory(methodAction,message);
				jsonData.returnData(function(value){
					
					//alert('Value personal Data= '+JSON.stringify(value));
				
					if(value != null){
						
										 
									result=value.updateGradeSubjects;
					
									
						
									if(value.success == true){
										
										
									
										
										if( result.gradeSubjectsWrapper[0].recordFound==true)
										{
											
											 messageFactory(appConstants.RECORD_UPDATED);
											 
											 $scope.fetchGradeSubjects();
		
													//alert(JSON.stringify(result));

													//$scope.customerName= result.personalDetailsWrapper[0].firstName+" "+ result.personalDetailsWrapper[0].middleName+ " " +result.personalDetailsWrapper[0].lastName;
										 			
													//sharedProperties.setCustomerName($scope.customerName);
													
													//alert($scope.customerName);
										 					
									
										}
										else{
											
												
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
		
		
		
		//--------fetchGradeSubjects------------
		$scope.fetchGradeSubjects=function(){
			
			$scope.submittedFetchSubjects = true;
			 
			if ($scope.form.gradeID.$valid) {
			
				methodAction="fetchGradeSubjects";
				
				message={
							"gradeID": $scope.wrapper.gradeID  
					    };
					 		
				$rootScope.loading=true;	 	
				
				jsonData=connectHostFactory(methodAction,message);
				
					jsonData.returnData(function(value){
						
						if(value != null){
							   
								result=value.fetchGradeSubjects;
								
								if(value.success == true){
									
											if(result.gradeSubjectsWrapper[0].recordFound==true)
											{
													$scope.subjectsWrapper=result.gradeSubjectsWrapper;
													
													//--pagination--
													
													 $scope.totalItems = result.gradeSubjectsWrapper.length;
													
													 $scope.currentPage = 1;
												  	 $scope.itemsPerPage =5;
												  	 $scope.maxSize = 5; //Number of pager buttons to show
												  	 
												  	  if($scope.totalItems >  $scope.itemsPerPage && $scope.totalItems != null)
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
			}
			
		}
		//-------end fetchGradeSubjects---------
		
		
		//--------fetchGradeSubjects_M------------
		$scope.fetchGradeSubjects_M=function(){
			
			
			
				methodAction="fetchGradeSubjects";
				
				message={
							"gradeID": sharedProperties.getGradeID() 
					    };
					 		
				$rootScope.loading=true;	 	
				
				jsonData=connectHostFactory(methodAction,message);
				
					jsonData.returnData(function(value){
						
						if(value != null){
								
							    
								
								result=value.fetchGradeSubjects;
								
								if(value.success == true){
									
											if(result.gradeSubjectsWrapper[0].recordFound==true)
											{
													$scope.subjectsWrapper=result.gradeSubjectsWrapper;
													
													
													
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
		//--------------------fetchGradeSubjects_M-----
			
			/*$scope.nextPage=function(){ 
					
			  		//$rootScope.selectedIndex = 1;
					//$location.path('/' + 'identification');
					
			}*/
			  	
			 
			  
		 //--------START btnBack function-----------
		  $scope.btnBack=function(){
				$location.path('/dashBoard');
		   }
		//--------ends btnBack function----------- 

	}]);  
	
})();










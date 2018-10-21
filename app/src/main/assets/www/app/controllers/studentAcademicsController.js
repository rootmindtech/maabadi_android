(function(){
    "use strict";
    
    var app = angular.module('schoolApp');
 
	app.controller('studentAcademicsController',['$scope', '$rootScope', 'connectHostFactory', '$location', 'sharedProperties', 'commonControls', 'alertsManager', '$mdDialog','messageFactory','appConstants', function($scope ,$rootScope, connectHostFactory, $location, sharedProperties, commonControls, alertsManager, $mdDialog, messageFactory, appConstants){
		
	
		var methodAction=null;
		var message=null;
		var jsonData=null; 
		var result=null;
		
		$scope.wrapper = [];
		
		$scope.academicsWrapper = [];
		
		$scope.menuName= sharedProperties.getMenuName();
		$scope.refNo= sharedProperties.getRefNo();
		$scope.studentName=sharedProperties.getStudentName();
		$scope.surname=sharedProperties.getSurname();
		
		$scope.academicYearIDValue= sharedProperties.getAcademicYearIDValue();
		$scope.gradeIDValue= sharedProperties.getGradeIDValue();
		$scope.sectionIDValue= sharedProperties.getSectionIDValue();
		
		
		$scope.academicYearID= sharedProperties.getAcademicYearID();
		$scope.gradeID= sharedProperties.getGradeID();
		$scope.sectionID= sharedProperties.getSectionID();
                                                 
                                                 
        $scope.pageAnimation="view-animate";
		
		/*$scope.menu= sharedProperties.getMenu();

	
		$scope.actionMode=sharedProperties.getActionMode();*/
		

		
		$scope.editableOption = true;
		//$rootScope.isTabBarDisable=true;
		
		
        //------------start loadData Function----------------
		
		$scope.loadData=function(){
			
		
			
			methodAction="fetchMultiPopoverData";
								
			message=[
			               
			             {
							 "tableName" : "MST_Term",
						 	 "filter" : ""    		
					     },
					     
					     {
							 "tableName" : "MST_Subject",
						     "filter" : ""    		
						 },
						 {
							 "tableName" : "MST_AcademicYear",
						 	 "filter" : ""    		
					     },
						 {
							 "tableName" : "MST_Grade",
						 	 "filter" : ""    		
					     },
					     {
							 "tableName" : "MST_Section",
						 	 "filter" : ""    		
					     },
					     {
							 "tableName" : "MST_Rank",
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
											
											
											$scope.wrapper.studentID= sharedProperties.getStudentID();
											$scope.wrapper.studentName= sharedProperties.getStudentName();
											$scope.wrapper.gradeID= sharedProperties.getGradeID();
											$scope.wrapper.sectionID= sharedProperties.getSectionID();
											$scope.wrapper.academicYearID= sharedProperties.getAcademicYearID();
											
											//sharedProperties.setAcademicYearID('');
											sharedProperties.setGradeID('');
											sharedProperties.setSectionID('');
											
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
				
					 if(sharedProperties.getActionMode()=='UPDATE'){
						 
						 //alert('$scope.wrapper.academicYearID = '+$scope.wrapper.academicYearID);
						 
						 $scope.searchData();
					 		
							/*methodAction="fetchStudentAcademics";
										
							message={
									      "refNo" : sharedProperties.getRefNo(),
									      "studentID" : sharedProperties.getStudentID(),
									      "academicYearID" :sharedProperties.getAcademicYearID() //$scope.wrapper.academicYearID,
								    };
								 		
							$rootScope.loading=true;	 	
							
							jsonData=connectHostFactory(methodAction,message);
							
								jsonData.returnData(function(value){
									
									if(value != null){
											
											result=value.fetchStudentAcademics;
											
											if(value.success == true){
												
														if(result.studentAcademicsWrapper[0].recordFound==true)
														{
																$scope.wrapper=result.studentAcademicsWrapper;
																
																$scope.wrapper.studentID= result.studentAcademicsWrapper[0].studentID;
																$scope.wrapper.academicYearID= result.studentAcademicsWrapper[0].academicYearID;
																$scope.wrapper.gradeID= result.studentAcademicsWrapper[0].gradeID;
																$scope.wrapper.sectionID= result.studentAcademicsWrapper[0].sectionID;
																
																$scope.totalItems = $scope.wrapper.length;
																
																//alert('totalItems = '+$scope.totalItems);
																
																//--pagination--
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
								});*/
						 
		 			}	
				
	
		
		 }   //------------------- ends loadData Function-----------------       
		
		
			
		
		
        //--------------start saveData Function-----------------
		
		$scope.saveData=function(){   
			
			/*if($scope.wrapper.securedMarks > $scope.wrapper.targetMarks)
			{
				messageFactory('Secured marks should be less than target marks');
				return;
			}*/

			 alertsManager.clearAlerts();
		
			 $scope.submitted = true;
			 
			 if ($scope.form.$valid) {
				 
		 
				 	    methodAction="updateStudentAcademics";
						 
				 		
				 		
						message={
						
					    		    "refNo" : sharedProperties.getRefNo(),
					    			"studentID" : $scope.wrapper.studentID,
					    			"academicYearID" : $scope.wrapper.academicYearID,
					    			"gradeID" : $scope.wrapper.gradeID,
					    			"sectionID" : $scope.wrapper.sectionID,
					    			"termID" : $scope.wrapper.termID,
					    			"subjectID" : $scope.wrapper.subjectID,
					    			"targetMarks" : $scope.wrapper.targetMarks,
					    			"securedMarks" : $scope.wrapper.securedMarks,
					    			"percentage" : $scope.wrapper.percentage,
					    			"rankID" : $scope.wrapper.rankID
					    			//"recordStatus" : sharedProperties.getRecordStatus()
					    			
				    		};
				
						//alert('save message ='+JSON.stringify(message));
				
				$scope.buttonDisabled=true;
				$rootScope.loading=true; 
				
				jsonData=connectHostFactory(methodAction,message);
				jsonData.returnData(function(value){
					
					//alert('Value personal Data= '+JSON.stringify(value));
				
					if(value != null){
						
									
										 
									result=value.updateStudentAcademics;
					
								
					
						
									if(value.success == true){
										
										
									
										
										if( result.studentAcademicsWrapper[0].recordFound==true)
										{
											
																	
													$scope.searchData();
												   
													messageFactory(appConstants.RECORD_UPDATED);
													
													
									
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
		
			
		
			$scope.searchData=function(){
				
				//alert('search data');
				
				 //---------TO RELOAD UPDATED RECORD--------
				methodAction="fetchStudentAcademics";
				
				message={
						      "refNo" : sharedProperties.getRefNo(),
						      "studentID" : sharedProperties.getStudentID(),
						      "academicYearID" : $scope.wrapper.academicYearID
					    };
				
				//alert('SearchData message ' +JSON.stringify(message));
					 		
				$rootScope.loading=true;	 	
				
				jsonData=connectHostFactory(methodAction,message);
				
					jsonData.returnData(function(value){
						
						if(value != null){
								
								result=value.fetchStudentAcademics;
								
								//alert('Value  Data= '+JSON.stringify(value));
								
								if(value.success == true){
									
											if(result.studentAcademicsWrapper[0].recordFound==true)
											{
												   
												$scope.academicsWrapper=result.studentAcademicsWrapper;
													//alert('$scope.academicsWrapper= '+JSON.stringify($scope.academicsWrapper));
													
													$scope.wrapper.studentID= result.studentAcademicsWrapper[0].studentID;
													$scope.wrapper.academicYearID= result.studentAcademicsWrapper[0].academicYearID;
													$scope.wrapper.gradeID= result.studentAcademicsWrapper[0].gradeID;
													$scope.wrapper.sectionID= result.studentAcademicsWrapper[0].sectionID;
													
													
													//alert('allocation ');
													//--------
													$scope.submitted = false;
											    	$scope.form.termID.$invalid=true;
											    	$scope.form.termID.$dirty=false;
											    	$scope.form.subjectID.$invalid=true;
											    	$scope.form.subjectID.$dirty=false;
											    	//$scope.form.targetMarks.$invalid=true;
											    	//$scope.form.targetMarks.$dirty=false;
											    	$scope.form.securedMarks.$invalid=true;
											    	$scope.form.securedMarks.$dirty=false;
											    	//$scope.form.percentage.$invalid=true;
											    	//$scope.form.percentage.$dirty=false;
											    	//$scope.form.rankID.$invalid=true;
												    //$scope.form.rankID.$dirty=false;
											    	//-------------
											    	
											    	
											    	//alert('pagination start');
													
													
											    	//--pagination--
													
													 $scope.totalItems = result.studentAcademicsWrapper.length;
													 //alert('totalItems = '+$scope.totalItems);
													 $scope.currentPage = 1;
												  	 $scope.itemsPerPage =5;
												  	 $scope.maxSize = 5; //Number of pager buttons to show
												  	
												  	 
												  	  if($scope.totalItems >  $scope.itemsPerPage  && $scope.totalItems != null)
												  	  {
												  		$scope.pagination=true;
												  		
												  	  }
												  	  //---pagination end--
												  	  
												  	//alert('pagination end');
													
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
					
					return;
				//--------------END--------------------
			}
	
	
			//------------start loadStudentAcademics Function----------------
			
			$scope.loadScholastic=function(){

				//Android.showToast('loadData Called');


											//Android.showToast('update');
	            								methodAction="fetchStudentAcademicScholastic";

	            								message={
	            										      "refNo" : sharedProperties.getRefNo(),
	            										      "studentID":sharedProperties.getStudentID(),
	            										      "gradeID":sharedProperties.getGradeID()

	            									    };
												//alert('message='+JSON.stringify(message));
	            								$rootScope.loading=true;

	            								jsonData=connectHostFactory(methodAction,message);

	            									jsonData.returnData(function(value){

														//alert('value='+JSON.stringify(value));
	            										if(value != null){

	            												result=value.fetchStudentAcademicScholastic;

	            												if(value.success == true){

	            															if(result.studentAcademicsWrapper[0].recordFound==true)
	            															{
	            																	$scope.wrapper=result.studentAcademicsWrapper;
	            																	
	            																	//Android.openDialog("Scholastic wrapper ",JSON.stringify($scope.wrapper));
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


			
			 }   //------------------- ends loadStudentAcademics Function-----------------
				
			
			
			
			/*$scope.nextPage=function(){ 
					
			  		//$rootScope.selectedIndex = 1;
					//$location.path('/' + 'identification');
					
			}*/
			  	
			 
			  
			//--------START btnBack function-----------
			  $scope.btnBack=function(){
					
				  	$location.path('/queue');
			   }
			//--------ends btnBack function----------- 
			  
			  
			  
			  
			  
			  $scope.setRowData = function(studentID,academicYearID,gradeID,sectionID,termID,subjectID,securedMarks) {
				  
				  $scope.editableOption =true;
				  
				  $scope.wrapper.studentID= '';
				  $scope.wrapper.academicYearID= '';
				  $scope.wrapper.gradeID= '';
				  $scope.wrapper.sectionID= '';
				  
				  $scope.wrapper.termID= '';
				  $scope.wrapper.subjectID= '';
				 // $scope.wrapper.targetMarks= '';
				  $scope.wrapper.securedMarks= '';
				  //$scope.wrapper.percentage= '';
				  //$scope.wrapper.rankID= '';
				  
				 // alert('code '+ code + 'desc '+description +'filter ='+filter);
				 
				  $scope.wrapper.studentID= studentID;
				  $scope.wrapper.academicYearID=academicYearID;
				  $scope.wrapper.gradeID= gradeID;
				  $scope.wrapper.sectionID= sectionID;
				  
				  $scope.wrapper.termID= termID;
				  $scope.wrapper.subjectID=subjectID;
				  //$scope.wrapper.targetMarks= targetMarks;
				  $scope.wrapper.securedMarks= securedMarks;
				 // $scope.wrapper.percentage= percentage;
				  //$scope.wrapper.rankID=rankID;
			  };
			  
			  

			  $scope.clear = function(){
				  
				  $scope.editableOption = false;
				  
			      $scope.submitted = false;
				    

			       $scope.wrapper.code='';
			       $scope.wrapper.description='';
			       $scope.wrapper.filterName='';
			    
				  $scope.wrapper.academicYearID='';
				  $scope.wrapper.gradeID= '';
				  $scope.wrapper.sectionID= '';
				  
				  $scope.wrapper.termID= '';
				  $scope.wrapper.subjectID= '';
				  //$scope.wrapper.targetMarks= '';
				  $scope.wrapper.securedMarks= '';
				  //$scope.wrapper.percentage= '';
				 // $scope.wrapper.rankID='';
				  
			      $scope.form.academicYearID.$invalid=true;
			      $scope.form.academicYearID.$dirty=false;
			      $scope.form.gradeID.$invalid=true;
			      $scope.form.gradeID.$dirty=false;
			      $scope.form.sectionID.$invalid=true;
			      $scope.form.sectionID.$dirty=false;
			      $scope.form.termID.$invalid=true;
			      $scope.form.termID.$dirty=false;
			      //$scope.form.rankID.$invalid=true;
			      //$scope.form.rankID.$dirty=false;
				  
			  }
			  
	}]);  
	
})();










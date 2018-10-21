(function(){
    "use strict";
    
    var app = angular.module('schoolApp');
 
	app.controller('examCalendarController',['$scope', '$rootScope', 'connectHostFactory', '$location', 'sharedProperties', 'commonControls', 'alertsManager', '$mdDialog','messageFactory','appConstants','$filter', function($scope ,$rootScope, connectHostFactory, $location, sharedProperties, commonControls, alertsManager, $mdDialog, messageFactory, appConstants,$filter){
		
	
		var methodAction=null;
		var message=null;
		var jsonData=null; 
		var result=null;
		
		$scope.calendarWrapper=[];
		$scope.wrapper=[];
		
		$scope.popoverWrapper=[];
		
		
		$scope.menuName= sharedProperties.getMenuName();
		
		$scope.academicYearIDValue= sharedProperties.getAcademicYearIDValue();
		$scope.gradeIDValue= sharedProperties.getGradeIDValue();
		$scope.sectionIDValue= sharedProperties.getSectionIDValue();
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
							 "tableName" : "MST_Term",
						 	 "filter" : ""    		
					     },
					     {
							 "tableName" : "MST_Grade",
						 	 "filter" : ""    		
					     },
					     {
							 "tableName" : "MST_ExamStatus",
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
											
											//alert('$scope.popoverWrapper ='+JSON.stringify($scope.popoverWrapper));
										
											
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
			
			/*-----fetchGradeSubjects------*/
			methodAction="fetchGradeSubjects";
								
			message={
						 "academicYearID" : "academicYearID"
						 	    		
					};

				    $rootScope.loading=true;
						 			
					jsonData=connectHostFactory(methodAction, message);
					jsonData.returnData(function(value){
							
						
							if(value != null){
								
									
										result=value.fetchGradeSubjects;
										
										//alert('fetchGradeSubjects result='+JSON.stringify(result));
									
										if(value.success == true){
											
											$scope.wrapper=result.gradeSubjectsWrapper;
											
											
											
											//alert('$scope.Wrapper ='+JSON.stringify($scope.wrapper));
											
											
											
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
			/*-----fetchGradeSubjects end------*/

	 	
		
		 }   //------------------- ends loadData Function-----------------       
		
		
			
		
		
        //--------------start saveData Function-----------------
		
		$scope.saveData=function(messageArrayFlag){
			
			
			//alert('messageArrayFlag  '+messageArrayFlag);
			
			 alertsManager.clearAlerts();
		
			 $scope.submitted = true;
			 
			if ($scope.form.$valid) {
	 
				 	methodAction="updateExamCalendar";
				 	
				 	
				 	
				 	if(messageArrayFlag) //--when the table save call(multiple array)
				 	{	
				 		var message=[];
				 	 
				 		for (var i = 0; i <=$scope.calendarWrapper.length-1; i++) {
				 			message.push({
				 				"academicYearID" : $scope.wrapper[0].academicYearID,
								"gradeID" : $scope.calendarWrapper[i].gradeID,
								"termID" : $scope.wrapper.termID,
								"subjectID" : $scope.calendarWrapper[i].subjectID,
								"examDate" : commonControls.dateFormat($scope.calendarWrapper[i].examDate),	 
								"targetMarks" : $scope.calendarWrapper[i].targetMarks
								//"statusID" : $scope.calendarWrapper[i].listpopup[0].statusID
				 			
				 			});
				 		}
				 	}else
				 	{
				 		//------single subject insert
					 		message=		[{
						"academicYearID" : $scope.wrapper[0].academicYearID,
						"gradeID" : $scope.wrapper.gradeID,
						"termID" : $scope.wrapper.termID,
						"subjectID" : $scope.wrapper.subjectID,
						"examDate" : commonControls.dateFormat($scope.wrapper.examDate),	 
						"targetMarks" : $scope.wrapper.targetMarks,
						//"statusID" : $scope.wrapper.statusID
			    		
	    			  }];
				 	}
						
					//alert('message '+JSON.stringify(message));
				
				$scope.buttonDisabled=true;
				$rootScope.loading=true; 
				
				jsonData=connectHostFactory(methodAction,message);
				jsonData.returnData(function(value){
					
					if(value != null){
						
									 			 
							 		result=value.updateExamCalendar;
		
									if(value.success == true){
										
										
										if( result.examCalendarWrapper[0].recordFound==true)
										{
											
											messageFactory(appConstants.RECORD_UPDATED);
											$scope.fetchExamCalendar(); // To fetch exam calendar function
											
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
		
		//-------FETCH EXAM CALENDAR-------------//
		$scope.fetchExamCalendar=function(){
			
			
			//alert($scope.wrapper.gradeID );  
			
			/*  if($scope.wrapper.gradeID !='undefined' && $scope.wrapper.termID !='undefined')
			  {}*/
					
					
			 
		
				
					methodAction="fetchExamCalendar";
								
					message={
								//"academicYearID" : $scope.wrapper[0].academicYearID,
								"gradeID" : $scope.wrapper.gradeID,
								"termID" : $scope.wrapper.termID
						    };
					
					//alert('fetchExamCalendar message '+JSON.stringify(message));
					$rootScope.loading=true;	 	
					
					jsonData=connectHostFactory(methodAction,message);
					
						jsonData.returnData(function(value){
							
							if(value != null){
									
									result=value.fetchExamCalendar;
									
									//document.writeln('result ='+JSON.stringify(result));
									
									if(value.success == true){
										
												if(result.recordFound==true && result.examCalendarWrapper[0].recordFound==true)
												{
														$scope.calendarWrapper=result.examCalendarWrapper;
														
														//alert('$scope.calendarWrapper ='+JSON.stringify($scope.calendarWrapper));
														 //--pagination--
														
														 $scope.totalItems = result.examCalendarWrapper.length;
														 $scope.currentPage = 1;
													  	 $scope.itemsPerPage =6;
													  	 $scope.maxSize = 6; //Number of pager buttons to show
													  	
													  	 
													  	  if($scope.totalItems >  $scope.itemsPerPage  && $scope.totalItems != null)
													  	  {
													  		$scope.pagination=true;
													  		
													  	  }
													  	  //---pagination end--
												}
												
												else{
													    $scope.calendarWrapper='';
														messageFactory(appConstants.SYSTEM_NORECORDS);
												}
												
												$scope.submitted = false;
												/*$scope.form.subjectID.$invalid=true;
										    	$scope.form.subjectID.$dirty=false;
										    	
										    	$scope.form.examDate.$invalid=true;
										    	$scope.form.examDate.$dirty=false;*/
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
				
			 // }
			 
		 
		}
		
//-------FETCH EXAM CALENDAR------------//
		
		
		//-------FETCH EXAM CALENDAR_M-------------//
		$scope.fetchExamCalendar_M=function(){
			

					methodAction="fetchExamCalendar";
								
					message={
								
								"gradeID" : sharedProperties.getGradeID()
								
						    };
					
					
					$rootScope.loading=true;	 	
					
					jsonData=connectHostFactory(methodAction,message);
					
						jsonData.returnData(function(value){
							
							if(value != null){
									
									result=value.fetchExamCalendar;
									
							
									
									if(value.success == true){
										
												if(result.recordFound==true && result.examCalendarWrapper[0].recordFound==true)
												{
														$scope.calendarWrapper=result.examCalendarWrapper;
												}
												
												else{
														messageFactory(appConstants.SYSTEM_NORECORDS);
												}
												
												$scope.submitted = false;
											
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
		
		//-------FETCH EXAM CALENDAR_M------------//
		
		
		
		 $scope.datepickers = {
				 examDate: false,
  	        	
  	     }
		  
		 $scope.open = function($event, which) {
		   
  	  			$event.preventDefault();
  	  			$event.stopPropagation();
  	  			$scope.datepickers[which]= true;
		 };
			
		 $scope.setRowData = function(academicYearIDValue,gradeIDValue,termIDValue,subjectIDValue,examDate,targetMarks) {
			 
			
			  //alert('AY ='+ academicYearIDValue + 'GV ='+gradeIDValue +'TV ='+termIDValue +'SIDV ='+subjectIDValue+'ED ='+examDate);
			  $scope.wrapper.academicYearID = academicYearIDValue;
			 
			  $scope.wrapper.gradeID = gradeIDValue;
			 
			  $scope.wrapper.termID= termIDValue;
			  
			  $scope.wrapper.subjectID = subjectIDValue;
				 
			  $scope.wrapper.examDate = examDate;
			  
			  $scope.wrapper.targetMarks = targetMarks;
				 
			  //$scope.wrapper.statusID = statusID;
			  
		 };
		 
		 $scope.clear = function(){
			  
			  
			  
			  $scope.calendarWrapper='';
			 
		      $scope.submitted = false;
			    
			  $scope.wrapper.gradeID= '';
			  $scope.wrapper.termID= '';
			  $scope.wrapper.subjectID= '';
			  $scope.wrapper.examDate= '';
			  $scope.wrapper.targetMarks = '';
			  //$scope.wrapper.statusID = '';

		      $scope.form.gradeID.$invalid=true;
		      $scope.form.gradeID.$dirty=false;
		      $scope.form.termID.$invalid=true;
		      $scope.form.termID.$dirty=false;
		      $scope.form.subjectID.$invalid=true;
		      $scope.form.subjectID.$dirty=false;
		      $scope.form.examDate.$invalid=true;
		      $scope.form.examDate.$dirty=false;
		      
		      $scope.form.targetMarks.$invalid=true;
		      $scope.form.targetMarks.$dirty=false;
		      //$scope.form.statusID.$invalid=true;
		      //$scope.form.statusID.$dirty=false;
		      
			  
		  }
		 
		 
		 //---------
		  /*$scope.showStatus = function(list) {
			  //alert('showStatus code'+list);
			    if(list.statusID && $scope.popoverWrapper.length) {
			      var selected = $filter('filter')($scope.popoverWrapper, {code: list.code});
			      return selected.length ? selected[0].text : 'Not set';
			    } else {
			      return list.statusIDValue || 'Not set';
			    }
			  };*/
		 //--------
			  
		  $scope.setTerm=function(term){
			  
			 
			  //alert('term code'+term);
			  
			  $scope.termValues=[];
			  
			  
			   $scope.termValues = $filter('filter')($scope.popoverWrapper,{tableName:'MST_Term'}); //| filter:{gradeID:wrapper.gradeID}//{termID:term}
			   
			  // alert('  $scope.termValues  value'+ JSON.stringify( $scope.termValues));
			   
			   var termObj = $filter('filter')($scope.termValues,{code:term});
			   //alert('  termObj  value '+ JSON.stringify(termObj));
			  
			   $scope.term=termObj[0].desc; 
			  //alert('  $scope.term  '+ JSON.stringify($scope.term));
			  
		  }  
			  	
			  
		 //---------- back button---------
		   $scope.btnBack=function(){

				$location.path('/dashBoard');
		   }
			
		//----------end -back button----------
		   
		   
	}]);  
	
})();










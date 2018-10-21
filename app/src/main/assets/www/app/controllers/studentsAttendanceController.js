(function(){
    "use strict";
    
    var app = angular.module('schoolApp');
 
	app.controller('studentsAttendanceController',['$scope', '$rootScope', 'connectHostFactory', '$location', 'sharedProperties', 'commonControls', '$mdDialog','messageFactory','appConstants', function($scope ,$rootScope, connectHostFactory, $location, sharedProperties, commonControls, $mdDialog, messageFactory, appConstants){
		
	
		var methodAction=null;
		var message=null;
		var jsonData=null; 
		var result=null;
	
		$scope.attendanceWrapper=[];
		
		
		$scope.academicYearIDValue= sharedProperties.getAcademicYearIDValue();
		$scope.gradeIDValue= sharedProperties.getGradeIDValue();
		$scope.sectionIDValue= sharedProperties.getSectionIDValue();
                                                   
        $scope.pageAnimation="view-animate";
		
		
        //------------start loadData Function----------------
		
		$scope.loadData=function(){
			
		
			
			methodAction="fetchMultiPopoverData";
								
			message=[
						 
						 {
							 "tableName" : "MST_Grade",
						 	 "filter" : ""    		
					     },
					     {
							 "tableName" : "MST_Section",
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
		
		
		
  //--------------start fetch Students Function-----------------
		
		$scope.fetchStudents=function(){
			
			$scope.submitted=true;
			
			 if ($scope.form.$valid) {
			
				 	
				 					 methodAction="fetchStudentAttendance";
									 message={
						
												  "gradeID" : $scope.wrapper.gradeID,
												  "sectionID" : $scope.wrapper.sectionID,
												  "calendarDate":commonControls.dateFormatYYYYMMDD($scope.wrapper.calendarDate) 
												 										 
									          };
									 
								   //alert('message' +JSON.stringify(message));
								   
									$scope.buttonDisabled=true;
									$rootScope.loading=true;
									 
									jsonData=connectHostFactory(methodAction,message);
										jsonData.returnData(function(value){
											 
											//alert('Value Data= '+JSON.stringify(value));
											
											if(value != null){
												
															result=value.fetchStudentAttendance;
															
															//document.writeln('value ='+JSON.stringify(value));
															
															//alert('result ='+JSON.stringify(result));
															
															if(value.success == true){
																
																if(result.studentAttendanceWrapper[0].recordFound==true)
																{	
																	//alert('result 1='+JSON.stringify(result));
																	
																	$scope.attendanceWrapper=result.studentAttendanceWrapper;
																	

																	 //--pagination--
																	
																	 $scope.totalItems = result.studentAttendanceWrapper.length;
																	 $scope.currentPage = 1;
																  	 $scope.itemsPerPage =5;
																  	 $scope.maxSize = 5; //Number of pager buttons to show
																  	
																  	 
																  	  if($scope.totalItems >  $scope.itemsPerPage  && $scope.totalItems != null)
																  	  {
																  		$scope.pagination=true;
																  		
																  	  }
																  	  //---pagination end--
																	
																	
																	
																	//alert(' $scope.wrapper='+JSON.stringify($scope.studentsWrapper));
																	
																}
																else
																{		
																	messageFactory(appConstants.SYSTEM_NORECORDS);
																}
															}
															else
															{
																//messageFactory('No response from host system');
																messageFactory(appConstants.SYSTEM_NORESPONSE);
															}
															
											}
											else{
												//messageFactory('Error encountered,Please contact system administrator');
												messageFactory(appConstants.SYSTEM_ERROR);
											}
											
											 $rootScope.loading=false;
											 $scope.buttonDisabled=false;
										});
										
			 }
			 			
		}  //------------ends fetch Students Function-------------
		
		
		
		//--------------start fetchStudentAttendanceByStudent Function---for mobile--------------

		$scope.fetchAttendanceByStudent=function(){



				 					 methodAction="fetchAttendanceByStudent";
									 message={

												  "refNo" : sharedProperties.getRefNo(),
                                                  "gradeID": sharedProperties.getGradeID(),
												  "sectionID" : sharedProperties.getSectionID()

									          };



									$scope.buttonDisabled=true;
									$rootScope.loading=true;

									jsonData=connectHostFactory(methodAction,message);
										jsonData.returnData(function(value){

											//alert('Value Data= '+JSON.stringify(value));

											if(value != null){

															result=value.fetchAttendanceByStudent;

															//document.writeln('value ='+JSON.stringify(value));

															//alert('result ='+JSON.stringify(result));

															if(value.success == true){

																if(result.studentAttendanceWrapper[0].recordFound==true)
																{
																	//alert('result 1='+JSON.stringify(result));

																	$scope.wrapper=result.studentAttendanceWrapper;



																	//alert(' $scope.wrapper='+JSON.stringify($scope.studentsWrapper));

																}
																else
																{
																	messageFactory(appConstants.SYSTEM_NORECORDS);
																}
															}
															else
															{
																//messageFactory('No response from host system');
																messageFactory(appConstants.SYSTEM_NORESPONSE);
															}

											}
											else{
												//messageFactory('Error encountered,Please contact system administrator');
												messageFactory(appConstants.SYSTEM_ERROR);
											}

											 $rootScope.loading=false;
											 $scope.buttonDisabled=false;
										});


		}  //------------ends fetchStudentAttendanceByStudent Function-------------
		
		
		//---------Table data-----------
		
	
		   
		            //------save data----------
		              
		             $scope.saveTable = function() {
		            	 

		            	  
			            	  methodAction="updateStudentAttendance";
								
			            	  
			            	  var message=[];
						 		for (var i = 0; i <=$scope.attendanceWrapper.length-1; i++) {
						 			message.push({
						 				
						 				
						 				"academicYearID":$scope.attendanceWrapper[i].academicYearID,
						 				"refNo":$scope.attendanceWrapper[i].refNo,
						 				"studentID":$scope.attendanceWrapper[i].studentID,
						 				"gradeID":$scope.attendanceWrapper[i].gradeID,
						 				"sectionID":$scope.attendanceWrapper[i].sectionID,
						 				"calendarDate":commonControls.dateFormat($scope.wrapper.calendarDate), 
						 				"morningStatus":$scope.attendanceWrapper[i].morningStatus,
						 				"eveningStatus":$scope.attendanceWrapper[i].eveningStatus,
						 				"delivered":'N'
						 				
						 			});
						 		}
						 		
						 		//alert('message '+JSON.stringify(message));
						 		
						 		$scope.buttonDisabled=true;
								$rootScope.loading=true; 
								
								jsonData=connectHostFactory(methodAction,message);
								jsonData.returnData(function(value){
									
									if(value != null)
									{
										
													
											 		result=value.updateStudentAttendance;

													if(value.success == true)
													{
														
														
															if( result.recordFound==true)
															{
															
																messageFactory(appConstants.RECORD_UPDATED);
																		
									
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
									//$scope.editBtnEnable=false;
								});
			            	  
			            	
				             
			           };
			
		              
		              
		//--------table end-------------
		
    
			           $scope.datepickers = {
				  	        	calendarDate: false
				  	        
				  	      }
						  
						  
						  $scope.open = function($event, which) {
						   
				  	  			$event.preventDefault();
				  	  			$event.stopPropagation();
				  	  			$scope.datepickers[which]= true;
						  };
						  
						  
						  
			
		
			         //--------START btnBack function-----------
						  $scope.btnBack=function(){
								$location.path('/dashBoard');
						   }
						//--------ends btnBack function----------- 
	
		
			  
			  
		
			  
	}]);  
	
})();










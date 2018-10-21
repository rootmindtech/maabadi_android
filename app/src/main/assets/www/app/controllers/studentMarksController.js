(function(){
    "use strict";
    
    var app = angular.module('schoolApp');
 
	app.controller('studentMarksController',['$scope', '$rootScope', 'connectHostFactory', '$location', 'sharedProperties', 'commonControls', '$mdDialog','messageFactory','appConstants', function($scope ,$rootScope, connectHostFactory, $location, sharedProperties, commonControls, $mdDialog, messageFactory, appConstants){
		
	
		var methodAction=null;
		var message=null;
		var jsonData=null; 
		var result=null;
	
		$scope.marksWrapper=[];
		
		$scope.editBtnEnable=true;
		
		
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
			
				 	
				 					 methodAction="fetchStudentMarks";
									 message={
						
												  "gradeID" : $scope.wrapper.gradeID,
												  "sectionID" : $scope.wrapper.sectionID,
												  "termID": $scope.wrapper.termID,
												  "subjectID": $scope.wrapper.subjectID
												 
									   };
									 
								  // alert('message' +JSON.stringify(message));
								   
									$scope.buttonDisabled=true;
									$rootScope.loading=true;
									 
									jsonData=connectHostFactory(methodAction,message);
										jsonData.returnData(function(value){
											 
											//alert('Value Data= '+JSON.stringify(value));
											
											if(value != null){
												
															result=value.fetchStudentMarks;
															
															//document.writeln('value ='+JSON.stringify(value));
															
															//alert('result ='+JSON.stringify(result));
															
															if(value.success == true){
																
																if(result.studentAcademicsWrapper[0].recordFound==true)
																{	
																	//alert('result 1='+JSON.stringify(result));
																	
																	$scope.marksWrapper=result.studentAcademicsWrapper;
																	
																	$scope.editBtnEnable=false;
																	

																	 //--pagination--
																	
																	 $scope.totalItems = result.studentAcademicsWrapper.length;
																	 $scope.currentPage = 1;
																  	 $scope.itemsPerPage =5;
																  	 $scope.maxSize = 5; //Number of pager buttons to show
																  	
																  	 
																  	  if($scope.totalItems >  $scope.itemsPerPage  && $scope.totalItems != null)
																  	  {
																  		$scope.pagination=true;
																  		
																  	  }
																  	  //---pagination end--
																	
																	//alert(' $scope.wrapper='+JSON.stringify($scope.marksWrapper));
																	
																}
																else
																{
																	$scope.editBtnEnable=true;
																	$scope.marksWrapper='';
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
		
		
			
		//---------Table data-----------
		
	
		            
		              $scope.checkName = function(data, id) {
		            	  
		            	  //alert('data = '+JSON.stringify(data) +' id= '+JSON.stringify(id));
		            	  
		            	 /*if (id === 2 && data !== 'awesome') {
		                  return "Username 2 should be `awesome`";
		                }*/
		            	  
		              };


		              // add user
		            /*  $scope.addUser = function() {
		                $scope.users.push({
		                  id: $scope.users.length+1,
		                  name: '',
		                  status: null,
		                  group: null,
		                  isNew: true
		                });
		              };
*/
		              // cancel all changes
		            /*  $scope.cancel = function() {
		                for (var i = $scope.users.length; i--;) {
		                  var user = $scope.users[i];    
		                  // undelete
		                  if (user.isDeleted) {
		                    delete user.isDeleted;
		                  }
		                  // remove new 
		                  if (user.isNew) {
		                    $scope.users.splice(i, 1);
		                  }      
		                };
		              };*/

		   
		            //------save data----------
		              
		             $scope.saveTable = function() {
		            	 
		            	 
		            	 // $scope.editBtnEnable=true;
		            		 /*
		            		 if($scope.marksWrapper.securedMarks > $scope.marksWrapper.targetMarks)
		            		 {
		            			 return "Secured marks should be less than target marks";
		            		 }*/
		            		
		            	
		            	  
			            	  methodAction="updateStudentMarks";
								
			            	  
			            	  var message=[];
						 		for (var i = 0; i <=$scope.marksWrapper.length-1; i++) {
						 			message.push({
						 				"academicYearID":$scope.marksWrapper[i].academicYearID,
						 				"gradeID":$scope.marksWrapper[i].gradeID,
						 				"sectionID":$scope.marksWrapper[i].sectionID,
						 				"termID":$scope.marksWrapper[i].termID,
						 				"subjectID":$scope.marksWrapper[i].subjectID,
						 				"refNo":$scope.marksWrapper[i].refNo,
						 				"studentID":$scope.marksWrapper[i].studentID,
						 				"studentName":$scope.marksWrapper[i].studentName,
						 				"targetMarks":$scope.marksWrapper[i].targetMarks,
						 		        "securedMarks":$scope.marksWrapper[i].securedMarks,
						 		        "percentage":$scope.marksWrapper[i].percentage,
						 		        "rankID":$scope.marksWrapper[i].rankID
						 			});
						 		}
						 		
						 		
						 		//alert('save table message '+JSON.stringify(message));
						 		$scope.buttonDisabled=true;
								$rootScope.loading=true; 
								
								jsonData=connectHostFactory(methodAction,message);
								jsonData.returnData(function(value){
									
									if(value != null)
									{
										
													
											 		result=value.updateStudentMarks;

													if(value.success == true)
													{
														
														
															if( result.recordFound==true)
															{
															
																messageFactory(appConstants.RECORD_UPDATED);
																		
																$scope.fetchStudents();
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
			            	  
			            	
				              /*  var results = [];
				                for (var i = $scope.marksWrapper.length; i--;) {
				                  var user = $scope.marksWrapper[i];
				                  // actually delete user
				                  if (user.isDeleted) {
				                    $scope.users.splice(i, 1);
				                  }
				                  // mark as not new 
				                  if (user.isNew) {
				                    user.isNew = false;
				                  }
	
				                  // send on server
				                  //results.push($http.post('/saveUser', user));  
				                  
				                  
				                }
	
				                return $q.all(results);*/
			                
			           };
			
		              
		              
		//--------table end-------------
		
    
			
		
			         //--------START btnBack function-----------
						  $scope.btnBack=function(){
								$location.path('/dashBoard');
						   }
						//--------ends btnBack function----------- 
	
		
			  
			  
		
			  
	}]);  
	
})();










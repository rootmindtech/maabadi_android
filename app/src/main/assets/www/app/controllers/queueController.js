(function(){
    "use strict";
    
    var app = angular.module('schoolApp');
 
	app.controller('queueController',['$scope','$rootScope', 'connectHostFactory', '$location','sharedProperties', 'commonControls','messageFactory','appConstants', function($scope, $rootScope, connectHostFactory, $location, sharedProperties, commonControls, messageFactory, appConstants){
	
		
		var methodAction=null;
		var message=null;
		var jsonData=null;
		var result=null;
		var recordStatus=null;
		
		$scope.menuName= sharedProperties.getMenuName();
		
		
		
		
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
						 			
					jsonData=connectHostFactory(methodAction, message);
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
		
		   /* methodAction="fetchStudentsQueue";
						
		    recordStatus = "Active";
		    	
		    message={
			    		      "status" : recordStatus,
			    		      "makerId"    :	$rootScope.userid											//makerid
			    		      
					};
		    
						
		 			
		    $rootScope.loading=true;
			jsonData=connectHostFactory(methodAction,message);
							jsonData.returnData(function(value){
								
								
								
								 
								 if(value != null){
								
									//alert('Queue Data value= '+JSON.stringify(value));
										
										result=value.fetchStudentsQueue;
										if(value.success == true){
											
											$scope.wrapper=result.studentProfileWrapper;
											
											//document.writeln('result.personalDetailsWrapper = '+JSON.stringify(result.personalDetailsWrapper));
											
											 $scope.totalItems = result.studentProfileWrapper.length;
											  
											// alert('totalItems length '+$scope.totalItems);
											
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
											//messageFactory('No response from host system');
											messageFactory(appConstants.SYSTEM_NORECORDS);
										}
								 }
								 else{
									// messageFactory('Error encountered,Please contact system administrator');
									 messageFactory(appConstants.SYSTEM_ERROR);
								 }
								 $rootScope.loading=false;
								
							});*/
		 } //------------ends loadData Function----------------
		
		
		 //------------start saveData Function----------------
		$scope.searchData=function(){
			
		
			//($scope.form.academicYear.$valid && ($scope.form.studentName.$valid || $scope.form.surname.$valid) )
			 
			
			 if($scope.form.studentID.$valid || $scope.form.studentName.$valid || $scope.form.surname.$valid || $scope.form.grade.$valid || $scope.form.sectionID.$valid) {	 
				 
			
						    methodAction="fetchStudentSearch";
										
							message={
						    		      "studentID" : $scope.wrapper.studentID,
						    		      "studentName" : $scope.wrapper.studentName,
						    		      "surname" : $scope.wrapper.surname,
						    		      "gradeID" : $scope.wrapper.grade,
						    		      "sectionID" : $scope.wrapper.sectionID
						    		      
						    		     /* "academicYearID" : $scope.wrapper.academicYear*/
						    		     
						    		      
									    };
							
							//alert('Search Student Data= '+JSON.stringify(message));
							$scope.buttonDisabled=true;
							$rootScope.loading=true;
							
							jsonData=connectHostFactory(methodAction,message);
											jsonData.returnData(function(value){
												
												 
												 
												 $scope.pagination=false;
													
												//alert('OnBoard Data= '+JSON.stringify(value));
												if(value != null){
													
													result=value.fetchStudentSearch;
													
													if(value.success == true){
																
															if( result.studentProfileWrapper[0].recordFound==true)
															{
																$scope.wrapper=result.studentProfileWrapper;
																
																 //--pagination--
																
																 $scope.totalItems = result.studentProfileWrapper.length;
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
																
																$scope.wrapper='';
																
																messageFactory(appConstants.SYSTEM_NORECORDS);
															
															}
													}
													else{
														//messageFactory('No response from host system');
														messageFactory(appConstants.SYSTEM_NORECORDS);
														
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
				
				else{
					     
					     
					    /*if (angular.isDefined($scope.wrapper.academicYear) || $scope.wrapper.academicYear != null) {

						    messageFactory('Please enter Name or Surname to search with academic year');
						   
					   }
					   else{*/
					
						 messageFactory('Enter data before search');
					   //}
					}
		}
	
		/*end search Data*/
		$scope.selectedData=function(refNo,studentID,studentName,surname,gradeID,sectionID,academicYearID){
			
			
					
					
					
					sharedProperties.setRefNo(refNo);
					
					//alert('selected data'+refNo +studentID +studentName  +gradeID +sectionID +academicYearID);
					
					sharedProperties.setStudentID(studentID);
					sharedProperties.setStudentName(studentName);
					sharedProperties.setSurname(surname);
					sharedProperties.setGradeID(gradeID);
					sharedProperties.setSectionID(sectionID);
					sharedProperties.setAcademicYearID(academicYearID);
					
					//alert('shared data'+sharedProperties.getRefNo() +sharedProperties.getStudentID() +sharedProperties.getStudentName()  +sharedProperties.getGrade() +sharedProperties.getSection() +sharedProperties.getAcademicYear());
					
					
				
					//$rootScope.isTabBarDisable = true;
					//$rootScope.selectedIndex = 0;
				/*	if(sharedProperties.getMenu() == 'studentProfile')
					{
					*/	sharedProperties.setActionMode('UPDATE');
					//}
					
					$location.path('/' + sharedProperties.getMenu());
			
	    }
		
		
		 $scope.datepickers = {
				 searchStartDate: false,
				 searchEndDate:false
 	      }
		 
		 $scope.open = function($event, which) {
		   
 	  			$event.preventDefault();
 	  			$event.stopPropagation();
		   
 	  			$scope.datepickers[which]= true;
		   
		  	  };
		  	  
		 //-----pagenation--
		  	 /* $scope.filteredTodos = [];
		  	  $scope.currentPage = 1;
		  	  $scope.numPerPage = 10;
		  	  $scope.maxSize = 5;
		  	  
		  	  $scope.makeTodos = function() {
		  	    $scope.wrapper = [];
		  	    for (var i=0;i<=$scope.wrapper.length-1;i++) {
		  	      $scope.wrapper.push({ text:'todo '+i, done:false});
		  	    }
		  	  };
		  	  //$scope.makeTodos(); 
		  	  
		  	  $scope.$watch('currentPage + numPerPage', function() {
		  	    var begin = (($scope.currentPage - 1) * $scope.numPerPage)
		  	    , end = begin + $scope.numPerPage;
		  	    
		  	    $scope.filteredTodos = $scope.wrapper.slice(begin, end);
		  	    
		  	  });*/
		  	  
		  	  
		  	  
		  	 
		 //-----pagenation end--
		  	  
		  	 //---------- back button---------
			   $scope.btnBack=function(){

					$location.path('/dashBoard');
			   }
				
				//----------end -back button----------
			 
	
	}]);   
	
})();
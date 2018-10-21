(function(){
    "use strict";
    
    var app = angular.module('schoolApp');
 
	app.controller('schoolFeeController',['$scope', '$rootScope', 'connectHostFactory', '$location', 'sharedProperties', 'commonControls', 'alertsManager', '$mdDialog','messageFactory','appConstants', function($scope ,$rootScope, connectHostFactory, $location, sharedProperties, commonControls, alertsManager, $mdDialog, messageFactory, appConstants){
		
	
		var methodAction=null;
		var message=null;
		var jsonData=null; 
		var result=null;
		
		$scope.wrapper = [];
		
		$scope.menuName= sharedProperties.getMenuName();
		$scope.refNo= sharedProperties.getRefNo();
		$scope.studentName=sharedProperties.getStudentName();
		$scope.surname=sharedProperties.getSurname();
		/*$scope.menu= sharedProperties.getMenu();

	
		$scope.actionMode=sharedProperties.getActionMode();*/
		

		
		$scope.editableOption = true;
		//$rootScope.isTabBarDisable=true;
		
		
        //------------start loadData Function----------------
		
		$scope.loadData=function(){
			
		
			
			methodAction="fetchMultiPopoverData";
								
			message=[
			               
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
							 "tableName" : "MST_FeeType",
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
				
					/* if(sharedProperties.getActionMode()=='UPDATE'){

						 $scope.searchData();
					 		
					  }	
				*/
	
		
		 }   //------------------- ends loadData Function-----------------       
		
		
			
		
		
        //--------------start saveData Function-----------------
		
		$scope.saveData=function(){   
			
		
			 alertsManager.clearAlerts();
		
			 $scope.submitted = true;
			 
			 if ($scope.form.$valid) {
				 
		 
				 	    methodAction="updateSchoolFee";
						 
				 		
				 		
						message={
						
					    		    "refNo" : sharedProperties.getRefNo(),
					    			"studentID" : $scope.wrapper.studentID,
					    			"gradeID" : $scope.wrapper.gradeID,
					    			"sectionID" : $scope.wrapper.sectionID,
					    			"feeType" : $scope.wrapper.feeType,
					    			"feeAmount" : $scope.wrapper.feeAmount,
					    			"paymentDate": commonControls.dateFormat($scope.wrapper.paymentDate), 
					    			"invoiceNo": $scope.wrapper.invoiceNo //it is used for update only
					    			
				    		};
				
				alert('save message ='+JSON.stringify(message));
				
				$scope.buttonDisabled=true;
				$rootScope.loading=true; 
				
				jsonData=connectHostFactory(methodAction,message);
				jsonData.returnData(function(value){
					
					//alert('Value personal Data= '+JSON.stringify(value));
				
					if(value != null){
						
									
										 
									result=value.updateSchoolFee;
					
								
					
						
									if(value.success == true){
										
										
									
										
										if( result.schoolFeeWrapper[0].recordFound==true)
										{
											
																	
													$scope.searchData();
												   
													messageFactory(appConstants.RECORD_UPDATED);
													
													
									
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
		
			
		
			$scope.searchData=function(){
				
				//alert('search data');
				
				 //---------TO RELOAD UPDATED RECORD--------
				methodAction="fetchSchoolFee";
				
				message={		
						 	 
						      "refNo" : sharedProperties.getRefNo(),
						      "studentID" : sharedProperties.getStudentID()
						     
					    };
				
				//alert('SearchData message ' +JSON.stringify(message));
					 		
				$rootScope.loading=true;	 	
				
				jsonData=connectHostFactory(methodAction,message);
				
					jsonData.returnData(function(value){
						
						if(value != null){
							
							//alert('value = ' +JSON.stringify(value));
							
							//document.writeln('value = ' +JSON.stringify(value));
								
								result=value.fetchSchoolFee;
								
								if(value.success == true){
									
									
									
											if(result.schoolFeeWrapper[0].recordFound==true)
											{
													
													$scope.wrapper=result.schoolFeeWrapper;
													
													
													
													$scope.wrapper.studentID= result.schoolFeeWrapper[0].studentID;
													$scope.wrapper.academicYearID= result.schoolFeeWrapper[0].academicYearID;
													$scope.wrapper.gradeID= result.schoolFeeWrapper[0].gradeID;
													$scope.wrapper.sectionID= result.schoolFeeWrapper[0].sectionID;
													
													//--------
													$scope.submitted = false;
											    	$scope.form.feeType.$invalid=true;
											    	$scope.form.feeType.$dirty=false;
											    	$scope.form.feeAmount.$invalid=true;
											    	$scope.form.feeAmount.$dirty=false
											    	$scope.form.paymentDate.$invalid=true;
											    	$scope.form.paymentDate.$dirty=false;
											    	
											    	//-------------
											    	
											    	
													
													//alert('totalItems = '+$scope.totalItems);
													
													//--pagination--
											    	
											    	 $scope.totalItems = $scope.wrapper.length;
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
					
					return;
				//--------------END--------------------
			}
	

			
			 $scope.datepickers = {
		  	        				paymentDate: false
		  	        				
			 					  }
				  
				  
				  $scope.open = function($event, which) {
				   
		  	  			$event.preventDefault();
		  	  			$event.stopPropagation();
		  	  			$scope.datepickers[which]= true;
				  };
			 
			  
			//--------START btnBack function-----------
			  $scope.btnBack=function(){
					
				  	$location.path('/queue');
			   }
			//--------ends btnBack function----------- 
			  
			  
			
			  
			  $scope.setRowData = function(invoiceNo,studentID,academicYearID,gradeID,sectionID,feeType,feeAmount,paymentDate) {
				  $scope.editableOption =true;
				  
				  $scope.wrapper.invoiceNo= '';
				  $scope.wrapper.studentID= '';
				  $scope.wrapper.academicYearID= '';
				  $scope.wrapper.gradeID= '';
				  $scope.wrapper.sectionID= '';
				  
				  $scope.wrapper.feeType= '';
				  $scope.wrapper.feeAmount= '';
				  $scope.wrapper.paymentDate= '';
				 
				  
				 // alert('code '+ code + 'desc '+description +'filter ='+filter);
				  $scope.wrapper.invoiceNo= invoiceNo;
				  $scope.wrapper.studentID= studentID;
				  $scope.wrapper.academicYearID=academicYearID;
				  $scope.wrapper.gradeID= gradeID;
				  $scope.wrapper.sectionID= sectionID;
				  
				  $scope.wrapper.feeType= feeType;
				  $scope.wrapper.feeAmount= feeAmount;
				  $scope.wrapper.paymentDate= paymentDate;
			  };
			  
			 
			  
			  
			  
			  $scope.clear = function(){
				  
				  $scope.editableOption = false;
				  
			      $scope.submitted = false;
				  

			     /*  $scope.wrapper.code='';
			       $scope.wrapper.description='';
			       $scope.wrapper.filterName='';*/
			    
			    /*  $scope.wrapper.studentID= '';
				  $scope.wrapper.academicYearID= '';
				  $scope.wrapper.gradeID= '';
				  $scope.wrapper.sectionID= '';
				  */
			      
				  $scope.wrapper.feeType= '';
				  $scope.wrapper.feeAmount= '';
				  $scope.wrapper.paymentDate= '';
				  
			    /*  $scope.form.academicYearID.$invalid=true;
			      $scope.form.academicYearID.$dirty=false;
			      $scope.form.gradeID.$invalid=true;
			      $scope.form.gradeID.$dirty=false;
			      $scope.form.sectionID.$invalid=true;
			      $scope.form.sectionID.$dirty=false;*/
			      
			     
				  
			  }
			  
	}]);  
	
})();










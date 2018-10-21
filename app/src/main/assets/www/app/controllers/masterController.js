(function(){
    "use strict";
    
    var app = angular.module('schoolApp');
 
	app.controller('masterController',['$scope', '$rootScope','connectHostFactory', '$location', 'sharedProperties', 'commonControls', 'alertsManager','appConstants', 'messageFactory', function($scope,$rootScope, connectHostFactory, $location, sharedProperties, commonControls, alertsManager, appConstants,messageFactory){
		
		
		var methodAction=null;
		var message=null;
		var jsonData=null; 
		var result=null;
		var popoverWrapperLength=null;
		
		var masterTableName=null;
		var masterFilter=null;
		
		$scope.wrapper=[];
		
		$scope.menuName= sharedProperties.getMenuName();
		 //------------start loadData Function----------------
		
		 $scope.loadData=function(){
		
			 		  methodAction="fetchTableNames";
							
			 		  //dummy request
			 		  message={
							 "tableName" : "MST_TableNames"   		
						    };
						   
						
							 	
					  $rootScope.loading=true;
					  
					  jsonData=connectHostFactory(methodAction,message);
						
					  		jsonData.returnData(function(value){
					  			
								//alert('value '+JSON.stringify(value));
					  			if(value != null){
					  				
						  				result=value.fetchTableNames;
						  				
						  				//alert('result '+result);
										
										if(value.success == true){
											
											if(result.popoverWrapper[0].recordFound==true)
											{
											
												$scope.tableNames=result.popoverWrapper;
											}
											else
											{
												messageFactory(appConstants.SYSTEM_NORECORDS);
											}
											
										}
										else{
											//messageFactory('No response from host system');
											messageFactory(appConstants.SYSTEM_NORESPONSE);
										}

					  			}
					  			else{
					  				//messageFactory('Error encountered,Please contact system administrator');
					  				
					  				messageFactory(appConstants.SYSTEM_ERROR);
					  			}
								
								$rootScope.loading=false;
								
							});	
							
			
		 }
		//------------ends loadData Function----------------
		
		
		
		//----------

		$scope.fetchMasterData=function(){                                               // getTableData Function
			
			  $scope.wrapper.code='';
		      $scope.wrapper.description='';
		      $scope.wrapper.filterName='';

			 
				    methodAction="fetchMasterData";
				    
				    masterTableName=$scope.tableNames.code.substring(0,$scope.tableNames.code.length-1);
				    masterFilter=$scope.tableNames.code.substring($scope.tableNames.code.length-1,$scope.tableNames.code.length);			
				    message={
				    	
						 "tableName" :masterTableName, 										//"GENDER",  
					     "filter" :masterFilter    		
					    };
					
					 if(masterFilter =='Y')
					 {
						 $scope.filterEnabled=false;
					 }
					 else
					 {
						 $scope.filterEnabled=true;
						 
					 }
					 
					
				    //alert('Master message= '+JSON.stringify(message));
				    $rootScope.loading=true;
						 			
					jsonData=connectHostFactory(methodAction,message);
						jsonData.returnData(function(value){
							
							$rootScope.loading=false;
							
							//alert('Master Popover value Data= '+JSON.stringify(value));
							
							result=value.fetchMasterData;
						
							if(value.success == true){
								
								if(result.recordFound==true)
								{
										
										//alert('Master   result Data= '+JSON.stringify(result));
										$scope.popoverWrapper=result.popoverWrapper;
										
										//popoverWrapperLength=$scope.popoverWrapper.length;
										
										$scope.totalItems = $scope.popoverWrapper.length;
										
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
								else
								{
									messageFactory(appConstants.SYSTEM_NORECORDS);
								}
								
									

							}
							else{
								//messageFactory('No response from host system');
								messageFactory(appConstants.SYSTEM_NORESPONSE);
							}
							
						});
				
		
						
	
		
		 }                          // end getTableData Function       
		
		
	
		   /* save data*/
		$scope.saveData=function(){
			
			//alert('button save');
			
			$scope.submitted = true;
			
		
			//alert('button save2');
			
			 if ($scope.form.$valid){
			
				 					//alert('tablename '+masterTableName);
				 
									 methodAction="updateMasterData";
									 message={
											 
											 "tableName" : masterTableName,
												  "code" : $scope.wrapper.code,
												  "desc" : $scope.wrapper.description,
												  "filter": $scope.wrapper.filterName
												  
									 };
									 
									//alert('save message = '+ JSON.stringify(message));
									 
									 $rootScope.loading=true;
									jsonData=connectHostFactory(methodAction,message);
										jsonData.returnData(function(value){
											
											 $rootScope.loading=false;
											//alert('Value Data= '+JSON.stringify(value));
											
											result=value.updateMasterData;
											
											//alert('result Data= '+JSON.stringify(result));
											if(value.success == true){
												
												if(result.popoverWrapper[0].recordFound==true)
												{
														
													messageFactory(appConstants.RECORD_UPDATED);
													
												}
												else
												{
													messageFactory(appConstants.SYSTEM_NORECORDS);
												}
												
											}
											else{
												
												messageFactory(appConstants.SYSTEM_NORESPONSE);
											}
											
											
											
										});
										
			    }

			 			
			 
			}               //close saveData function
			 
			 
		
		  $scope.setRowData = function(code,description,filter) {
			  $scope.editableOption =true;
			  $scope.wrapper.code='';
		      $scope.wrapper.description='';
		      $scope.wrapper.filterName='';
			  
			 // alert('code '+ code + 'desc '+description +'filter ='+filter);
			  $scope.wrapper.code = code;
			 
			  $scope.wrapper.description = description;
			 
			  $scope.wrapper.filterName = filter;
			  
			 
			  
		  };
		  
		  
		  $scope.clear = function(){
			  
			  $scope.editableOption = false;
			  
		      $scope.submitted = false;
			    
			       $scope.wrapper.code='';
			       $scope.wrapper.description='';
			       $scope.wrapper.filterName='';
			  
		  }
		  

	         //--------START btnBack function-----------
				  $scope.btnBack=function(){
						$location.path('/dashBoard');
				   }
				//--------ends btnBack function----------- 
	
	}]);  
	
	 
	
})();










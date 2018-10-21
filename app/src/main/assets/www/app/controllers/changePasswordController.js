(function(){
    "use strict";
    
    var app = angular.module('schoolApp');
 
	app.controller('changePasswordController',['$scope', '$rootScope', 'connectHostFactory', 'connectHostImageFactory', '$location', 'sharedProperties', 'commonControls', 'alertsManager', '$mdDialog','messageFactory','appConstants', function($scope ,$rootScope, connectHostFactory,connectHostImageFactory, $location, sharedProperties, commonControls, alertsManager, $mdDialog, messageFactory, appConstants){
		
	
		var methodAction=null;
		var message=null;
		var jsonData=null; 
		var result=null;
		
		$scope.usersStaffWrapper=[];
		$scope.wrapper=[];
	
		
		$scope.menuName= sharedProperties.getMenuName();
		//$scope.refNo= sharedProperties.getRefNo();
		//$scope.actionMode=sharedProperties.getActionMode();
		//$scope.studentName= sharedProperties.getStudentName();
		//$scope.surname= sharedProperties.getSurname();
		
        //------------start loadData Function----------------
		$scope.loadData=function(){  
			

				 		methodAction="fetchUsersStaff";
						
						message={};
				
						
				//alert('message = '+JSON.stringify(message));
				$scope.buttonDisabled=true;
				$rootScope.loading=true; 
				
				jsonData=connectHostFactory(methodAction,message);
				jsonData.returnData(function(value){
					
					if(value != null){
						
									result=value.fetchUsersStaff;

									if(value.success == true){
										
										//alert('value = '+JSON.stringify(value));
										
										if( result.usersWrapper[0].recordFound==true)
										{

												$scope.usersStaffWrapper= result.usersWrapper;
												
												//alert('$scope.wrapper = '+JSON.stringify($scope.wrapper));
												
												
												//--pagination--
												
												 $scope.totalItems = result.usersWrapper.length;
												 //alert('totalItems = '+$scope.totalItems);
												 $scope.currentPage = 1;
											  	 $scope.itemsPerPage =5;
											  	 $scope.maxSize = 5; //Number of pager buttons to show
											  	
											  	 
											  	  if($scope.totalItems >  $scope.itemsPerPage  && $scope.totalItems != null)
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
		
		//------------end loadData Function------------------
	
		
		$scope.saveData=function(){   
			

			 alertsManager.clearAlerts();
		
			 $scope.submitted = true;
			 
			
			 
			 if ($scope.form.$valid) {
				 
				 if(!angular.equals($scope.wrapper.password,$scope.wrapper.retypePassword))
				 {
					 
					 return; //alert('password and reentered passwords are same ');
				 }
				 	 
				 
				 		methodAction="changePassword";
					
				 		
						message={
						
					    	    "userid":	$rootScope.userid,	
					    		"staffUserID": $scope.wrapper.userid,
					    		"password": $scope.wrapper.password,  
					    		"status": $scope.wrapper.status  
				    		};
				
						
				//alert('message = '+JSON.stringify(message));
				$scope.buttonDisabled=true;
				$rootScope.loading=true; 
				
				jsonData=connectHostFactory(methodAction,message);
				jsonData.returnData(function(value){
					
					if(value != null){
					
										 
									result=value.changePassword;
					
									
						
									if(value.success == true){
										
										
										if( result.usersWrapper[0].recordFound==true)
										{
											
														
												messageFactory("Password changed successfully");
												
											
									
										}
										else{
											
										
												messageFactory("Password not changed");
											
											
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
		
		
		
		$scope.setRowData = function(userid,status) {
			  //$scope.editableOption =true;
			
			  $scope.wrapper.userid= '';
			  $scope.wrapper.status= '';
			  
			  $scope.wrapper.userid=userid;
			  $scope.wrapper.status=status;
			  
			  $scope.wrapper.password='';
			  $scope.wrapper.retypePassword='';
			  
			  //alert('userid 1'+userid +' status 1'+status);
			  
			  //alert('  $scope.wrapper.userid '+  $scope.wrapper.userid +'   $scope.wrapper.status '+  $scope.wrapper.status);
		
		  };
		  
		  

		  $scope.clear = function(){
			  
			  //$scope.editableOption = false;
			  
		      $scope.submitted = false;
			    

		      $scope.wrapper.userid='';
		      $scope.wrapper.status='';
		       
		      $scope.wrapper.password='';
			  $scope.wrapper.retypePassword='';
			 
			  
		      $scope.form.userid.$invalid=true;
		      $scope.form.userid.$dirty=false;
		      $scope.form.status.$invalid=true;
		      $scope.form.status.$dirty=false;
		     
			  
		  }

			
			
    
			//--------START btnBack function-----------
			  $scope.btnBack=function(){
					$location.path('/dashBoard');
			   }
			//--------ends btnBack function----------- 
	}]);  
	
})();










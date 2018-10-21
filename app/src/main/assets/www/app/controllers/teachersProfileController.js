(function(){
    "use strict";
    
    var app = angular.module('schoolApp');
 
	app.controller('teachersProfileController',['$scope', '$rootScope', 'connectHostFactory', 'connectHostImageFactory', '$location', 'sharedProperties', 'commonControls', 'alertsManager', '$mdDialog','messageFactory','appConstants', function($scope ,$rootScope, connectHostFactory,connectHostImageFactory, $location, sharedProperties, commonControls, alertsManager, $mdDialog, messageFactory, appConstants){
		
	
		var methodAction=null;
		var message=null;
		var jsonData=null; 
		var result=null;
		var destination=null;
		
		$scope.wrapper=[];
		$scope.teachersProfileWrapper=[];
        $scope.imgArray=[];
	    $scope.pattern = /^[a-z]+[a-z0-9._]+@[a-z]+\.[a-z.]{2,5}$/;
		
		$scope.menuName= sharedProperties.getMenuName();
		$scope.refNo= sharedProperties.getRefNo();
		$scope.actionMode=sharedProperties.getActionMode();
		
        $scope.pageAnimation="view-animate";
		
		//$scope.studentName= sharedProperties.getStudentName();
		//$scope.surname= sharedProperties.getSurname();
		
		/*$scope.menu= sharedProperties.getMenu();
		
		$scope.menuName= sharedProperties.getMenuName();
		$scope.refNo= sharedProperties.getRefNo();
		$scope.customerName=sharedProperties.getCustomerName();
		*/
		
		//$rootScope.isTabBarDisable=true;
		
		
       
			
		
		
        //--------------start saveData Function-----------------
		
		$scope.saveData=function(){   
			

			 alertsManager.clearAlerts();
		
			 $scope.submitted = true;
			 
			 
			 
			 if ($scope.form.$valid) {
				 
			
							 
				 		methodAction="updateTeachersProfile";

						message={
						
					    		"staffUserID":$scope.wrapper.staffUserID,
					    		"staffRefNo": $scope.wrapper.staffRefNo,  //staff Ref no
					    		"header": $scope.wrapper.header,  
					    		"name": $scope.wrapper.name,   
					    		"description": $scope.wrapper.description,   
					    		"mobileNo": $scope.wrapper.mobileNo,  
					    		"emailID": $scope.wrapper.emailID, 
					    		"orderNumber": $scope.wrapper.orderNumber,   
					    			
				    		};
				
						
				//alert('message = '+JSON.stringify(message));
				
				$scope.buttonDisabled=true;
				$rootScope.loading=true; 
				
				jsonData=connectHostFactory(methodAction,message);
				jsonData.returnData(function(value){
					
					if(value != null){
						
										 
									result=value.updateTeachersProfile;
					
									if(value.success == true){
										
										
										if( result.teachersProfileWrapper[0].recordFound==true)
										{
											
													
											
													$scope.wrapper=result.teachersProfileWrapper[0];
													
													messageFactory(result.teachersProfileWrapper[0].name  + " profile is updated");
													
													$scope.fetchTeachersProfile();
													//sharedProperties.setRefNo(result.teachersProfileWrapper[0].refNo);
													/*$scope.refNo= result.teachersProfileWrapper[0].refNo;
													
													if(sharedProperties.getActionMode()=='UPDATE'){
														messageFactory(appConstants.RECORD_UPDATED);
													}
													else
													{
														
														messageFactory(result.teachersProfileWrapper[0].name  + " profile is created");
													}*/
													
													//sharedProperties.setActionMode('UPDATE');
													
													//$scope.loadStudentProfile();
												
										 				
									
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
		
		
		//----------Start Fetch Teachers profile --------

		$scope.fetchTeachersProfile=function(){


			 methodAction="fetchTeachersProfile";
			 message={

					 		//"refNo" : sharedProperties.getRefNo(),								//'SA21OCT2015156', //sharedProperties.getRefNo() //SA28OCT201500001
							//"docID" : 'DOC001'													//'C://onboard//images//SA21OCT2015156',
																								//'25JAN2016173153751'
					};



			 $rootScope.loading=true;

			jsonData=connectHostFactory(methodAction,message);
			jsonData.returnData(function(value){

					//alert('Value Data= '+JSON.stringify(value));
					if(value != null){


						result=value.fetchTeachersProfile;

						//Android.openDialog("Teachers profile",JSON.stringify(result));

						//alert('docIDValue '+result.imageDetailsWrapper[0].docIDValue);

							if(value.success == true){

								$scope.teachersProfileWrapper=result.teachersProfileWrapper;
								//$scope.profileImage=true;
								//alert('$scope.teachersProfileWrapper= '+JSON.stringify($scope.teachersProfileWrapper));
								
								 //--pagination--
								
								 $scope.totalItems = result.teachersProfileWrapper.length;
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
								//messageFactory(appConstants.SYSTEM_NORESPONSE);
								$scope.profileImage=false;

							}

					}
					else{
						 messageFactory(appConstants.SYSTEM_ERROR);
					}
					$rootScope.loading=false;
			});

	}

//---------------End Fetch profile image---------	
		
		
		
	     //----------Start Fetch Teachers profile image--------

		$scope.fetchTeachersProfileImage=function(){


			 methodAction="fetchImageFileNames";
             message={

                    	"refNo" : '7777777777',
                        "imageStatus" : "ACTIVE"
                     };




			 $rootScope.loading=true;

			jsonData=connectHostImageFactory(methodAction,message,destination);
			jsonData.returnData(function(value){


					if(value != null){


						result=value.fetchImageFileNames;


							if(value.success == true){

								if(result.imageDetailsWrapper[0].recordFound==true){
									//$scope.wrapper=result.imageDetailsWrapper;

									//Android.openDialog("Alert",JSON.stringify(result.imageDetailsWrapper));

									for(var i=0; i<=result.imageDetailsWrapper.length-1; i++)
                                    {

										//$scope.imageFileNames[i]=result.imageDetailsWrapper[i].imageFileName;
										sharedProperties.setImageId(result.imageDetailsWrapper[i].imageId);
										$scope.fetchImages_M(i);
                                    }

									/*$scope.image=value.image;
									$scope.docName=result.imageDetailsWrapper[0].docIDValue;
									$scope.profileImage=true;*/

								}

							}
							else{
								//messageFactory(appConstants.SYSTEM_NORESPONSE);
								$scope.profileImage=false;

							}

					}
					else{
						 messageFactory(appConstants.SYSTEM_ERROR);
					}
					$rootScope.loading=false;
			});

	}

	//---------------End Fetch Teachers profile image---------



									//----------Start Fetch Images_M--------

       								 $scope.fetchImages_M=function(i){

															 //messageFactory("I Value "+i);
                                                   			 methodAction="fetchImageDetails";
                                                   			 message={

                                                   					 		"refNo" : '7777777777',
                                                            				"imageId" : sharedProperties.getImageId()
                                                   					};

                                                   			//$rootScope.loading=true;

                                                   			jsonData=connectHostImageFactory(methodAction,message,destination);
                                                   			jsonData.returnData(function(value){

                                                   					if(value != null){

                                                   					 //Android.openDialog("value ",JSON.stringify(value));

                                                   						result=value.fetchImageDetails;

                                                   							if(value.success == true){

                                                                                 $scope.imgArray[i] = value.image;

                                                   								//Android.storeImage(value.image);


                                              								}
                                                   							else{
                                                   								//messageFactory(appConstants.SYSTEM_NORESPONSE);
                                                   							}

                                                   					}

                                                   					//$rootScope.loading=false;
                                                   					else{
                                                   						// messageFactory(appConstants.SYSTEM_ERROR);
                                                   					}

                                                   			});

                                                   	}

                                                   	//---------------End Fetch Images_M---------

           							  
           					$scope.setRowData = function(staffUserID,staffRefNo,header,name,description,mobileNo,emailID,orderNumber)
           					{
           								  $scope.editableOption =true;
           								  
           								  $scope.wrapper.staffUserID= '';
           								  $scope.wrapper.staffRefNo= '';
           								  $scope.wrapper.header= '';
           								  $scope.wrapper.name= '';
           								  
           								  $scope.wrapper.description= '';
           								  $scope.wrapper.mobileNo= '';
           								  $scope.wrapper.emailID= '';
           								 $scope.wrapper.orderNumber= '';
           								           								  
           								 // alert('code '+ code + 'desc '+description +'filter ='+filter);
           								 
           								  $scope.wrapper.staffUserID= staffUserID;
           								  $scope.wrapper.staffRefNo=staffRefNo;
           								  $scope.wrapper.header= header;
           								  $scope.wrapper.name= name;
           								  
           								  $scope.wrapper.description= description;
           								  $scope.wrapper.mobileNo=mobileNo;
           								  $scope.wrapper.emailID= emailID;
           								  
           								  $scope.wrapper.orderNumber= orderNumber;
           								 
           					};
           							  
           							  

           				   $scope.clear = function(){
           								  
           								  $scope.editableOption = false;
           								  
           							      $scope.submitted = false;
           								    

           							      $scope.wrapper.staffUserID= '';
        								  $scope.wrapper.staffRefNo= '';
        								  $scope.wrapper.header= '';
        								  $scope.wrapper.name= '';
        								  
        								  $scope.wrapper.description= '';
        								  $scope.wrapper.mobileNo= '';
        								  $scope.wrapper.emailID= '';
        								  $scope.wrapper.orderNumber= '';
           								  
           							      $scope.form.staffUserID.$invalid=true;
           							      $scope.form.staffUserID.$dirty=false;
           							      $scope.form.staffRefNo.$invalid=true;
           							      $scope.form.staffRefNo.$dirty=false;
           							      $scope.form.header.$invalid=true;
           							      $scope.form.header.$dirty=false;
           							      $scope.form.name.$invalid=true;
           							      $scope.form.name.$dirty=false;
           							      $scope.form.description.$invalid=true;
           							      $scope.form.description.$dirty=false;
           							      $scope.form.mobileNo.$invalid=true;
        							      $scope.form.mobileNo.$dirty=false;
        							      $scope.form.emailID.$invalid=true;
        							      $scope.form.emailID.$dirty=false;
        							      $scope.form.orderNumber.$invalid=true;
        							      $scope.form.orderNumber.$dirty=false;
        							      
        							     
           								  
           					}
		  
		
			
			
			 
			
			  
		
		    
		    
    
			//--------START btnBack function-----------
			  $scope.btnBack=function(){
					$location.path('/dashBoard');
			   }
			//--------ends btnBack function----------- 
	}]);  
	
})();










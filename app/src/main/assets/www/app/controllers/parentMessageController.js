(function(){
    "use strict";
    
    var app = angular.module('schoolApp');
 
	app.controller('parentMessageController',['$scope', '$rootScope', 'connectHostFactory', '$location', 'sharedProperties', 'commonControls', 'alertsManager', '$mdDialog','messageFactory','appConstants', function($scope ,$rootScope, connectHostFactory, $location, sharedProperties, commonControls, alertsManager, $mdDialog, messageFactory, appConstants){
		
	
		var methodAction=null;
		var message=null;
		var jsonData=null; 
		var result=null;
		
		$scope.wrapper = [];
		$scope.messageWrapper= [];

		
	
		/*$scope.menuName= sharedProperties.getMenuName();*/
		
		/*$scope.menu= sharedProperties.getMenu();
		
		$scope.menuName= sharedProperties.getMenuName();
		$scope.refNo= sharedProperties.getRefNo();
		$scope.customerName=sharedProperties.getCustomerName();
		$scope.actionMode=sharedProperties.getActionMode();*/
		
		//$scope.academicYearIDValue= sharedProperties.getAcademicYearIDValue();
		//$scope.gradeIDValue= sharedProperties.getGradeIDValue();
		//$scope.sectionIDValue= sharedProperties.getSectionIDValue();
		
		
        //------------start loadData Function----------------
		
		$scope.loadData=function(){
			
			
			
			methodAction="fetchParentMessage";
			
			message={};
				 		
			$rootScope.loading=true;	 	
			
			jsonData=connectHostFactory(methodAction,message);
			
				jsonData.returnData(function(value){
					
					if(value != null){
						   
							result=value.fetchParentMessage;
							
							if(value.success == true){
								
										if(result.parentMessageWrapper[0].recordFound==true)
										{
												$scope.messageWrapper=result.parentMessageWrapper;
												
												//alert("Data"+JSON.stringify($scope.messageWrapper));
												
												//--pagination--
												
												 $scope.totalItems = result.parentMessageWrapper.length;
												
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
			

		
		 }   //------------------- ends loadData Function-----------------       
		
		
		
		 //--------------start saveData_M Function---Parent message from mobile--------------

		$scope.saveData_M=function(userGroup){


			//messageFactory(userGroup);

			 if ($scope.wrapper.message!=null) {

            	 	    methodAction="insertParentMessage";

						message={

									"academicYearID": sharedProperties.getAcademicYearID(),
					    		    "refNo" : sharedProperties.getRefNo(),
					    			"studentID" : sharedProperties.getStudentID(),
					    			"gradeID" : sharedProperties.getGradeID(),
					    			"sectionID" : sharedProperties.getSectionID(),
					    			"message" : $scope.wrapper.message,
					    			"userGroup": userGroup //'STAFF'
				    		};

				//Android.openDialog("save message",JSON.stringify(message));

				$scope.buttonDisabled=true;
				$rootScope.loading=true;

				jsonData=connectHostFactory(methodAction,message);
				jsonData.returnData(function(value){

					if(value != null){

									result=value.insertParentMessage;

									if(value.success == true){

										if(result.parentMessageWrapper[0].recordFound==true)
										{
													$scope.fetchParentMessage_M();
													//messageFactory(appConstants.RECORD_UPDATED);
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
					$scope.wrapper.message='';
					$rootScope.loading=false;
					$scope.buttonDisabled=false;
				});
			 }
			 else{
			    messageFactory("Please enter message");
			 }


		}  //------------ends saveData_M Function-------------
		
		
		//--------------start fetchParentMessage Function- for mobile----------------

		$scope.fetchParentMessage_M=function(){



            	methodAction="fetchParentMessage";

				message={

									"academicYearID": sharedProperties.getAcademicYearID(),
   					    		    "refNo" : sharedProperties.getRefNo(),
					    			"studentID" : sharedProperties.getStudentID(),
					    			"gradeID" : sharedProperties.getGradeID(),
                                    "sectionID" : sharedProperties.getSectionID()
				};

				//Android.openDialog("save message",JSON.stringify(message));


				$scope.buttonDisabled=true;
				$rootScope.loading=true;

				jsonData=connectHostFactory(methodAction,message);
				jsonData.returnData(function(value){

					//Android.openDialog("value",JSON.stringify(value));
					if(value != null){

									result=value.fetchParentMessage;

									if(value.success == true){

										if(result.parentMessageWrapper[0].recordFound==true)
										{
													$scope.messageWrapper=result.parentMessageWrapper;

													//Android.openDialog("$scope.wrapper",JSON.stringify($scope.messageWrapper));

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



		}  //------------ends fetchParentMessage Function-------------
		

		$scope.toggleExpandView = function($index) {
	        //$scope.isVisible = $scope.isVisible == 0 ? true : false;
				
					$scope.activePosition = $scope.activePosition == $index ? -1 : $index;
					
	    };
		
		//--------------start saveData Function--reply to parent from web---------------

		$scope.replyParentMessage=function(academicYearID,refNo,studentID,gradeID,sectionID,userGroup){


			//messageFactory(academicYearID+" "+refNo+" "+studentID+" "+gradeID+" "+sectionID+" "+userGroup);
			
			 if (document.getElementById("message").value != "") {
				 

            	 	    methodAction="insertParentMessage";

						message={

									"academicYearID": academicYearID,
					    		    "refNo" : refNo,
					    			"studentID" : studentID,
					    			"gradeID" : gradeID,
					    			"sectionID" : sectionID,
					    			"message" : $scope.messageWrapper.message,
					    			"userGroup": userGroup //'STAFF'
				    		};

						//alert("save message"+JSON.stringify(message));
		
						$scope.buttonDisabled=true;
						$rootScope.loading=true;
		
						jsonData=connectHostFactory(methodAction,message);
						jsonData.returnData(function(value){
		
							if(value != null){
		
											result=value.insertParentMessage;
		
											if(value.success == true){
		
												if(result.parentMessageWrapper[0].recordFound==true)
												{
															$scope.loadData();
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
							$scope.messageWrapper.message='';
							$rootScope.loading=false;
							$scope.buttonDisabled=false;
						});
					 }
					 else{
					    messageFactory("Please enter message ");
					 }


		}  //------------ends saveData Function-------------
 
			  
		 //--------START btnBack function-----------
		  $scope.btnBack=function(){
				$location.path('/dashBoard');
		   }
		//--------ends btnBack function----------- 

	}]);  
	
})();










(function(){
    "use strict";
    
    var app = angular.module('schoolApp');
 
	app.controller('studentProfileController',['$scope', '$rootScope', 'connectHostFactory', 'connectHostImageFactory', '$location', 'sharedProperties', 'commonControls', 'alertsManager', '$mdDialog','messageFactory','appConstants','firestorageFactory', function($scope ,$rootScope, connectHostFactory,connectHostImageFactory, $location, sharedProperties, commonControls, alertsManager, $mdDialog, messageFactory, appConstants,firestorageFactory){
		
	
		var methodAction=null;
		var message=null;
		var jsonData=null; 
		var result=null;
		
        $scope.pageAnimation="view-animate";
		
		$scope.wrapper=[];
	    $scope.pattern = /^[a-z]+[a-z0-9._]+@[a-z]+\.[a-z.]{2,5}$/;
		
		$scope.menuName= sharedProperties.getMenuName();
		$scope.refNo= sharedProperties.getRefNo();
		$scope.actionMode=sharedProperties.getActionMode();
		
		
		//$scope.studentName= sharedProperties.getStudentName();
		//$scope.surname= sharedProperties.getSurname();
		
		/*$scope.menu= sharedProperties.getMenu();
		
		$scope.menuName= sharedProperties.getMenuName();
		$scope.refNo= sharedProperties.getRefNo();
		$scope.customerName=sharedProperties.getCustomerName();
		*/
		
		//$rootScope.isTabBarDisable=true;
		
		
        //------------start loadData Function----------------
		
		$scope.loadData=function(){
			
			
			methodAction="fetchMultiPopoverData";
								
			message=[
			               
			             {
							 "tableName" : "MST_School",
						 	 "filter" : ""    		
					     },
					     {
							 "tableName" : "MST_Branch",
						 	 "filter" : ""    		
					     },
					     {
							 "tableName" : "MST_City",
						 	 "filter" : ""    		
					     },
					     {
							 "tableName" : "MST_State",
						 	 "filter" : ""    		
					     },
					     {
							 "tableName" : "MST_Gender",
						 	 "filter" : ""    		
					     },
					     {
							 "tableName" : "MST_Occupation",
						 	 "filter" : ""    		
					     },
					     {
							 "tableName" : "MST_Education",
						 	 "filter" : ""    		
					     },
					     {
							 "tableName" : "MST_AcademicYear",
						 	 "filter" : ""    		
					     },
					     {
							 "tableName" : "MST_District",
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
							 "tableName" : "MST_Religion",
						 	 "filter" : ""    		
					     },
					     {
							 "tableName" : "MST_Decision",
						 	 "filter" : ""    		
					     },
					     {
							 "tableName" : "MST_Caste",
						 	 "filter" : ""    		
					     },
					     {
							 "tableName" : "MST_BloodGroup",
						 	 "filter" : ""    		
					     },
					     {
							 "tableName" : "MST_Bank",
						 	 "filter" : ""    		
					     },
					     {
							 "tableName" : "MST_BusPickupPoint",
						 	 "filter" : ""    		
					     },
					     {
							 "tableName" : "MST_BusRoute",
						 	 "filter" : ""    		
					     },
					     {
							 "tableName" : "MST_CasteCategory",
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
				

					if(sharedProperties.getActionMode()=='UPDATE')
					{
				 
					 			$scope.loadStudentProfile();
					 			
								 //$scope.fetchProfileImage();
								 //$scope.downloadFileFirestorage();
							
	 		 		}	
		
		 }   //------------------- ends loadData Function-----------------       
		
		
			
		 $scope.setPermAdd = function(flag) {
			 
										    if(flag)
										    {
										    	
											    	 $scope.wrapper.permAddress1 =  $scope.wrapper.address1 ;  
										    		 $scope.wrapper.permAddress2 =  $scope.wrapper.address2 ;
										    		 $scope.wrapper.permAddress3 =  $scope.wrapper.address3;   
										    		 $scope.wrapper.permCityID   =  $scope.wrapper.cityID ; 
										    		 $scope.wrapper.permPINCode  =  $scope.wrapper.pinCode;
										    		 $scope.wrapper.permDistrictID= $scope.wrapper.districtID ;
										    	     $scope.wrapper.permStateID  =  $scope.wrapper.stateID;
										      
										    }
										    else {
										    	
										    	 $scope.wrapper.permAddress1 =  '' ;  
									    		 $scope.wrapper.permAddress2 =  '' ;
									    		 $scope.wrapper.permAddress3 =  '';   
									    		 $scope.wrapper.permCityID   =  '' ; 
									    		 $scope.wrapper.permPINCode  =  '';
									    		 $scope.wrapper.permDistrictID= '' ;
									    	     $scope.wrapper.permStateID  =  '';
									      
									           }
			  };
		
        //--------------start saveData Function-----------------
		
		$scope.saveData=function(){   
			

			 alertsManager.clearAlerts();
		
			 $scope.submitted = true;
			 
			 
			 
			 if ($scope.form.$valid) {
				 
				
				 		 if(sharedProperties.getActionMode()=='UPDATE'){
							 
				 			 	methodAction="updateStudentProfile";
						 
				 		 }
				 		 else {
				 			 
				 			 	methodAction="insertStudentProfile";
				 		 }
				 		
				 		
						message={
						
					    		
					    		"refNo": sharedProperties.getRefNo(),  
					    		"schoolID": $scope.wrapper.schoolID,  
					    		"branchID": $scope.wrapper.branchID,   
					    		"studentID": $scope.wrapper.studentID,   
					    		"studentName": $scope.wrapper.studentName,  
					    		"surname": $scope.wrapper.surname, 
					    		"address1": $scope.wrapper.address1, 
					    		"address2": $scope.wrapper.address2,   
					    		"address3": $scope.wrapper.address3,   
					    		"cityID": $scope.wrapper.cityID,   
					    		"pinCode": $scope.wrapper.pinCode,   
					    		"districtID": $scope.wrapper.districtID,   
					    		"stateID": $scope.wrapper.stateID,   
					    		"permAddress1": $scope.wrapper.permAddress1,   
					    		"permAddress2": $scope.wrapper.permAddress2,   
					    		"permAddress3": $scope.wrapper.permAddress3,   
					    		"permCityID": $scope.wrapper.permCityID,   
					    		"permPINCode": $scope.wrapper.permPINCode,   
					    		"permDistrictID": $scope.wrapper.permDistrictID,   
					    		"permStateID": $scope.wrapper.permStateID,   
					    		"gradeID": $scope.wrapper.gradeID,   
					    		"sectionID": $scope.wrapper.sectionID,   
					    		"academicYearID": $scope.wrapper.academicYearID,   
					    		"joinDate": commonControls.dateFormat($scope.wrapper.joinDate), 
					    		"studentPhotoID": $scope.wrapper.studentPhotoID,   
					    		"dob": commonControls.dateFormat($scope.wrapper.dob), 
					    		"gender": $scope.wrapper.gender,   
					    		"fatherName": $scope.wrapper.fatherName,   
					    		"fatherSurname": $scope.wrapper.fatherSurname,   
					    		"fatherOccupation": $scope.wrapper.fatherOccupation,   
					    		"fatherAge": $scope.wrapper.fatherAge,   
					    		"fatherEducation": $scope.wrapper.fatherEducation,   
					    		"motherName": $scope.wrapper.motherName,   
					    		"motherSurname": $scope.wrapper.motherSurname,   
					    		"motherOccupation": $scope.wrapper.motherOccupation,   
					    		"motherAge": $scope.wrapper.motherAge,   
					    		"motherEducation": $scope.wrapper.motherEducation,   
					    		"primaryMobile": $scope.wrapper.primaryMobile,   
					    		"secondaryMobile": $scope.wrapper.secondaryMobile,   
					    		"primaryEmail": $scope.wrapper.primaryEmail,   
					    		"secondaryEmail": $scope.wrapper.secondaryEmail,   
					    		"userid": $scope.wrapper.userid,   
					    		"status": 'ACTIVE',  //$scope.wrapper.status,   
					    		"imageID": $scope.wrapper.imageID,   
					    		"thumbnailID": $scope.wrapper.thumbnailID,   
					    		"classTeacher": $scope.wrapper.classTeacher,   
					    		"recordStatus" : sharedProperties.getRecordStatus(),
					    		"aadhaarNo":$scope.wrapper.aadhaarNo,
					    		"religion":$scope.wrapper.religion,
					    		"caste":$scope.wrapper.caste,
					    		"bloodGroup":$scope.wrapper.bloodGroup,
					    		"busRouteNo":$scope.wrapper.busRouteNo,
					    		"busPickupPoint":$scope.wrapper.busPickupPoint,
					    		"driverName":$scope.wrapper.driverName,
					    		"driverName2":$scope.wrapper.driverName2, 
					    		"driverMobileNo":$scope.wrapper.driverMobileNo,
					    		"driverMobileNo2":$scope.wrapper.driverMobileNo2,
					    		"studentEmail":$scope.wrapper.studentEmail,
					    		"physicallyChallenged":$scope.wrapper.physicallyChallenged,
					    		"identityMark1":$scope.wrapper.identityMark1,
					    		"identityMark2":$scope.wrapper.identityMark2,
					    		"dobInWords":$scope.wrapper.dobInWords,
					    		"bankAccountNo":$scope.wrapper.bankAccountNo,
					    		"bankName":$scope.wrapper.bankName,
					    		"rationCardNo":$scope.wrapper.rationCardNo, 
					    		"fatherAadhaarNo":$scope.wrapper.fatherAadhaarNo,
					    		"motherAadhaarNo":$scope.wrapper.motherAadhaarNo,
					    		"parentAnnualIncome":$scope.wrapper.parentAnnualIncome,
					    		"admissionNo":$scope.wrapper.admissionNo, 
					    		"emiratesID":$scope.wrapper.emiratesID,
					    		"visaNo":$scope.wrapper.visaNo,
					    		"uidNo":$scope.wrapper.uidNo,
					    		"passportNo":$scope.wrapper.passportNo,
					    		"passportExpiryDate": commonControls.dateFormat($scope.wrapper.passportExpiryDate), 
					    		"passportIssueDate": commonControls.dateFormat($scope.wrapper.passportIssueDate),
					    		"passportIssuePlace":$scope.wrapper.passportIssuePlace,
					    		"sameAddressFlag":$scope.wrapper.sameAddressFlag,
					    		"casteCategory":$scope.wrapper.casteCategory,
					    		"userid":$scope.wrapper.userid
					    		
					    		
					    		
					    		
					    			
				    		};
				
						
						//alert('message = '+JSON.stringify(message));
				$scope.buttonDisabled=true;
				$rootScope.loading=true; 
				
				jsonData=connectHostFactory(methodAction,message);
				jsonData.returnData(function(value){
					
					if(value != null){
						
									if(sharedProperties.getActionMode()=='UPDATE'){
										 
										result=value.updateStudentProfile;
					
									}
									else{
						 			 
							 			result=value.insertStudentProfile;
							 			
									}
					
						
									if(value.success == true){
										
										
										if( result.studentProfileWrapper[0].recordFound==true)
										{
											
											
													
													
													//sharedProperties.setRefNo(result.studentProfileWrapper[0].refNo);
													$scope.refNo= result.studentProfileWrapper[0].refNo;
													
													if(sharedProperties.getActionMode()=='UPDATE'){
														messageFactory(appConstants.RECORD_UPDATED);
													}
													else
													{
														
														messageFactory(result.studentProfileWrapper[0].studentName + " " + result.studentProfileWrapper[0].surname + " profile is created");
													}
													
													sharedProperties.setRefNo(result.studentProfileWrapper[0].refNo);
													
													sharedProperties.setActionMode('UPDATE');
													
													$scope.loadStudentProfile();
										 		
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
		
		//------TO ASSIGN DATA TO FIELDS----------
		$scope.loadStudentProfile=function(){
		
			
			methodAction="fetchStudentProfile";
			
			message={
					      "refNo" :sharedProperties.getRefNo()
				    };
				 		
			$rootScope.loading=true;	 	
			
			jsonData=connectHostFactory(methodAction,message);
			
				jsonData.returnData(function(value){
					
					if(value != null){
							
							result=value.fetchStudentProfile;
							
							if(value.success == true){
								
										if(result.studentProfileWrapper[0].recordFound==true)
										{
												$scope.wrapper=result.studentProfileWrapper[0];
												
												$scope.studentName= $scope.wrapper.studentName;
												$scope.surname= $scope.wrapper.surname;

												sharedProperties.setStudentID($scope.wrapper.studentID);

												$scope.downloadFileFirestorage();

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
		 
			
			

		}
		//----------end-----
		
     //----------Start Fetch profile image--------
		
		$scope.fetchProfileImage=function(){			
			  

			 methodAction="fetchImageDetails";			
			 message={
							
					 		"refNo" : sharedProperties.getRefNo(),								//'SA21OCT2015156', //sharedProperties.getRefNo() //SA28OCT201500001
							"studentID": sharedProperties.getStudentID(),											//'SA21OCT2015156_25JAN2016173153751.jpg',
							"docID" : 'DOC001'													//'C://onboard//images//SA21OCT2015156',
																								//'25JAN2016173153751'
					};  
			
			 
			 
			 $rootScope.loading=true;
			 
			jsonData=connectHostImageFactory(methodAction,message);
			jsonData.returnData(function(value){
			
					//alert('Value Data= '+JSON.stringify(value));
					if(value != null){
							
						
						result=value.fetchImageDetails;
						
						//alert(' fetchImageDetails result= '+JSON.stringify(result));
						
						//alert('docIDValue '+result.imageDetailsWrapper[0].docIDValue);
						
							if(value.success == true){
								
								$scope.image=value.image;
								$scope.docName=result.imageDetailsWrapper[0].docIDValue;
								$scope.profileImage=true;
								
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
		
		  $scope.datepickers = {
  	        	dob: false,
  	        	joinDate: false,
  	        	passportIssueDate:false,
  	        	passportExpiryDate:false
  	      }
		  
		  
		  $scope.open = function($event, which) {
		   
  	  			$event.preventDefault();
  	  			$event.stopPropagation();
  	  			$scope.datepickers[which]= true;
		  };
		  
		
			
			/*$scope.nextPage=function(){ 
					
			  		//$rootScope.selectedIndex = 1;
					//$location.path('/' + 'identification');
					
			}*/
			 
			function dateDiff(date1, date2) {
			    return new Date(Math.abs(date1.getTime() - date2.getTime()));
			}
			  
			/* Calculates the age */
		    $scope.getAge = function(dob) {
		    	//alert('dob '+dob);
		        var now = new Date();
		        var age = dateDiff(now, new Date(dob));
		        $scope.dobAge = age.getFullYear() - 1970;
		        
		        //alert('dobAge '+$scope.dobAge);
		    };
		    
    
			//--------START btnBack function-----------
			  $scope.btnBack=function(){
					$location.path('/queue');
			   }
			//--------ends btnBack function----------- 


		//-----------get image from firestorage-----
		$scope.downloadFileFirestorage=function(){

			//console.log ('inside download ' + sharedProperties.getStudentID());
			firestorageFactory.fileDownloadFirestorage(sharedProperties.getSchoolID() + '/images/student/'+ sharedProperties.getStudentID() +'/avatar/' + sharedProperties.getStudentID())
			.then(function(result)
			{

				//console.log('result ' + result);
				$scope.image = result;
				$scope.profileImage=true;

			});

		}
		//---------end of fetchimage storage

	}]);  
	
})();










(function(){
	
	 var app = angular.module('schoolApp');

//app.controller('imageController', ['$scope', 'Upload', '$timeout', function ($scope, Upload, $timeout) {
	
	app.controller('imageUploadController', ['$scope','$rootScope', 'connectHostFactory', 'connectHostImageFactory', '$location', 'sharedProperties', 'commonControls','$mdDialog','messageFactory','appConstants', function ($scope, $rootScope, connectHostFactory, connectHostImageFactory, $location, sharedProperties, commonControls, $mdDialog, messageFactory,appConstants) {
		
		
		var methodAction=null;
		var message=null;
		var jsonData=null;
		var result=null;
		var destination=null;
		
		//$scope.menu= sharedProperties.getMenu();
		$scope.menuName= sharedProperties.getMenuName();
		$scope.refNo= sharedProperties.getRefNo();
		$scope.studentName=sharedProperties.getStudentName();
		$scope.surname=sharedProperties.getSurname();
		
		
		//---------------selected image to display before upload---------------------

		    $scope.imageUpload = function(element){
		        var reader = new FileReader();
		        reader.onload = $scope.imageIsLoaded;
		        reader.readAsDataURL(element.files[0]);
		    }

		    $scope.imageIsLoaded = function(e){
		    	 
		        $scope.$apply(function() {
		        	 $scope.selectedContainer = [];
		            $scope.selectedContainer.push(e.target.result);
		        });
		    }
		//--------------------------------------    
		    
		//------------start loadData Function----------------
		$scope.loadData=function(){                                           
		
			
				    methodAction="fetchMultiPopoverData";
				    
					//var accountType=sharedProperties.getRefNo().substring(0,2);	
					
				    message=[{
						 "tableName" : "MST_DocChecklistMaster",
					     "filter" :    	''	
					    },
				
					];
						
				    $rootScope.loading=true;
					jsonData=connectHostFactory(methodAction,message);
						jsonData.returnData(function(value){
							
							
							//alert('Popover Data= '+JSON.stringify(value));
							if(value != null){
								
								result=value.fetchMultiPopoverData;
								
								if(value.success == true){
									
									$scope.popoverWrapper=result.popoverWrapper;
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
				
						
		
		 }    //------------ends loadData Function----------------    
		
		
		
		//------------start uploadFile Function----------------
		$scope.uploadFile = function(){		
			
			
			$scope.submitted = true;
			 
			 if ($scope.form.$valid) {
				 
				
				 
				 
				 if(document.getElementById("file").value != "") {
					   // you have a file
	 
					 var filesrc=$scope.myFile.size;
					 
					 //alert('image filesrc  '+filesrc); 
					
					if(filesrc < 30000) // filesize validation
					{
					  
					  $scope.imageSrc = $scope.myFile;
					 
				
					 
					  // ---------- Upload Image ----------
					 
							// alert('show approver confirm dialog');
							    // Appending dialog to document.body to cover sidenav in
								// docs app
							   var confirm = $mdDialog.confirm()
							          .title('Confirm')
							          .content('Would you want to upload image ?')
							          .ok('Ok')
							          .cancel('Cancel');
							    	  
							    $mdDialog.show(confirm).then(function() {
							     // $scope.status = 'confirm Result ok';
							    	
									    	 var file = $scope.myFile;
									    	 
									   									    	 
									    	 //alert('image file c '+JSON.stringify(file));
											   
										        destination=sharedProperties.getRefNo();  //"C://school//images//"
										        
										       
										        methodAction="uploadImageDetails";	
								
										        var monthNames = [
										          "JAN", "FEB", "MAR",
										          "APR", "MAY", "JUN", "JUL",
										          "AUG", "SEP", "OCT",
										          "NOV", "DEC"
										        ];
								
										        var date = new Date();
										        //var day = date.getDate();
										        var monthIndex = date.getMonth();
										        //var year = date.getFullYear();
										        //var hh=date.getHours();
										        //var mm=date.getMinutes();
										        //var ss=date.getSeconds();
										        //var ms=date.getMilliseconds();
								
										       
										       // alert('date Format2='+day+monthNames[monthIndex]+year+hh+mm+ss+ms);
										        //var imageId=day+monthNames[monthIndex]+year+hh+mm+ss+ms;
										        
										        var imageId=date.getDate()+monthNames[monthIndex]+date.getFullYear()+date.getHours()+date.getMinutes()+date.getSeconds()+date.getMilliseconds();
										        
										       // alert('imageId='+imageId);
										    
										        
												message={
																"docID": $scope.wrapper.docID,                  //'DOC004',
														 		"refNo" : sharedProperties.getRefNo(), 					//sharedProperties.getRefNo() //SA28OCT201500001
														 		"imageStatus":'ACTIVE',
														 		"studentID": sharedProperties.getStudentID(), 								//'2343245678',
																"imageId": 	imageId								//'19DEC2015180907002'
																
														};  
												//alert('message= '+JSON.stringify(message));
												
												$scope.buttonDisabled=true;
												$rootScope.loading=true;
									 
												jsonData=connectHostImageFactory(methodAction,message,destination,file);
									
												
									
												jsonData.returnData(function(value){
													
													 
													 //document.writeln('Image Value Data= '+JSON.stringify(value))
											
													//alert('Image Value Data= '+JSON.stringify(value));
											
													 
													if(value != null){
														result=value.uploadImageDetails;
														//alert('success= '+ value.success);
												
														if(value.success == true){
															
															
																if((result.imageDetailsWrapper[0].imageUploadStatus)==true)
																{
																	//--------dialog----------------
																	/*var alert = $mdDialog.alert()
																	.title('comfirm')
															        .content('Image uploaded successfuly')
															        .ok('Ok');
																		$mdDialog
															          .show( alert );*/

																	messageFactory('Image uploaded successfuly');
																			
																	//--------Dialog end----------------
																}
																else
																{
																	
																	//--------dialog----------------
																	/*var alert = $mdDialog.alert()
																	.title('confirm')
															        .content('Image upload failed,Try again')
															        .ok('Ok');
																		$mdDialog
															          .show( alert );*/
																	
																	messageFactory('Image upload failed,Try again');
															         
																			
																	//--------Dialog end--------------
																	
																}
															
													
																//$scope.wrapper=result.imageDetailsWrapper[0];
													 
																//alert('imageFileName '+result.imageDetailsWrapper[0].imageFileName);
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
													
													 $scope.buttonDisabled=false;
												});
									      	
									      			
									      
									    }, function() {
									    	
									      //$scope.status = 'confirm Result cancel.';
									      
									     
									    });
					
				
							    //--------end Upload Image---------
						}
					    else
					    {
					    	messageFactory('file size  should lessthan 30kb');
					    }
						   
							
				 	}//--end checking for file uploded or not
				 	else{
				 		
				 		messageFactory('Choose file');
				 		//--------dialog----------------
						/*var alert = $mdDialog.alert()
						.title('alert')
				        .content('Choose File')
				        .ok('Ok');
							$mdDialog
				          .show( alert );
				         */
								
						//--------Dialog end----------------
				 		//alert('Choose File');
				 	}
							
			 }        
		        
	    };  //------------ends uploadFile Function----------------
	    
	    
	  //---------- back button---------
	   $scope.btnBack=function(){

		   sharedProperties.setMenuName('Image Upload');
			$location.path('/queue');
	   }
		
		//----------end -back button----------
	
    /*$scope.upload = function (dataUrl) {
        Upload.upload({
            url: 'https://angular-file-upload-cors-srv.appspot.com/upload',
            data: {
                file: Upload.dataUrltoBlob(dataUrl)
            },
        }).then(function (response) {
            $timeout(function () {
                $scope.result = response.data;
            });
        }, function (response) {
            if (response.status > 0) $scope.errorMsg = response.status 
                + ': ' + response.data;
        }, function (evt) {
            $scope.progress = parseInt(100.0 * evt.loaded / evt.total);
        });
    }
*/

}]);

})();


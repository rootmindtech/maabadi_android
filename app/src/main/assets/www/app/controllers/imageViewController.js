(function(){
    "use strict";
    
    
    var app = angular.module('schoolApp');
    
    
	app.controller('imageViewController',['$scope','$rootScope', 'connectHostImageFactory', '$location', 'sharedProperties','$mdDialog','appConstants', function($scope, $rootScope, connectHostImageFactory, $location, sharedProperties, $mdDialog, appConstants){
		
		
		var methodAction=null;
		var message=null;
		var jsonData=null;
		var result=null;
		var destination=null;
		
		$scope.menu= sharedProperties.getMenu();
		$scope.menuName= sharedProperties.getMenuName();
		$scope.refNo= sharedProperties.getRefNo();
		$scope.studentName=sharedProperties.getStudentName();
		$scope.surname=sharedProperties.getSurname();
		

		$scope.loadData=function(){			//--Start Load Data---------
				  
					//destination="";
					
					 destination=sharedProperties.getRefNo();			//"C://onboard//images//"		//"PL12NOV20150038";								
					 methodAction="fetchImageFileNames";			
					 message={
									
							 		"refNo" : sharedProperties.getRefNo(),											//'PL12NOV20150038', //sharedProperties.getRefNo() //SA28OCT201500001
									"imageStatus" : "ACTIVE"
							};  
					 //alert('message= '+JSON.stringify(message));
					 
					 $rootScope.loading=true;
					 
					jsonData=connectHostImageFactory(methodAction,message,destination);
					jsonData.returnData(function(value){
						
							
						$rootScope.loading=false;
							
							//alert('Value Data= '+JSON.stringify(value));
							if(value !=null){
										
								result=value.fetchImageFileNames;
								
								
								if(value.success == true){
								
									//$scope.wrapper=result.imageDetailsWrapper[0];
								
									//alert('imageDetailsWrapper json='+JSON.stringify(result.imageDetailsWrapper));
									
									if(result.imageDetailsWrapper[0].recordFound==true){
										
										$scope.wrapper=result.imageDetailsWrapper;
										
										
										
										//alert('file Name '+result.imageDetailsWrapper[0].imageFileName);
										
										for(var i=0; i<=result.imageDetailsWrapper.length-1; i++)
										{
											
											$scope.imageFileNames[i]=result.imageDetailsWrapper[i].imageFileName;
											
										}
										
										// alert('imageFileNames '+imageFileNames);
										 
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
							
							//$rootScope.loading=false;
					});
				
			}		//--End Load Data---------
		
		
		
//----------Start Fetch Images--------
		
		$scope.fetchImages=function(){			
			  
			//destination="";
			
			
			 methodAction="fetchImageDetails";			
			 message={
							
					 		"refNo" : sharedProperties.getRefNo(),								//'SA21OCT2015156', //sharedProperties.getRefNo() //SA28OCT201500001
							"imageFileName": sharedProperties.getImageFileName(),											//'SA21OCT2015156_25JAN2016173153751.jpg',
							"imageFileFolder":sharedProperties.getImageFileFolder(),											//'C://onboard//images//SA21OCT2015156',
							"imageId" : sharedProperties.getImageId(),												//'25JAN2016173153751'
					};  
			 //alert('message= '+JSON.stringify(message));
			 
			 
			 $rootScope.loading=true;
			 
			jsonData=connectHostImageFactory(methodAction,message,destination);
			jsonData.returnData(function(value){
				
				 	
				 	
					
					//alert('Value Data= '+JSON.stringify(value));
					if(value != null){
							
						
						result=value.fetchImageDetails;
						
						//alert(' fetchImageDetails result= '+JSON.stringify(result));
						
						//alert('docIDValue '+result.imageDetailsWrapper[0].docIDValue);
						
							if(value.success == true){
								
								$scope.image=value.image;
								$scope.docName=result.imageDetailsWrapper[0].docIDValue;
								
								 $scope.data = {
										  
										  "image" : $scope.image,
										  "docName" :$scope.docName
										 
										};
								
								
								
								/*$mdDialog.show({
									 controller: imageViewController,
									 //templateUrl : 'views/displayimage.html',
									 template:'<md-card><md-card-content><div ><img ng-src="data:image/JPEG;base64,{{image}}" width="600" height="400"></div></md-card-content></md-card>',
									 parent: angular.element(document.body),
									 clickOutsideToClose:true,
					   	    
					   		  	});*/
								
								
								$mdDialog.show({
									 //controller: DialogController,
									 templateUrl : 'views/displayimage.html',
									 parent: angular.element(document.body), 
									 locals:{data: $scope.data,}, 
									 controller: 'displayImageController',
									 clickOutsideToClose:true,
					   	    
					   		  	});
					   		  	
					   		  	
		   	    
								
							
								//$scope.wrapper=result.imageDetailsWrapper[0];
							
							
							
							
								//alert('imageDetailsWrapper jsono='+JSON.stringify(result.imageDetailsWrapper));
							
								//$scope.wrapper=result.imageDetailsWrapper;
							
							
							
								/*alert('file Name '+result.imageDetailsWrapper[0].imageFileName);
								
								for(var i=0; i<result.imageDetailsWrapper.length; i++)
								{
									
									$scope.imageFileNames[i]=result.imageDetailsWrapper[i].imageFileName;
									
								}
								
								 alert('imageFileNames '+imageFileNames);*/
								 

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
		
//---------------End Fetch Images---------
		
		
		

		
		
		
		
		//----------Start Load image details---------
		$scope.loadImageDetails=function(imageFileName,imageFileFolder,imageId){

			sharedProperties.setImageFileName(imageFileName);
			sharedProperties.setImageFileFolder(imageFileFolder);
			sharedProperties.setImageId(imageId);

	        
	    }
		
		//-----------End Load image details---------
		
		
		//---------- back button---------
		$scope.btnBack=function(){
			
			sharedProperties.setMenuName('Image View');
			$location.path('/queue');

	        
	    }
		
		//----------end -back button----------
		
	}]);
	
	
	//--------------displayimage controller-----------
	
	app.controller('displayImageController',['$scope','data','$mdDialog', function($scope,data,$mdDialog) {
		   	 
		$scope.wrapper=data;
		
			$scope.cancel = function() {
			    $mdDialog.cancel();
			  };
			  
	}]);
	//--------end displayimage controller-------------
   
})();
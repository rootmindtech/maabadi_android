(function(){
    "use strict";
    
    
    var app = angular.module('schoolApp');
    
    
	app.controller('graphController',['$scope', '$rootScope', 'connectHostFactory', '$location', 'sharedProperties','$mdDialog','messageFactory','appConstants', function($scope ,$rootScope, connectHostFactory, $location, sharedProperties, $mdDialog, messageFactory, appConstants){
		
		var methodAction=null;
		var message=null;
		var jsonData=null;
		var result=null;
		
		$scope.wrapper = [];
		
		$scope.trnwrapper = [];
		
		//------------start loadData Function----------------
		
		$scope.loadData=function(){
							
			methodAction="fetchAccounts";
			
			message={
					  "cifNumber" : sharedProperties.getCIFNumber(),
					  "accountType": 'CASA'
	    		    };

			$scope.buttonDisabled=true;
			$rootScope.loading=true;
			
			jsonData=connectHostFactory(methodAction,message);
			 jsonData.returnData(function(value){
				 
				
					// alert('Value Data= '+JSON.stringify(value));
					
					if(value != null){
						
						result=value.fetchAccounts;
								
						if(value.success == true){
							
							if(result.recordFound==true)
							{
							
								for(var i=0; i<=result.accountsWrapper.length-1; i++)
								{
									$scope.wrapper[i]=result.accountsWrapper[i];
								}
								
								sharedProperties.setAccountPortfolio(result);
							}
							else
							{
								//messageFactory('Record not found');
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
				
		} //------------------- ends loadData Function-----------------   
		
		
		//---------------------start fetch Account transaction----------------
	 
		$scope.fetchAccountTrn=function(){
			
			methodAction="fetchAccountTrn";
			message={
					  "cifNumber" : sharedProperties.getCIFNumber(),
					  "accountNumber": sharedProperties.getAccountNumber()
	    		    };
			
			$scope.buttonDisabled=true;
			$rootScope.loading=true;
			
			jsonData=connectHostFactory(methodAction,message);
			 jsonData.returnData(function(value){
				 
				
					// alert('Value acc trn Data= '+JSON.stringify(value));
			
				 	if(value != null){
				 			
				 		result=value.fetchAccountTrn;
						
						var resultAccount=value.fetchAccounts;
						
						if(value.success == true){
							
								if(result.recordFound==true)
								{
									
									for(var i=0; i<=result.accountTrnWrapper.length-1; i++)
									{
										$scope.trnwrapper[i]=result.accountTrnWrapper[i];
									}
										$scope.accountwrapper=resultAccount.accountsWrapper[0];
								}
								else
								{
									//messageFactory('Record not found');
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
				
	 }  //----------------------close fetch account trn function-------------------------
		
	
	$scope.loadAccountData=function(cifNumber,accountNumber){
 
			sharedProperties.setCIFNumber(cifNumber);
			sharedProperties.setAccountNumber(accountNumber);
			$location.path('/' + 'accountTransaction');
	}
	
	//---------- back button---------
	$scope.btnBack=function(){
		$location.path('/accountPortfolio');
    }
	
	$scope.btnPortfolio=function(){
		$location.path('/portfolio');
    }
	
	//----------end -back button----------
	
	}]);
   
})();
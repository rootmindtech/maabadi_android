(function(){
    "use strict";
    
    var app = angular.module('schoolApp');
    
    app.factory('messageFactory',['$mdDialog', function($mdDialog){
    	
    	return function(message){


	 			/*if(mobileDetect()==false)
	 			{*/
	 				var confirm=$mdDialog.show(

                    					         $mdDialog.alert()
                    					        .clickOutsideToClose(true)
                    					        .content(message)
                    					        .ariaLabel('Alert Dialog')
                    					        .ok('Ok')

                    				    );

                    		 		return confirm;

	 			/*}
	 			else{

	 				return Android.showToast(message);


	 			}
*/

	      
	    };



		/*return function(message){
			
				
				
			};	*/
			
			
			
			
	}]); //factory
    

})(); //function close
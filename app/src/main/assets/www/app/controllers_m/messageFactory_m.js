(function(){
    "use strict";
    
    var app = angular.module('schoolApp');
    
    app.factory('messageFactory',['$mdToast', function($mdToast){
    	
    	return function(message){


			// var last = {
			// 	bottom: false,
			// 	top: true,
			// 	left: false,
			// 	right: true
			//   };
		  
			// $scope.toastPosition = angular.extend({},last);
	
			// $scope.getToastPosition = function() {
			// 	sanitizePosition();
			
			// 	return Object.keys($scope.toastPosition)
			// 	  .filter(function(pos) { return $scope.toastPosition[pos]; })
			// 	  .join(' ');
			//   };

					 //return Android.showToast(message);
					  //return alert(message);
					  
					  //var pinTo = $scope.getToastPosition();

				$mdToast.show(
				$mdToast.simple()
					.textContent(message)
					//.position(pinTo )
					.hideDelay(3000)
				);


		};
		
		
		
		// function sanitizePosition() {
		// 	var current = $scope.toastPosition;
		
		// 	if ( current.bottom && last.top ) current.top = false;
		// 	if ( current.top && last.bottom ) current.bottom = false;
		// 	if ( current.right && last.left ) current.left = false;
		// 	if ( current.left && last.right ) current.right = false;
		
		// 	last = angular.extend({},current);
		// }

	}]); //factory
    

})(); //function close
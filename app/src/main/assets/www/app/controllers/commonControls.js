(function(){
    "use strict";
    
    var app = angular.module('schoolApp');
       
	app.factory('commonControls',['$filter', function ($filter) {
        
		
        return {

        	dateFormat: function(inputDate){
        		return $filter('date')(inputDate,'dd/MM/yyyy');
        	},
        	
        	dateFormatYYYYMMDD: function(inputDate){
        		return $filter('date')(inputDate,'yyyy-MM-dd');
        	},
        	dateFormatMMM: function(inputDate){
        		return $filter('date')(inputDate,'dd/MMM/yyyy');
        	},
        
        	carYear: function(inputDate){
        		return $filter('date')(inputDate,'yyyy');
        	}
        	
        	
       
        }
    }]); //factory
	

	
})(); //function
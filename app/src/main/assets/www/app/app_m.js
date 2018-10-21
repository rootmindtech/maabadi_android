(function(){
    "use strict";

var app = angular.module('schoolApp', ['ngRoute','ngMaterial', 'ngAnimate' ,'ngMdIcons', 'ui.bootstrap','ngSanitize','xeditable','angular.filter']);

//configure our routes  ,'angularjs-crypto'
app.config([ '$routeProvider', function($routeProvider) {

	$routeProvider
	.when('/', {
		templateUrl : 'views_m/login_m.html',
		controller : 'loginController_m'
	})
	.when('/login', {
		templateUrl : 'views_m/login_m.html',
		controller : 'loginController_m'
	})
	.when('/dashBoard', {
		templateUrl : 'views_m/dashboard_m.html',
		controller : 'appController_m'
	})
	.when('/studentProfile', {
		templateUrl : 'views_m/studentprofile_m.html',
		controller : 'studentProfileController'
	})
	.when('/studentAcademics', {
		templateUrl : 'views_m/scholasticarea_m.html', //'views_m/studentacademics_m.html',
		controller : 'studentAcademicsController'
	})
	.when('/studentDiary', {
		templateUrl : 'views_m/studentdiary_m.html',
		controller : 'studentDiaryController'
	})
	.when('/reports', {
		templateUrl : 'views_m/reports_m.html',
		controller : 'studentMessageController'
	})
	.when('/studentSubjects', {
		templateUrl : 'views_m/studentsubjects_m.html',
		controller : 'studentSubjectsController'
	})
	.when('/schoolMessage', {
		templateUrl : 'views_m/schoolmessage_m.html',
		controller : 'schoolMessageController'
	})
	.when('/studentSubjects', {
    	templateUrl : 'views_m/studentsubjects_m.html',
    	controller : 'gradeSubjectsController'
    })
    .when('/studentAttendance', {
        templateUrl : 'views_m/studentattendance_m.html',
        controller : 'studentsAttendanceController'
     })

	.when('/examCalendar', {
		templateUrl : 'views_m/examcalendar_m.html',
		controller : 'examCalendarController'
	})
	.when('/changePassword', {
         templateUrl : 'views_m/loginprofile_m.html',
         controller : 'loginProfileController'
    })
    .when('/teachersProfile', {
             templateUrl : 'views_m/teachersprofile_m.html',
             controller : 'teachersProfileController'
     })
     .when('/parentMessage', {
                  templateUrl : 'views_m/parentmessage_m.html',
                  controller : 'parentMessageController'
     })
     .when('/switch', {
     		templateUrl : 'views_m/studentselection_m.html',
     		controller : 'appController_m'
     })


	.otherwise({redirectTo : '/'});
	
} ]);




app.run(function($rootScope) {

    $rootScope.isUserLogged=false;

	$rootScope.loading = false;
	$rootScope.userid = '';
    $rootScope.deviceToken='';
	$rootScope.sessionid='';
	$rootScope.isBackButton=false;
	$rootScope.userGroup='';
	$rootScope.slides=[];
	$rootScope.defaultImageView=true;
	$rootScope.usersWrapper=[];
	//$rootScope.userGroupValue=false;

	$rootScope.latitude='';
	$rootScope.longitude='';
	$rootScope.geolocation='';

	
    
});

app.run(function($rootScope, $location, $templateCache) {
    $rootScope.$on( "$routeChangeStart", function(event, next, current) {
    	
      if (typeof(current) !== 'undefined'){
            $templateCache.remove(current.templateUrl);
       }
    	
      if ($rootScope.isUserLogged == false) {
        // no logged user, redirect to /login
        if ( next.templateUrl === "views_m/login_m.html") {
        	//alert('isUserLogged false login if');
        } else {
        	//alert('isUserLogged false login else');
          $location.path("/login");
        }
      }
    });
  });

//--table data edit ---
app.run(function(editableOptions) {
	  editableOptions.theme = 'bs3';
	});

app.config( function( $mdIconProvider ){
    $mdIconProvider.iconSet("avatar", 'icons/avatar-icons.svg', 128);
  });

/*-----To avoid index.html animation---*/
app.run(function ($rootScope, $location) {
  $rootScope.$on("$routeChangeStart", function (event, next, current) {
    if (!$location.path().match(/^\/?$/) && !$rootScope.mainVisitedOnce) {
      $rootScope.mainVisitedOnce = true;
    }
  });
});

/*------*/

 


})();
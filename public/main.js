var app = angular.module("timesheet", ['ngCookies', 'ui.bootstrap']);

app.config(function ($routeProvider) {

    //lets configure routes
    $routeProvider
        .when('/', {
            controller: 'HomeController',
            templateUrl: 'views/home.html'
        })
        .when('/login', {
            controller: 'LoginController',
            templateUrl: 'views/login.html'
        })
        .when('/logout', {
            controller: 'LogoutController',
            templateUrl: 'views/login.html'
        })
        .when('/project', {
            controller: "ProjectController",
            templateUrl: "views/project/home.html"
        })
        .otherwise({
            controller: 'HomeController',
            templateUrl: 'views/home.html'
        });
});

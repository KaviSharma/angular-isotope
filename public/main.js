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
        .when('/todo', {
            controller: "TodoController",
            templateUrl: "views/todo/home.html"
        })
        .otherwise({
            controller: 'ProjectController',
            templateUrl: 'views/todo/index.html'
        });
});

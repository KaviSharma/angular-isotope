app = app || angular.module("timesheet");

app.controller('HomeController', function ($scope) {

});

app.controller('LoginController', function ($scope, $location, $cookies, LoginService) {
    $scope.model = {};
    $scope.model.userName = 'kavi';

    $scope.login = function () {
        window.scope = $scope;
        var res = LoginService.login($scope.model);
        if (res) {
            $cookies.loggedInUser = $scope.model.userName;
            $cookies.isAutenticated = true;

            $location.path("#/home?login=1");
        }
        else {
            $scope.message = "Invalid user name or password.";
        }
    };
});

app.controller('LogoutController', function ($scope, $cookies, $location, LoginService) {
    LoginService.logout();
    $location.path("/login");
});

app.controller('IndexController', function ($scope, $cookies, LoginService) {
    $scope.loggedInUser = $cookies.loggedInUser;
});

app.controller("TodoController", function ($scope, $log, TaskService, CategoryService) {
    window.scope = $scope;
    var _tasks = $scope.tasks = TaskService.projects();
    $scope.noOfTask = _tasks.length;
    $scope.model = null;
    $scope.sortBy = 'name';
    $scope.sortOrder = true;
    $scope.categories = CategoryService.categories();
    $scope.submitButtonText = null;
    $scope.filterBy = '';
    $scope.items = _tasks;

    $scope.$watch("tasks", function (oldval, newval) {
        $scope.noOfTask = _tasks.length;
    }, true);

    $scope.$watch("categories", function (oldval, newval) {
    }, true);

    $scope.deleteTask = function (project) {
        _tasks.splice(_tasks.indexOf(project), 1);
    }

    $scope.$watch('new', function (newval, oldval) {

    });

    $scope.$watch('model', function (oldval, newval) {
        if ($scope.model == null || $scope.model.id == null)
            $scope.submitButtonText = 'Add';
        else
            $scope.submitButtonText = 'Update';
    });

    $scope.createOrUpdate = function (project) {
        if (project.id == null) {
            var id = _.max(_tasks,function (p) {
                return p.id;
            }).id || 0;
            project.id = id + 1;
            project.categoryId = $scope.selectedCategory.id;
            _tasks.push(project);
            $scope.model = null;
        }
        $scope.model = null;
        $scope.selectedCategory = null;
    }

    $scope.edit = function (project) {
        $scope.model = project;
        $scope.selectedCategory = _.findWhere($scope.categories, {id: project.categoryId});
    }

    $scope.cancel = function () {
        $scope.model = null
        $scope.selectedCategory = null;
    }

});
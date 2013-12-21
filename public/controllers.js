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
            window.location = "#todo"
//            $location.hash("todo");
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

app.controller("TodoController", function ($scope, $log, TaskFactory, CategoryService) {
    window.scope = $scope;
    var _tasks = $scope.tasks = [];
    $scope.noOfTask = _tasks.length;
    $scope.model = null;
    $scope.sortBy = 'name';
    $scope.sortOrder = true;
    $scope.categories = CategoryService.categories();
    $scope.submitButtonText = null;
    $scope.filterBy = '';
    $scope.items = _tasks;

    function loadTasks() {
        TaskFactory.tasks().then(function (data) {
            _tasks = $scope.tasks = data;
        }, function (e) {
            alert("Error while fetching task.");
        });
    }

    $scope.$watch("tasks", function (oldval, newval) {
        $scope.noOfTask = _tasks.length;
    }, true);

    $scope.$watch("categories", function (oldval, newval) {
    }, true);

    $scope.deleteTask = function (task) {
        TaskFactory.delete(task).then(function (data) {
            _tasks.splice(_tasks.indexOf(task), 1);
        }, function (error) {
            alert("Error while deleting task");
        });
    }

    $scope.$watch('new', function (newval, oldval) {

    });

    $scope.$watch('model', function (oldval, newval) {
        if ($scope.model == null || !($scope.model._id))
            $scope.submitButtonText = 'Add';
        else
            $scope.submitButtonText = 'Update';
    });

    $scope.createOrUpdate = function (task) {
        console.log(task._id);
        var isNew = task._id ? false : true;
        task.categoryId = $scope.selectedCategory.id;
        TaskFactory.save(task).then(function (data) {
            if (isNew)
                _tasks.push(task);
            $scope.model = null;
            $scope.selectedCategory = null;

        }, function () {
            alert("Error while deleting task.");
        });
    }

    $scope.edit = function (task) {
        $scope.model = task;
        $scope.selectedCategory = _.findWhere($scope.categories, {id: task.categoryId});
    }

    $scope.cancel = function () {
        $scope.model = null
        $scope.selectedCategory = null;
    }

    loadTasks();
});
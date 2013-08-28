app = app || angular.module("timesheet");
var tasks = [];
var categories = [];
app.factory('LoginService', function ($http, $cookies) {
    return {
        login: function (model) {
            if (model.userName === "kavi" && model.password === "kavi") {
                return true;
            }
            else {
                return false;
            }
        },
        logout: function () {
            $cookies.isAutenticated = false;
            $cookies.loggedInUser = null;
            window.c = $cookies;
        }
    }
});

app.factory("TaskService", function () {
    return{
        projects: function () {
            if (tasks.length == 0) {
                tasks.push({id: 1, name: "Update frontend template.", categoryId: 2});
                tasks.push({id: 2, name: "Perform unit testing.", categoryId: 3});
                tasks.push({id: 3, name: "Buy some food.", categoryId: 1});
                tasks.push({id: 4, name: "Go to temple.", categoryId: 1});
                tasks.push({id: 2, name: "Learn about Angular.", categoryId: 2});
                tasks.push({id: 2, name: "Management meetings.", categoryId: 5});
            }
            return tasks;
        },
        add: function (project) {
            tasks.push(project);
        },
        remove: function (id) {
            var project = _.findWhere(tasks, {id: id});
            if (project != null) {
                delete project;
            }
        },
        update: function () {

        }
    }
});

app.factory("CategoryService", function () {
    return{
        categories: function () {
            if (categories.length == 0) {
                categories.push({id: 1, name: 'Personal'});
                categories.push({id: 2, name: 'Development'});
                categories.push({id: 3, name: 'Testing'});
                categories.push({id: 4, name: 'Overhead'});
                categories.push({id: 5, name: 'Frustrating'});
            }
            return categories;
        }
    }
});
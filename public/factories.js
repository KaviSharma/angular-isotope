app = app || angular.module("timesheet");

app.factory('TaskFactory', function ($http, $q) {
    return {
        tasks: function () {
            var deferred = $q.defer();
            $http.get('/api/tasks/')
                .success(function (data, status, headers, config) {
                    deferred.resolve(data, status, headers, config);
                })
                .error(function () {
                    deferred.reject("An error occured while fetching tasks");
                });
            return deferred.promise;
        },
        save: function (task) {
            console.log(task);
            var deferred = $q.defer();
            $http({url: '/api/tasks/save', data: task, method: 'POST', headers: {'Content-Type': 'application/json'}})
                .success(function (data, status, headers, config) {
                    deferred.resolve(data, status, headers, config);
                })
                .error(function () {
                    deferred.reject("An error occured while saving task");
                });
            return deferred.promise;
        },
        delete: function (task) {
            var deferred = $q.defer();
            $http({url: '/api/tasks/delete', data: task, method: 'POST', headers: {'Content-Type': 'application/json'}})
                .success(function (data, status, headers, config) {
                    deferred.resolve(data);
                })
                .error(function (data, status, headers, config) {
                    deferred.reject("An error occured while deleting task");
                });
            return deferred.promise;
        }
    }
});

app.factory('PinFactory', function ($http, $q) {
    return {
        pins: function () {
            var deferred = $q.defer();
            $http.get('/api/pins/')
                .success(function (data, status, headers, config) {
                    deferred.resolve(data, status, headers, config);
                })
                .error(function () {
                    deferred.reject("An error occured while fetching pins");
                });
            return deferred.promise;
        }
    }
});
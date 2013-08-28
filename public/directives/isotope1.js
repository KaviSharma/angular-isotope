var app = angular.module('timesheet');

app.directive('isoRpt', function ($timeout) {
    return function (scope, element, attrs) {

        var options = {
            //animationEngine: 'jquery',
            itemSelector: 'li',
            layoutMode: 'fitRows',
            sortAscending: scope.sortOrder,
            sortBy: scope.sortBy,
            getSortData: {
                category: function ($elem) {
                    return $elem.find('.thumbnail').attr("task-category");
                },
                id: function ($elem) {
                    return $elem.find('.thumbnail').attr("task-id");
                },
                name: function ($elem) {
                    return $elem.find('.thumbnail').find('h2').html();
                }
            }
        };
        window.scope = scope;
        window.ele = element;
        window.attrs = attrs;

        element.parent().isotope(options);

        scope.$watch('sortBy', function (val) {
            element.parent().isotope('reloadItems').isotope({ sortBy: scope.sortBy, sortAscending: scope.sortOrder });
        }, true);

        scope.$watch('sortOrder', function (val) {
            element.parent().isotope('reloadItems').isotope({ sortBy: scope.sortBy, sortAscending: scope.sortOrder });
        }, true);

        scope.$watch('filterBy', function (val) {
            element.parent().isotope('reloadItems').isotope({ filter: scope.filterBy });
        }, true);

        scope.$watch('items', function (val) {
            element.parent().isotope('reloadItems').isotope({ sortBy: scope.sortBy, sortAscending: scope.sortOrder, filter: scope.filterBy });
        }, true);


        scope.logHello = function () {
            console.log("hello world")
        }


    };
});
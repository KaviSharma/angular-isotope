var app = angular.module('timesheet');

app.directive('isoRepeat', function ($timeout) {
    return {
        scope: {
            items: '=isoRepeat'
        },
        template: '<ul class="thumbnails"><li class="span3" ng-repeat="item in items | orderBy:\'name\'">' +
            '<div class="thumbnail" project-id="{{item.id}}" project-domain="{{item.domain}}" ><article>' +
            '<h2>{{item.name}}</h2>' +
            '</article></div></li></ul>',
        link: function (scope, element, attrs) {

            var options = {
                animationEngine: 'jquery',
                itemSelector: 'li',
                layoutMode: 'fitRows',
                sortAscending: true,
                getSortData: {
                    domain: function ($elem) {
                        return $elem.find('.thumbnail').attr("project-domain");
                    },
                    id: function ($elem) {
                        return $elem.find('.thumbnail').attr("project-id");
                    }
                }
            };

            window.scope= scope;
            window.element= element;
            window.attrs= attrs;

            element.isotope(options);

            scope.$watch('items', function (newVal, oldVal) {
                $timeout(function () {
                    element.isotope('reloadItems').isotope({ sortBy: 'id' });
                });
            }, true);

            scope.$watch('sortBy', function () {
                element.isotope('reloadItems').isotope({ sortBy: scope.sortBy });
            }, true);

            scope.logHello = function () {
                console.log("hello world")
            }
        }
    };
});
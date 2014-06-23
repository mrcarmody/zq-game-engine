'use strict';

angular.module('mean').directive('zqSelectMap', [ '$compile', 'Global', function ($compile,Global) {

    var linkFunction = function (scope, element, attrs) {
        scope.maps = Global.maps;
    };

    return {
        scope: {
            model: '='
        },
        restrict: 'E',
        templateUrl: 'maps/views/select.html',
        link: linkFunction
    };
}]);

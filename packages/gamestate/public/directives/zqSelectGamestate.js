'use strict';

angular.module('mean').directive('zqSelectGamestate', [ '$compile', 'Global', function ($compile,Global) {

    var linkFunction = function (scope, element, attrs) {
        scope.gamestates = Global.gamestates;
    };

    return {
        scope: {
            model: '='
        },
        restrict: 'E',
        templateUrl: 'gamestate/views/select.html',
        link: linkFunction
    };
}]);

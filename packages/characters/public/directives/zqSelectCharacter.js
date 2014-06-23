'use strict';

angular.module('mean').directive('zqSelectCharacter', [ '$compile', 'Global', function ($compile,Global) {

    var linkFunction = function (scope, element, attrs) {
        scope.characters = Global.characters;
    };

    return {
        scope: {
            model: '='
        },
        restrict: 'E',
        templateUrl: 'characters/views/select.html',
        link: linkFunction
    };
}]);

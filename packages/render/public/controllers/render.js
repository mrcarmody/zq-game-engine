'use strict';

angular.module('mean').controller('RenderController', ['$scope', 'Global', 'Render',
    function($scope, Global, Render) {
        $scope.global = Global;
        $scope.package = {
            name: 'render'
        };
    }
]);

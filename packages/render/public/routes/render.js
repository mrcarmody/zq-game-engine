'use strict';

angular.module('mean').config(['$stateProvider',
    function($stateProvider) {
        $stateProvider.state('render', {
            url: '/render',
            templateUrl: 'render/views/render.html'
        });
    }
]);

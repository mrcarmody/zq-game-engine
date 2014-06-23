'use strict';

angular.module('mean.render').config(['$stateProvider',
    function($stateProvider) {
        $stateProvider.state('render', {
            url: '/render',
            templateUrl: 'render/views/render.html'
        });
    }
]);

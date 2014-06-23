'use strict';

angular.module('mean').config(['$stateProvider', '$urlRouterProvider',
  function($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('maps', {
        url: '/maps',
        templateUrl: 'maps/views/maps.html'
      });
  }
]);
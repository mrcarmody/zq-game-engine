'use strict';

angular.module('mean').config(['$stateProvider', '$urlRouterProvider',
  function($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('gamestates', {
        url: '/gamestates',
        templateUrl: 'gamestate/views/gamestate.html'
      });
  }
]);

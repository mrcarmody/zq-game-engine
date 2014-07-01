'use strict';

angular.module('mean').config(['$stateProvider', '$urlRouterProvider',
  function($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('characters', {
        url: '/characters',
        templateUrl: 'characters/views/characters.html'
      });
  }
]);
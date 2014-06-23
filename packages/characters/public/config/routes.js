'use strict';

angular.module('mean').config(['$stateProvider', '$urlRouterProvider',
  function($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('characters', {
        url: '/characters',
        templateUrl: 'characters/views/characters.html'
      })
      .state('characters.humans', {
        url: '/characters/humans',
        templateUrl: 'characters/views/humans.html'
      })
      .state('characters.zombies', {
        url: '/characters/zombies',
        templateUrl: 'characters/views/zombies.html'
      });
  }
]);
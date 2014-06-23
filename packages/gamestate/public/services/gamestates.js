'use strict';

angular.module('mean.gamestate').factory('Gamestates', ['$resource', function($resource) {
    return $resource('gamestates/:gamestateId', {
        gamestateId: '@_id'
    }, {
        update: {
            method: 'PUT'
        }
    });
}]);

'use strict';

//Characters service used for todos REST endpoint
angular.module('mean').factory('Characters', ['$resource', function($resource) {
    return $resource('characters/:characterId', {
        characterId: '@_id'
    }, {
        update: {
            method: 'PUT'
        }
    });
}]);
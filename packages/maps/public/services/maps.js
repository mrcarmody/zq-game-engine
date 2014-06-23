'use strict';

//Maps service used for todos REST endpoint
angular.module('mean').factory('Maps', ['$resource', function($resource) {
    return $resource('maps/:mapId', {
        mapId: '@_id'
    }, {
        update: {
            method: 'PUT'
        }
    });
}]);
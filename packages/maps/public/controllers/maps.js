'use strict';

angular.module('mean').controller('MapsController', ['$scope', '$stateParams', '$location', 'Global', 'Maps', 
  function($scope, $stateParams, $location, Global, Maps) {
    $scope.global = Global;

    // coming soon
    $scope.create = function() {
        var map = new Maps({
            // map data
        });
        map.$save(function(response) {
            $location.path('maps/' + response._id);
        });

        // reset input vars
    };

    // coming soon
    $scope.update = function() {
        var map = $scope.map;
        if (!map.updated) {
            map.updated = [];
        }
        map.updated.push(new Date().getTime());

        map.$update(function() {
            $location.path('maps/' + map._id);
        });
    };

    // coming soon
    $scope.remove = function(map) {
        if (map) {
            map.$remove();

            for (var i in $scope.maps) {
                if ($scope.maps[i] === map) {
                    $scope.maps.splice(i, 1);
                }
            }
        } else {
            $scope.map.$remove(function(response) {
                $location.path('maps');
            });
        }
    };

    // get all maps
    $scope.find = function() {
        Maps.query(function(maps) {
            $scope.maps = Global.maps = maps;
        });
    };

    // get specific map
    $scope.findOne = function() {
        Maps.get({
            mapId: $stateParams.mapId
        }, function(map) {
            $scope.map = map;
        });
    };

  }
]);
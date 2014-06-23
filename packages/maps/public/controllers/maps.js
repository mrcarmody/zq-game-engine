'use strict';

angular.module('mean').controller('MapsController', ['$scope', '$stateParams', '$location', 'Global', 'Maps', 
  function($scope, $stateParams, $location, Global, Maps) {
    $scope.global = Global;

    $scope.create = function() {
        var map = new Maps({
            title: this.title,
            content: this.content
        });
        map.$save(function(response) {
            $location.path('maps/' + response._id);
        });

        this.title = '';
        this.content = '';
    };

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

    $scope.find = function() {
        Maps.query(function(maps) {
            $scope.maps = Global.maps = maps;
        });
    };

    $scope.findOne = function() {
        Maps.get({
            mapId: $stateParams.mapId
        }, function(map) {
            $scope.map = map;
        });
    };


  }
]);
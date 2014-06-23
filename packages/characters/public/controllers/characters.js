'use strict';

angular.module('mean').controller('CharactersController', ['$scope', '$stateParams', '$location', 'Global', 'Characters',
  function($scope, $stateParams, $location, Global, Characters) {
    $scope.global = Global;

    $scope.create = function() {
        var character = new Characters({
            title: this.title,
            content: this.content
        });
        character.$save(function(response) {
            $location.path('characters/' + response._id);
        });

        this.title = '';
        this.content = '';
    };

    $scope.update = function() {
        var character = $scope.character;
        if (!character.updated) {
            character.updated = [];
        }
        character.updated.push(new Date().getTime());

        character.$update(function() {
            $location.path('characters/' + character._id);
        });
    };

    $scope.remove = function(character) {
        if (character) {
            character.$remove();

            for (var i in $scope.characters) {
                if ($scope.characters[i] === character) {
                    $scope.characters.splice(i, 1);
                }
            }
        } else {
            $scope.character.$remove(function(response) {
                $location.path('characters');
            });
        }
    };

    $scope.find = function() {
        Characters.query(function(characters) {
            $scope.characters = Global.characters = characters;
        });
    };

    $scope.findOne = function() {
        Characters.get({
            characterId: $stateParams.characterId
        }, function(character) {
            $scope.character = character;
        });
    };

  }
]);
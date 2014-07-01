'use strict';


// define controller for add new character modal (used below)
var characterModalInstanceCtrl = function ($scope, $modalInstance, character, Characters) {

    if (character){
        $scope.character = character;
    }

    $scope.newCharacter = {
        name: '',
        age: 0,
        health: 100,
        speed: 1,
        strength: 1,
        hunger: 0,
        locationx: 0,
        locationy: 0
    };

    $scope.create = function() {
        var character = new Characters($scope.newCharacter);
        character.$save(function(character) {
            // add the new character to the collection
            $scope.characters.push(character);
            $modalInstance.dismiss('saved');
        });
    };

    $scope.update = function() {
        $scope.character.$update(function(character) {
            $modalInstance.dismiss('saved');
        });
    };

    $scope.delete = function () {
        $modalInstance.close();
    };

    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };
};


angular.module('mean').controller('CharactersController', ['$scope', '$stateParams', 
  '$location', '$modal', 'Global', 'Characters',
  function($scope, $stateParams, $location, $modal, Global, Characters) {
    $scope.global = Global;

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

    $scope.openCharacterModal = function(context, character){
        var url;

        if (context === 'new'){
            url = 'characters/views/addNew.html';
        } else if (context === 'edit'){
            url = 'characters/views/edit.html';
        } else {
            return false;
        }

        var modalInstance = $modal.open({
            templateUrl: url,
            controller: characterModalInstanceCtrl,
            resolve: {
                character: function(){
                    return character;
                }
            }
        });

        var okCallback = function(){};
        var cancelCallback = function(){};

        modalInstance.result.then(okCallback, cancelCallback);
    };

  }
]);
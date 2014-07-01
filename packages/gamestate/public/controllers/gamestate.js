'use strict';

// define controller for gamestate modal (used below)
var ModalInstanceCtrl = function ($scope, $modalInstance, gamestate, Gamestates) {

    // if this modal is being called in 'edit' mode
    // we will receive a gamestate object for editing
    // - if that is the case, set it on the scope
    if (gamestate){
        $scope.gamestate = gamestate;
    }

    // a base object for new gamestates
    // maybe make this a class?  use the $resource maybe?
    $scope.newGamestate = {
        map: '',
        characters: [],
        commandQueue: []
    };

    // create a gamestate
    $scope.create = function() {
        // create a gamestate resource
        var gamestate = new Gamestates({
            map: $scope.newGamestate.map,
            characters: $scope.newGamestate.characters,
            commandQueue: $scope.newGamestate.commandQueue,
        });
        // save the resource
        gamestate.$save(function(gamestate) {
            // add the new gamestate to the collection
            $scope.gamestates.push(gamestate);
            $modalInstance.dismiss('saved');
        });
    };

    // update the gamestate
    $scope.update = function() {
        $scope.gamestate.$update(function(gamestate) {
            $modalInstance.dismiss('saved');
        });
    };

    // coming soon
    $scope.delete = function () {
        $modalInstance.close();
    };

    // close the modal without doing anything
    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };
};


angular.module('mean').controller('GamestateController', 
    ['$scope', '$stateParams', '$location', '$modal', 'Global', 'Gamestates',
    function($scope, $stateParams, $location, $modal, Global, Gamestates) {
        $scope.global = Global;

    // is this used still?  maybe can move?
    $scope.update = function() {
        var gamestate = $scope.gamestate;
        if (!gamestate.updated) {
            gamestate.updated = [];
        }
        gamestate.updated.push(new Date().getTime());

        gamestate.$update(function() {
            $location.path('gamestates/' + gamestate._id);
        });
    };

    // coming soon
    $scope.remove = function(gamestate) {
        if (gamestate) {
            gamestate.$remove();

            for (var i in $scope.gamestates) {
                if ($scope.gamestates[i] === gamestate) {
                    $scope.gamestates.splice(i, 1);
                }
            }
        } else {
            $scope.gamestate.$remove(function(gamestate) {
                $location.path('gamestates');
            });
        }
    };

    // get all gamestates from the API
    $scope.find = function() {
        Gamestates.query(function(gamestates) {
            $scope.gamestates = Global.gamestates = gamestates;
        });
    };

    // get a specific gamestate
    $scope.findOne = function() {
        Gamestates.get({
            gamestateId: $stateParams.gamestateId
        }, function(gamestate) {
            $scope.gamestate = gamestate;
        });
    };

    // open the new/edit gamestate modal
    $scope.openGamestateModal = function(context, gamestate){
        var url;

        // load the relevant partial
        if (context === 'new'){
            url = 'gamestate/views/addNew.html';
        } else if (context === 'edit'){
            url = 'gamestate/views/edit.html';
        } else {
            return false;
        }

        // launch a modal
        var modalInstance = $modal.open({
            templateUrl: url,
            controller: ModalInstanceCtrl,
            resolve: {
                gamestate: function(){
                    return gamestate;
                }
            }
        });

        // placeholder callbacks
        var okCallback = function(){};
        var cancelCallback = function(){};

        modalInstance.result.then(okCallback, cancelCallback);
    };


}]);

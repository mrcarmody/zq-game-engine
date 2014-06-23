'use strict';


// define controller for add new canned gamestate modal (used below)
var ModalInstanceCtrl = function ($scope, $modalInstance, gamestate, Gamestates) {

    if (gamestate){
        $scope.gamestate = gamestate;
    }

    $scope.newGamestate = {
        map: '',
        characters: [],
        commandQueue: []
    };

    $scope.create = function() {
        var gamestate = new Gamestates({
            map: $scope.newGamestate.map,
            characters: $scope.newGamestate.characters,
            commandQueue: $scope.newGamestate.commandQueue,
        });
        gamestate.$save(function(gamestate) {
            // add the new gamestate to the collection
            $scope.gamestates.push(gamestate);
            $modalInstance.dismiss('saved');
        });
    };

    $scope.update = function() {
        $scope.gamestate.$update(function(gamestate) {
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



angular.module('mean.gamestate').controller('GamestateController', 
    ['$scope', '$stateParams', '$location', '$modal', 'Global', 'Gamestates',
    function($scope, $stateParams, $location, $modal, Global, Gamestates) {
        $scope.global = Global;

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

    $scope.find = function() {
        Gamestates.query(function(gamestates) {
            $scope.gamestates = gamestates;
        });
    };

    $scope.findOne = function() {
        Gamestates.get({
            gamestateId: $stateParams.gamestateId
        }, function(gamestate) {
            $scope.gamestate = gamestate;
        });
    };

    $scope.openGamestateModal = function(context, gamestate){
        var url;

        if (context === 'new'){
            url = 'gamestate/views/addNew.html';
        } else if (context === 'edit'){
            url = 'gamestate/views/edit.html';
        } else {
            return false;
        }

        var modalInstance = $modal.open({
            templateUrl: url,
            controller: ModalInstanceCtrl,
            resolve: {
                gamestate: function(){
                    return gamestate;
                }
            }
        });

        var okCallback = function(){};
        var cancelCallback = function(){};

        modalInstance.result.then(okCallback, cancelCallback);
    };


}]);

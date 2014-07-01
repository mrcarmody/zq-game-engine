'use strict';

//Characters service used for todos REST endpoint
angular.module('mean').factory('Characters', ['$resource', function($resource) {
    var Character = $resource('characters/:characterId', {
        characterId: '@_id'
    }, {
        update: {
            method: 'PUT'
        }
    });

    Character.prototype.ai = 'random';


    Character.prototype.getNextMove = function (){
        var move = {};

        // check the AI type
        // -- rando AI
        if (this.ai === 'random'){
            var rand;

            rand = Math.random();

            if(rand < 0.25){
                move = '+1x';
            } else if (rand < 0.5){
                move = '-1x';
            } else if (rand < 0.75){
                move = '+1y';
            } else if (rand < 1){
                move = '-1y';
            }
        }

        return move;
    };

    Character.prototype.isValidMove = function (map, move){
            var actor = this;
            var dist = move.substr(0,move.length-1);
            var dir = move[2];

            var newLoc,
                mapSize;

            if (dir === 'y'){
                newLoc = actor.locationy + parseInt(dist);
                mapSize = map.sizey;
            } else if (dir === 'x'){
                newLoc = actor.locationx + parseInt(dist);
                mapSize = map.sizex;
            } 

            // validation
            if (newLoc >= 0 && newLoc < mapSize){
                return true;
            }

            return false;        
    };

    Character.prototype.move = function (map){
        // this is what we will return
        var commandInfo = {
            type: 'move'
        };
        // get next move
        var move = this.getNextMove();
        // check move
        if (this.isValidMove(map,move)){
            // add to hunger
            this.hunger += 1;
            // add the move to the commandInfo
            commandInfo.move = move;
        }

        if (commandInfo){
            return commandInfo;
        } else {
            return false;
        }
    };

    Character.prototype.live = function (map){
        var commandInfo;
        // add to hunger (for living)
        this.hunger += 0.1;
        // check for enough health to live
        // then for enough health to move
        if (this.health < 0.1){
            // die
            commandInfo = {
                type: 'die'
            };
        } else if (this.health > 0.6){
            // move
            commandInfo = this.move(map);
        }
        // add to age
        this.age += 0.5;

        // once hunger hits 100, start hurting health
        if (this.hunger > 100){
            this.health -= (this.hunger - 100)*2;
            // 100 is the max hunger
            this.hunger = 100;
        }

        // return the command
        if (commandInfo && commandInfo.type){
            return commandInfo;
        }
    };

    return Character;
}]);
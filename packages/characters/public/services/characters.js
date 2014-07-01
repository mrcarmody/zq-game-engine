'use strict';

//Characters service used for calling the REST endpoint
angular.module('mean').factory('Characters', ['$resource', function($resource) {
    var Character = $resource('characters/:characterId', {
        characterId: '@_id'
    }, {
        update: {
            method: 'PUT'
        }
    });

    // type of AI - default is currently 'random'
    Character.prototype.ai = 'random';

    // get the character's next move
    // currently only a 'random' move is supported
    Character.prototype.getNextMove = function (){
        var move = {};

        // check the AI type
        // -- rando AI
        if (this.ai === 'random'){

            // really basic randomizer
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

    // check a move to make sure it is possible, given the map setup
    Character.prototype.isValidMove = function (map, move){
            var actor = this;
            // get the distance and direction of the move
            var dist = move.substr(0,move.length-1);
            var dir = move[2];

            var newLoc,
                mapSize;

            // define some vars based on the direction of the move
            if (dir === 'y'){
                newLoc = actor.locationy + parseInt(dist);
                mapSize = map.sizey;
            } else if (dir === 'x'){
                newLoc = actor.locationx + parseInt(dist);
                mapSize = map.sizex;
            } 

            // validation
            // - the new location should be a positive co-ord that is 
            //   less then the total map size
            if (newLoc >= 0 && newLoc < mapSize){
                return true;
            }

            return false;        
    };

    // Move the character
    // - get the next (potential) move from the AI
    // - check that can be made
    // - add to hunger, if the move can be made 
    //   (ideally this would be a callback that is run after
    //    the move is validated and carried forth on the map)
    Character.prototype.move = function (map){
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

        return commandInfo;
    };

    // this is run each game cycle
    // it is responsible for:
    // - adding the base amount of hunger
    // - verifying that the character has enough heath to carry out a move
    // - adding to the age
    // - reducing the character's health if too hungry
    // - getting and returning a move to be carried out for the character
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
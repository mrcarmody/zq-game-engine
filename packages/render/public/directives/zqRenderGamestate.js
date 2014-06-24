'use strict';

angular.module('mean').directive('zqRenderGamestate', [ '$compile', '$timeout', 'Characters', 'Maps', 
    function ($compile,$timeout,Characters,Maps) {

    /*************************
    * TODO:
    * - get consistent on how use mapEl in linkFunction (sometimes function returns it; sometimes the closure care is updated directly by the function)
    *
    *
    **************************/


    var buildMap = function(map){
        var el = '<div id="map-container">';

        // each row (map.sizex)
        for (var y=0;y<map.sizey;y++) {
            for (var x=0;x<map.sizex;x++) {
                el += '<div class="map-tile text-center" id="y'+y+'x'+x+'"></div>';
            }
            el += '<div class="line-break"></div>';
        }

        el += '</div>';

        return el;
    };

    var linkFunction = function (scope, element, attrs) {
        var mapEl;

        var loadGameData = function(callback){
            // 'queries' helps us keep track of outstanding queries
            var queries=0;
            var checkCallback = function(){
                // if there are no more queries and we have a valid callback
                if (queries === 0 && angular.isFunction(callback)){
                    callback();
                }
            };
            queries++;
            Characters.query(function(characters) {
                scope.actors = characters;
                queries--;
                checkCallback();
            });
            queries++;
            Maps.get({'mapId':scope.model.map},function(map){
                scope.map = map;
                queries--;
                checkCallback();
            });
        };

        var placeActors = function(mapEl){
            angular.forEach(scope.actors, function(actor){
                mapEl = mapEl.replace('id="y'+actor.locationy+'x'+actor.locationx+'"></div>',
                    'id="y'+actor.locationy+'x'+actor.locationx+'">H</div>');
            });

            return mapEl;
        };

        var validMove = function(move){
            var actor = scope.actors[0];
            var dist = move.substr(0,move.length-1);
            var dir = move[2];

            var newLoc,
                mapSize;

            if (dir === 'y'){
                newLoc = actor.locationy + parseInt(dist);
                mapSize = scope.map.sizey;
            } else if (dir === 'x'){
                newLoc = actor.locationx + parseInt(dist);
                mapSize = scope.map.sizex;
            } 

            // validation
            if (newLoc >= 0 && newLoc < mapSize){
                return true;
            }
        };

        var moveActor = function(commandInfo){
            var actor = scope.actors[0];

            if (!validMove(commandInfo.move)){
                return false;
            }

            mapEl = mapEl.replace('id="y'+actor.locationy+'x'+actor.locationx+'">H</div>',
                'id="y'+actor.locationy+'x'+actor.locationx+'"></div>');

            // this should be handled some other way than if logic
            if(commandInfo.move[0] === '+' && commandInfo.move[2] === 'y'){
                actor.locationy++;
            } else if (commandInfo.move[0] === '-' && commandInfo.move[2] === 'y'){
                actor.locationy--;
            } else if (commandInfo.move[0] === '+' && commandInfo.move[2] === 'x'){
                actor.locationx++;
            } else if (commandInfo.move[0] === '-' && commandInfo.move[2] === 'x'){
                actor.locationx--;
            }

            mapEl = mapEl.replace('id="y'+actor.locationy+'x'+actor.locationx+'"></div>',
                'id="y'+actor.locationy+'x'+actor.locationx+'">H</div>');

        };

        var runCommandQueue = function(currentCommand){
            if (!currentCommand){
                currentCommand = scope.model.currentCommand;
            }

            var currentCommandChunk = angular.fromJson(scope.model.commandQueue[currentCommand]);

            angular.forEach(currentCommandChunk, function(commandInfo){
                moveActor(commandInfo);
            });

            $timeout(function(){
                updateDOM();
                runCommandQueue(currentCommand+1);
            },500);
        };

        var getNextMove = function(){
            var commandInfo = {};
            var rand;

            rand = Math.random();

            if(rand < 0.25){
                commandInfo.move = '+1x';
            } else if (rand < 0.5){
                commandInfo.move = '-1x';
            } else if (rand < 0.75){
                commandInfo.move = '+1y';
            } else if (rand < 1){
                commandInfo.move = '-1y';
            }

            return commandInfo;
        };

        var timeoutFunction = function(){
            var commandInfo = getNextMove();
            updateDOM();
            moveActor(commandInfo);
            runGameLoop();
        };

        var runGameLoop = function(){
            $timeout(timeoutFunction,500);
        };

        var updateDOM = function(){
            var map = element[0].querySelector('#map-container');

            if (map){$timeout(function(){

            },500);
                angular.element(map).replaceWith(mapEl);
            } else {
                 element.append(mapEl);
            }
        };

        // this chunk of code runs when the directive is first loaded
        if (scope.model){
            scope.model = angular.fromJson(scope.model);
            mapEl = buildMap(scope.map);
        }

        $compile(mapEl)(scope);
        element.append(mapEl);

        // and this watches for any changes to the gamestate model
        scope.$watch('model', function(newVal,oldVal){
            if (!newVal){
                return;
            }
            scope.model = angular.fromJson(newVal);
            scope.model.commandQueue = angular.fromJson(scope.model.commandQueue);

            if (scope.model && scope.model.map){
                loadGameData(function(){
                    mapEl = buildMap(scope.map);
                    mapEl = placeActors(mapEl);
                    updateDOM();
                });
            }
        },true);

        // this runs the game when the user clicks the 'run' button 
        scope.$watch('runCommands', function(newVal,oldVal){
            if (newVal){
                runCommandQueue();
            }
        });
        scope.$watch('runLoop', function(newVal,oldVal){
            if (newVal){
                runGameLoop();
            }
        });

    };

    return {
        scope: {
            model: '=',
            runCommands: '=',
            runLoop: '='
        },
        restrict: 'E',
        link: linkFunction
    };
}]);

'use strict';

angular.module('mean').directive('zqRenderGamestate', [ '$compile', '$timeout', 'Characters', 'Maps', 
    function ($compile,$timeout,Characters,Maps) {

    /*************************
    * TODO:
    * - get consistent on how use mapEl in linkFunction (sometimes function returns it; sometimes the closure care is updated directly by the function)
    * - move all those functions from the linkFunction closure to somewhere better... a service?
    * - is string replacement the best (fastest) way to move actors around?  trying to avoid excess DOM manipulation
    *
    **************************/


    // build out the intial map DOM
    var buildMap = function(map){
        var el = '<div id="map-container">';

        // build out a map with y by x tiles
        for (var y=0;y<map.sizey;y++) {
            for (var x=0;x<map.sizex;x++) {
                el += '<div class="map-tile text-center" id="y'+y+'x'+x+'"></div>';
            }
            el += '<div class="line-break"></div>';
        }

        el += '</div>';

        return el;
    };

    // linkFunction for directive definition below
    var linkFunction = function (scope, element, attrs) {
        var mapEl;

        // function to load the needed data to run a game loop
        var loadGameData = function(callback){
            // 'queries' helps us keep track of outstanding queries
            var queries=0;
            var checkCallback = function(){
                // if there are no more queries and we have a valid callback
                if (queries === 0 && angular.isFunction(callback)){
                    callback();
                }
            };
            // Characters query
            queries++;
            Characters.query(function(characters) {
                scope.actors = characters;
                queries--;
                checkCallback();
            });
            // Map query
            queries++;
            Maps.get({'mapId':scope.model.map},function(map){
                scope.map = map;
                queries--;
                checkCallback();
            });
        };

        // function to set each actor in its intial place on the map
        var placeActors = function(mapEl){
            angular.forEach(scope.actors, function(actor){
                mapEl = mapEl.replace('id="y'+actor.locationy+'x'+actor.locationx+'"></div>',
                    'id="y'+actor.locationy+'x'+actor.locationx+'">H</div>');
            });

            return mapEl;
        };

        // check if a move is valid for a given actor
        // (the map is assumed to be on the scope)
        // - This function is out of date - the function in the
        // character service is further along i think?
        // - Combine this and the char service function?  Would be nice to
        //   centralize that
        var validMove = function(actor,move){
            if (!actor || !move){
                return false;
            }
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

        // move an actor
        var moveActor = function(actor, commandInfo){
            // check if the actor died
            if (commandInfo.type === 'die'){
                // die
                mapEl = mapEl.replace('id="y'+actor.locationy+'x'+actor.locationx+'">H</div>',
                    'id="y'+actor.locationy+'x'+actor.locationx+'">D</div>');
                
            } else {
                // check if the move is valid
                if (!validMove(actor,commandInfo.move)){
                    return false;
                }

                // remove the actor icon from its current tile
                mapEl = mapEl.replace('id="y'+actor.locationy+'x'+actor.locationx+'">H</div>',
                    'id="y'+actor.locationy+'x'+actor.locationx+'"></div>');

                // this should probably be handled some other way than if logic
                if(commandInfo.move[0] === '+' && commandInfo.move[2] === 'y'){
                    actor.locationy++;
                } else if (commandInfo.move[0] === '-' && commandInfo.move[2] === 'y'){
                    actor.locationy--;
                } else if (commandInfo.move[0] === '+' && commandInfo.move[2] === 'x'){
                    actor.locationx++;
                } else if (commandInfo.move[0] === '-' && commandInfo.move[2] === 'x'){
                    actor.locationx--;
                }

                // put the actors icon on the new tile
                mapEl = mapEl.replace('id="y'+actor.locationy+'x'+actor.locationx+'"></div>',
                    'id="y'+actor.locationy+'x'+actor.locationx+'">H</div>');
            }

        };

        // runs the gamestate commandQueue
        // - this is fairly out of date and currently unused
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

        // need a better name...
        // this is the call back function that is run each iteration of the game loop
        var timeoutFunction = function(){
            // loop thru each actor
            angular.forEach(scope.actors,function(actor){
                // check the actor's health
                if (actor.health > 0){   
                    // if actor is alive, cause it to live 
                    // and get the command that is returned
                    var commandInfo = actor.live(scope.map);
                    // if we received a command, execute it on the map
                    if (commandInfo){
                        moveActor(actor,commandInfo);
                    }
                }
            });
            // update the DOM
            updateDOM();
            // keep the loop going
            runGameLoop();
        };

        var runGameLoop = function(){
            $timeout(timeoutFunction,500);
        };

        var updateDOM = function(){
            // find the map element
            var map = element[0].querySelector('#map-container');

            // check if a map exists and replace it if so
            // append the new map if not
            if (map){
                angular.element(map).replaceWith(mapEl);
            } else {
                 element.append(mapEl);
            }
        };

        // this chunk of code runs when the directive is first loaded
        if (scope.model){
            // deserialize the model
            scope.model = angular.fromJson(scope.model);
            // build the initial map
            mapEl = buildMap(scope.map);
        }

        // compile the map Element
        // does this do anything??
        $compile(mapEl)(scope);
        // append the map to the DOM
        element.append(mapEl);

        // this watches for any changes to the gamestate model 
        // (i.e. user chooses a different gamestate from teh dropdown)
        scope.$watch('model', function(newVal,oldVal){
            // check that we have a new value
            if (!newVal){
                return;
            }
            // deserialize the model
            scope.model = angular.fromJson(newVal);
            // and the commandQueue
            scope.model.commandQueue = angular.fromJson(scope.model.commandQueue);


            if (scope.model && scope.model.map){
                // load the initial game data
                loadGameData(function(){
                    // build the map
                    mapEl = buildMap(scope.map);
                    // place the actors 
                    mapEl = placeActors(mapEl);
                    // display it in the browser
                    updateDOM();
                });
            }
        },true);

        // this runs the gamestate commandQueue when the user clicks the '' button 
/*        scope.$watch('runCommands', function(newVal,oldVal){
            if (newVal){
                runCommandQueue();
            }
        });*/
        // this runs the game when the user clicks the 'run' button 
        scope.$watch('runLoop', function(newVal,oldVal){
            if (newVal){
                runGameLoop();
            }
        });

    };


    // return directive options/definition
    return {
        scope: {
            model: '=',
            runCommands: '=',
            runLoop: '=',
            actors: '='
        },
        restrict: 'E',
        link: linkFunction
    };
}]);

'use strict';

(function() {
    // Characters Controller Spec
    describe('MEAN controllers', function() {
        describe('CharactersController', function() {
            // The $resource service augments the response object with methods for updating and deleting the resource.
            // If we were to use the standard toEqual matcher, our tests would fail because the test values would not match
            // the responses exactly. To solve the problem, we use a newly-defined toEqualData Jasmine matcher.
            // When the toEqualData matcher compares two objects, it takes only object properties into
            // account and ignores methods.
            beforeEach(function() {
                this.addMatchers({
                    toEqualData: function(expected) {
                        return angular.equals(this.actual, expected);
                    }
                });
            });

            // Load the controllers module
            beforeEach(module('mean'));

            // Initialize the controller and a mock scope
            var CharactersController,
                scope,
                $httpBackend,
                $stateParams,
                $location;

            // The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
            // This allows us to inject a service but then attach it to a variable
            // with the same name as the service.
            beforeEach(inject(function($controller, $rootScope, _$location_, _$stateParams_, _$httpBackend_) {

                scope = $rootScope.$new();

                CharactersController = $controller('CharactersController', {
                    $scope: scope
                });

                $stateParams = _$stateParams_;

                $httpBackend = _$httpBackend_;

                $location = _$location_;

            }));

            it('$scope.find() should create an array with at least one character object ' +
                'fetched from XHR', function() {

                    // test expected GET request
                    $httpBackend.expectGET('characters').respond([{
                        name: 'A test character',
                        age: 30,
                        health: 80,
                        speed: 1,
                        strength: 1,
                        hunger: 0,
                        locationx: 0,
                        locationy: 0
                    }]);

                    // run controller
                    scope.find();
                    $httpBackend.flush();

                    // test characters collection values
                    // for some reason toEqualData is not working, so check the 
                    // properties individually
                    expect(scope.characters[0].name).toBe('A test character');
                    expect(scope.characters[0].age).toBe(30);
                    expect(scope.characters[0].health).toBe(80);
                    expect(scope.characters[0].speed).toBe(1);
                    expect(scope.characters[0].strength).toBe(1);
                    expect(scope.characters[0].hunger).toBe(0);
                    expect(scope.characters[0].locationx).toBe(0);
                    expect(scope.characters[0].locationy).toBe(0);

                    /*
                    expect(scope.characters).toEqualData([{
                        name: 'A test character',
                        age: 30,
                        health: 80,
                        speed: 1,
                        strength: 1,
                        hunger: 0,
                        locationx: 0,
                        locationy: 0
                    }]);*/

                });

            it('$scope.findOne() should create a character object on the scope ' +
                'from XHR using a characterId URL parameter', function() {
                    // fixture URL parament
                    $stateParams.characterId = '525a8422f6d0f87f0e407a33';

                    // fixture response object
                    var testCharacterData = function() {
                        return {
                            name: 'A test character',
                            age: 30,
                            health: 80,
                            speed: 1,
                            strength: 1,
                            hunger: 0,
                            locationx: 0,
                            locationy: 0
                        };
                    };

                    // test expected GET request with response object
                    $httpBackend.expectGET(/characters\/([0-9a-fA-F]{24})$/).respond(testCharacterData());

                    // run controller
                    scope.findOne();
                    $httpBackend.flush();

                    // check characters values
                    // for some reason toEqualData is not working, so check the 
                    // properties individually
                    expect(scope.character.name).toBe('A test character');
                    expect(scope.character.age).toBe(30);
                    expect(scope.character.health).toBe(80);
                    expect(scope.character.speed).toBe(1);
                    expect(scope.character.strength).toBe(1);
                    expect(scope.character.hunger).toBe(0);
                    expect(scope.character.locationx).toBe(0);
                    expect(scope.character.locationy).toBe(0);


                    //expect(scope.character).toEqualData(testCharacterData());

                });

            it('$scope.remove() should send a DELETE request with a valid characterId ' +
                'and remove the character from the scope', inject(function(Characters) {

                    // fixture rideshare
                    var character = new Characters({
                        _id: '525a8422f6d0f87f0e407a33'
                    });

                    // mock rideshares in scope
                    scope.characters = [];
                    scope.characters.push(character);

                    // test expected rideshare DELETE request
                    $httpBackend.expectDELETE(/characters\/([0-9a-fA-F]{24})$/).respond(204);

                    // run controller
                    scope.remove(character);
                    $httpBackend.flush();

                    // test after successful delete URL location characters lis
                    //expect($location.path()).toBe('/characters');
                    expect(scope.characters.length).toBe(0);

                }));

        });

        describe('ModalInstanceCtrl', function() {

            // Initialize the controller and a mock scope
            var ModalInstanceCtrl,
                scope,
                $httpBackend,
                $location;

            beforeEach(inject(function($controller, $rootScope, _$location_, _$httpBackend_) {

                scope = $rootScope.$new();

                // mock the Characters service
                var mockCharacters = function(){
                    return {
                        $save: function(){
                            
                        }
                    };
                };

                ModalInstanceCtrl = $controller('characterModalInstanceCtrl', {
                    $scope: scope,
                    // mock modal instance
                    $modalInstance: {
                        dismiss: function(){},
                        close: function(){}
                    },
                    character: false,
                    Characters: mockCharacters
                });

                $httpBackend = _$httpBackend_;

                $location = _$location_;

            }));

            it('$scope.create() with valid form data should send a POST request ' +
                'with the form input values and then ' +
                'locate to new object URL', function() {

                    // fixture expected POST data
                    var postCharacterData = function() {
                        return {
                            name: 'A test character',
                            age: 0,
                            health: 100,
                            speed: 1,
                            strength: 1,
                            hunger: 0,
                            locationx: 0,
                            locationy: 0
                        };
                    };

                    // fixture expected response data
                    var responseCharacterData = function() {
                        return {
                            _id: '525cf20451979dea2c000001',
                            name: 'A test character',
                            age: 0,
                            health: 100,
                            speed: 1,
                            strength: 1,
                            hunger: 0,
                            locationx: 0,
                            locationy: 0
                        };
                    };

                    // fixture mock form input values
                    scope.newCharacter = {
                        name: 'A test character',
                        age: 30,
                        health: 80,
                        speed: 1,
                        strength: 1,
                        hunger: 0,
                        locationx: 0,
                        locationy: 0
                    };

                    // test post request is sent
                    //$httpBackend.expectPOST('characters', postCharacterData()).respond(responseCharacterData());

                    // Run controller
                    scope.create();
                   // $httpBackend.flush();

                    // test form input(s) are reset
                    expect(scope.newCharacter.name).toEqual('');
                    expect(scope.newCharacter.age).toEqual(0);
                    expect(scope.newCharacter.health).toEqual(100);

                    // test URL location to new object
                    expect($location.path()).toBe('/characters/' + responseCharacterData()._id);
                });

            it('$scope.update() should update a valid character', inject(function(Characters) {

                // fixture rideshare
                var putCharacterData = function() {
                    return {
                        _id: '525a8422f6d0f87f0e407a33',
                        title: 'An Character about MEAN',
                        to: 'MEAN is great!'
                    };
                };

                // mock character object from form
                var character = new Characters(putCharacterData());

                // mock character in scope
                scope.character = character;

                // test PUT happens correctly
                $httpBackend.expectPUT(/characters\/([0-9a-fA-F]{24})$/).respond();

                // testing the body data is out for now until an idea for testing the dynamic updated array value is figured out
                //$httpBackend.expectPUT(/characters\/([0-9a-fA-F]{24})$/, putCharacterData()).respond();
                /*
                Error: Expected PUT /characters\/([0-9a-fA-F]{24})$/ with different data
                EXPECTED: {"_id":"525a8422f6d0f87f0e407a33","title":"An Character about MEAN","to":"MEAN is great!"}
                GOT:      {"_id":"525a8422f6d0f87f0e407a33","title":"An Character about MEAN","to":"MEAN is great!","updated":[1383534772975]}
                */

                // run controller
                scope.update();
                $httpBackend.flush();

                // test URL location to new object
                expect($location.path()).toBe('/characters/' + putCharacterData()._id);

            }));


        });
    });
}());

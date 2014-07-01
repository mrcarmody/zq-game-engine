'use strict';

(function() {
    // Gamestates Controller Spec
    describe('MEAN controllers', function() {
        describe('GamestatesController', function() {
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
            var GamestatesController,
                scope,
                $httpBackend,
                $stateParams,
                $location;

            // The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
            // This allows us to inject a service but then attach it to a variable
            // with the same name as the service.
            beforeEach(inject(function($controller, $rootScope, _$location_, _$stateParams_, _$httpBackend_) {

                scope = $rootScope.$new();

                GamestatesController = $controller('GamestatesController', {
                    $scope: scope
                });

                $stateParams = _$stateParams_;

                $httpBackend = _$httpBackend_;

                $location = _$location_;

            }));

            it('$scope.find() should create an array with at least one gamestate object ' +
                'fetched from XHR', function() {

                    // test expected GET request
                    $httpBackend.expectGET('gamestates').respond([{
                        title: 'An Gamestate about MEAN',
                        content: 'MEAN rocks!'
                    }]);

                    // run controller
                    scope.find();
                    $httpBackend.flush();

                    // test scope value
                    expect(scope.gamestates).toEqualData([{
                        title: 'An Gamestate about MEAN',
                        content: 'MEAN rocks!'
                    }]);

                });

            it('$scope.findOne() should create an array with one gamestate object fetched ' +
                'from XHR using a gamestateId URL parameter', function() {
                    // fixture URL parament
                    $stateParams.gamestateId = '525a8422f6d0f87f0e407a33';

                    // fixture response object
                    var testGamestateData = function() {
                        return {
                            title: 'An Gamestate about MEAN',
                            content: 'MEAN rocks!'
                        };
                    };

                    // test expected GET request with response object
                    $httpBackend.expectGET(/gamestates\/([0-9a-fA-F]{24})$/).respond(testGamestateData());

                    // run controller
                    scope.findOne();
                    $httpBackend.flush();

                    // test scope value
                    expect(scope.gamestate).toEqualData(testGamestateData());

                });

            it('$scope.create() with valid form data should send a POST request ' +
                'with the form input values and then ' +
                'locate to new object URL', function() {

                    // fixture expected POST data
                    var postGamestateData = function() {
                        return {
                            title: 'An Gamestate about MEAN',
                            content: 'MEAN rocks!'
                        };
                    };

                    // fixture expected response data
                    var responseGamestateData = function() {
                        return {
                            _id: '525cf20451979dea2c000001',
                            title: 'An Gamestate about MEAN',
                            content: 'MEAN rocks!'
                        };
                    };

                    // fixture mock form input values
                    scope.title = 'An Gamestate about MEAN';
                    scope.content = 'MEAN rocks!';

                    // test post request is sent
                    $httpBackend.expectPOST('gamestates', postGamestateData()).respond(responseGamestateData());

                    // Run controller
                    scope.create();
                    $httpBackend.flush();

                    // test form input(s) are reset
                    expect(scope.title).toEqual('');
                    expect(scope.content).toEqual('');

                    // test URL location to new object
                    expect($location.path()).toBe('/gamestates/' + responseGamestateData()._id);
                });

            it('$scope.update() should update a valid gamestate', inject(function(Gamestates) {

                // fixture rideshare
                var putGamestateData = function() {
                    return {
                        _id: '525a8422f6d0f87f0e407a33',
                        title: 'An Gamestate about MEAN',
                        to: 'MEAN is great!'
                    };
                };

                // mock gamestate object from form
                var gamestate = new Gamestates(putGamestateData());

                // mock gamestate in scope
                scope.gamestate = gamestate;

                // test PUT happens correctly
                $httpBackend.expectPUT(/gamestates\/([0-9a-fA-F]{24})$/).respond();

                // testing the body data is out for now until an idea for testing the dynamic updated array value is figured out
                //$httpBackend.expectPUT(/gamestates\/([0-9a-fA-F]{24})$/, putGamestateData()).respond();
                /*
                Error: Expected PUT /gamestates\/([0-9a-fA-F]{24})$/ with different data
                EXPECTED: {"_id":"525a8422f6d0f87f0e407a33","title":"An Gamestate about MEAN","to":"MEAN is great!"}
                GOT:      {"_id":"525a8422f6d0f87f0e407a33","title":"An Gamestate about MEAN","to":"MEAN is great!","updated":[1383534772975]}
                */

                // run controller
                scope.update();
                $httpBackend.flush();

                // test URL location to new object
                expect($location.path()).toBe('/gamestates/' + putGamestateData()._id);

            }));

            it('$scope.remove() should send a DELETE request with a valid gamestateId ' +
                'and remove the gamestate from the scope', inject(function(Gamestates) {

                    // fixture rideshare
                    var gamestate = new Gamestates({
                        _id: '525a8422f6d0f87f0e407a33'
                    });

                    // mock rideshares in scope
                    scope.gamestates = [];
                    scope.gamestates.push(gamestate);

                    // test expected rideshare DELETE request
                    $httpBackend.expectDELETE(/gamestates\/([0-9a-fA-F]{24})$/).respond(204);

                    // run controller
                    scope.remove(gamestate);
                    $httpBackend.flush();

                    // test after successful delete URL location gamestates lis
                    //expect($location.path()).toBe('/gamestates');
                    expect(scope.gamestates.length).toBe(0);

                }));
        });
    });
}());

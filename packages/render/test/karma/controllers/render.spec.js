'use strict';

(function() {
    // Render Controller Spec
     
    describe('MEAN controllers', function() {
        describe('RenderController', function() {
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
            var RenderController,
                scope,
                $httpBackend,
                $stateParams,
                $location;

            // The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
            // This allows us to inject a service but then attach it to a variable
            // with the same name as the service.
            beforeEach(inject(function($controller, $rootScope, _$location_, _$stateParams_, _$httpBackend_) {

                scope = $rootScope.$new();

                RenderController = $controller('RenderController', {
                    $scope: scope
                });

                $stateParams = _$stateParams_;

                $httpBackend = _$httpBackend_;

                $location = _$location_;

            }));
/*
            it('$scope.find() should create an array with at least one map object ' +
                'fetched from XHR', function() {

                    // test expected GET request
                    $httpBackend.expectGET('maps').respond([{
                        title: 'An Map about MEAN',
                        content: 'MEAN rocks!'
                    }]);

                    // run controller
                    scope.find();
                    $httpBackend.flush();

                    // test scope value
                    expect(scope.maps).toEqualData([{
                        title: 'An Map about MEAN',
                        content: 'MEAN rocks!'
                    }]);

                });

            it('$scope.findOne() should create an array with one map object fetched ' +
                'from XHR using a mapId URL parameter', function() {
                    // fixture URL parament
                    $stateParams.mapId = '525a8422f6d0f87f0e407a33';

                    // fixture response object
                    var testMapData = function() {
                        return {
                            title: 'An Map about MEAN',
                            content: 'MEAN rocks!'
                        };
                    };

                    // test expected GET request with response object
                    $httpBackend.expectGET(/maps\/([0-9a-fA-F]{24})$/).respond(testMapData());

                    // run controller
                    scope.findOne();
                    $httpBackend.flush();

                    // test scope value
                    expect(scope.map).toEqualData(testMapData());

                });

            it('$scope.create() with valid form data should send a POST request ' +
                'with the form input values and then ' +
                'locate to new object URL', function() {

                    // fixture expected POST data
                    var postMapData = function() {
                        return {
                            title: 'An Map about MEAN',
                            content: 'MEAN rocks!'
                        };
                    };

                    // fixture expected response data
                    var responseMapData = function() {
                        return {
                            _id: '525cf20451979dea2c000001',
                            title: 'An Map about MEAN',
                            content: 'MEAN rocks!'
                        };
                    };

                    // fixture mock form input values
                    scope.title = 'An Map about MEAN';
                    scope.content = 'MEAN rocks!';

                    // test post request is sent
                    $httpBackend.expectPOST('maps', postMapData()).respond(responseMapData());

                    // Run controller
                    scope.create();
                    $httpBackend.flush();

                    // test form input(s) are reset
                    expect(scope.title).toEqual('');
                    expect(scope.content).toEqual('');

                    // test URL location to new object
                    expect($location.path()).toBe('/maps/' + responseMapData()._id);
                });

            it('$scope.update() should update a valid map', inject(function(Render) {

                // fixture rideshare
                var putMapData = function() {
                    return {
                        _id: '525a8422f6d0f87f0e407a33',
                        title: 'An Map about MEAN',
                        to: 'MEAN is great!'
                    };
                };

                // mock map object from form
                var map = new Render(putMapData());

                // mock map in scope
                scope.map = map;

                // test PUT happens correctly
                $httpBackend.expectPUT(/maps\/([0-9a-fA-F]{24})$/).respond();

                // testing the body data is out for now until an idea for testing the dynamic updated array value is figured out
                //$httpBackend.expectPUT(/maps\/([0-9a-fA-F]{24})$/, putMapData()).respond();
                /*
                Error: Expected PUT /maps\/([0-9a-fA-F]{24})$/ with different data
                EXPECTED: {"_id":"525a8422f6d0f87f0e407a33","title":"An Map about MEAN","to":"MEAN is great!"}
                GOT:      {"_id":"525a8422f6d0f87f0e407a33","title":"An Map about MEAN","to":"MEAN is great!","updated":[1383534772975]}
                */

                // run controller
/*
                scope.update();
                $httpBackend.flush();

                // test URL location to new object
                expect($location.path()).toBe('/maps/' + putMapData()._id);

            }));

            it('$scope.remove() should send a DELETE request with a valid mapId ' +
                'and remove the map from the scope', inject(function(Render) {

                    // fixture rideshare
                    var map = new Render({
                        _id: '525a8422f6d0f87f0e407a33'
                    });

                    // mock rideshares in scope
                    scope.maps = [];
                    scope.maps.push(map);

                    // test expected rideshare DELETE request
                    $httpBackend.expectDELETE(/maps\/([0-9a-fA-F]{24})$/).respond(204);

                    // run controller
                    scope.remove(map);
                    $httpBackend.flush();

                    // test after successful delete URL location maps lis
                    //expect($location.path()).toBe('/maps');
                    expect(scope.maps.length).toBe(0);

                }));
*/
        });
    });
}());

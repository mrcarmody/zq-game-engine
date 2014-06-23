'use strict';

// there has to be a better way to bootstrap package models for mocha tests
require('../../../server/models/map');

/**
 * Module dependencies.
 */
var should = require('should'),
    mongoose = require('mongoose'),
    MapModel = mongoose.model('Map');

//Globals
var map;

//The tests
describe('<Unit Test>', function() {
    describe('Model Map:', function() {
        beforeEach(function(done) {
            map = new MapModel({
                name: 'Map Name'
            });

            done();
        });

        describe('Method Save', function() {
            it('should be able to save without problems', function(done) {
                return map.save(function(err) {
                    should.not.exist(err);
                    done();
                });
            });

            it('should have set the default map data', function(done) {
                // check defaults
                map.should.have.property('sizex',10);
                map.should.have.property('sizey',10);
                done();
            });

            it('should be able to show an error when try to save without name', function(done) {
                map.name = '';

                return map.save(function(err) {
                    should.exist(err);
                    done();
                });
            });
            
        });

        afterEach(function(done) {
            map.remove();
            done();
        });
    });
});

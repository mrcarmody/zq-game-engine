
'use strict';

// there has to be a better way to bootstrap package models for mocha tests
require('../../../server/models/gamestate');

/**
 * Module dependencies.
 */
var should = require('should'),
    mongoose = require('mongoose'),
    Gamestate = mongoose.model('Gamestate');

//Globals
var gamestate;

//The tests
describe('<Unit Test>', function() {
    describe('Model Gamestate:', function() {
        beforeEach(function(done) {
            gamestate = new Gamestate({
                name: 'Gamestate Name'
            });

            done();
        });

        describe('Method Save', function() {
            it('should be able to save without problems', function(done) {
                return gamestate.save(function(err) {
                    should.not.exist(err);
                    done();
                });
            });

            it('should have set the default gamestate data', function(done) {
                // check defaults
                gamestate.characters.should.be.an.instanceOf(Array);
                gamestate.commandQueue.should.be.an.instanceOf(String);
                gamestate.should.have.property('currentCommand',0);
                done();
            });

            it('should be able to show an error when try to save without map id', function(done) {
                gamestate.map = '';

                return gamestate.save(function(err) {
                    should.exist(err);
                    done();
                });
            });
        });

        afterEach(function(done) {
            gamestate.remove();
            done();
        });
    });
});

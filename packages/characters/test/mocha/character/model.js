'use strict';

// there has to be a better way to bootstrap package models for mocha tests
require('../../../server/models/character');

/**
 * Module dependencies.
 */
var should = require('should'),
    mongoose = require('mongoose'),
    Character = mongoose.model('Character');

//Globals
var character;

//The tests
describe('<Unit Test>', function() {
    describe('Model Character:', function() {
        beforeEach(function(done) {
            character = new Character({
                name: 'Character Name'
            });

            done();
        });

        describe('Method Save', function() {
            it('should be able to save without problems', function(done) {
                return character.save(function(err) {
                    should.not.exist(err);
                    done();
                });
            });

            it('should have set the default character data', function(done) {
                // check defaults
                character.should.have.property('hunger',0);
                character.should.have.property('health',100);
                character.should.have.property('age',0);
                character.should.have.property('strength',1);
                character.should.have.property('speed',1);
                done();
            });

            it('should show an error when try to save without name', function(done) {
                character.name = '';

                return character.save(function(err) {
                    should.exist(err);
                    done();
                });
            });

            it('should show an error when try to save a negative age', function(done) {
                character.age = -1;

                return character.save(function(err) {
                    should.exist(err);
                    done();
                });
            });

            it('should show an error when try to save an invalid health (too low)', function(done) {
                character.health = -1;

                return character.save(function(err) {
                    should.exist(err);
                    done();
                });
            });

            it('should show an error when try to save an invalid health (too high)', function(done) {
                character.health = 101;

                return character.save(function(err) {
                    should.exist(err);
                    done();
                });
            });
            
            it('should show an error when try to save an invalid speed (too low)', function(done) {
                character.speed =- 1;

                return character.save(function(err) {
                    should.exist(err);
                    done();
                });
            });

            it('should show an error when try to save an invalid speed (too high)', function(done) {
                character.speed = 101;

                return character.save(function(err) {
                    should.exist(err);
                    done();
                });
            });
            
            it('should show an error when try to save an invalid strength (too low)', function(done) {
                character.strength =- 1;

                return character.save(function(err) {
                    should.exist(err);
                    done();
                });
            });

            it('should show an error when try to save an invalid strength (too high)', function(done) {
                character.strength = 101;

                return character.save(function(err) {
                    should.exist(err);
                    done();
                });
            });
            
            it('should show an error when try to save an invalid hunger (too low)', function(done) {
                character.hunger =- 1;

                return character.save(function(err) {
                    should.exist(err);
                    done();
                });
            });

            it('should show an error when try to save an invalid hunger (too high)', function(done) {
                character.hunger = 101;

                return character.save(function(err) {
                    should.exist(err);
                    done();
                });
            });

            
            it('should show an error when try to save an invalid locationx (too low)', function(done) {
                character.locationx =- 1;

                return character.save(function(err) {
                    should.exist(err);
                    done();
                });
            });

            it('should show an error when try to save an invalid locationy (too low)', function(done) {
                character.locationy = -1;

                return character.save(function(err) {
                    should.exist(err);
                    done();
                });
            });

        });

        afterEach(function(done) {
            character.remove();
            done();
        });
    });
});

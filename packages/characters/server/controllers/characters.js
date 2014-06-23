'use strict';

/**
 * Module dependencies.
 */
var _ = require('lodash');

/**
 * Find character by id
 */
exports.character = function(Character){
    return function(req, res, next, id) {
        Character.load(id, function(err, character) {
            if (err) return next(err);
            if (!character) return next(new Error('Failed to load character ' + id));
            req.character = character;
            next();
        });
    };
};

/**
 * Create an character
 */
exports.create = function(Character){
    return function(req, res) {
        var character = new Character(req.body);
        character.user = req.user;

        character.save(function(err) {
            if (err) {
                res.jsonp(500,err);
            } else {
                res.jsonp(character);
            }
        });
    };
};

/**
 * Update an character
 */
exports.update = function(){
    return function(req, res) {
        var character = req.character;

        character = _.extend(character, req.body);
        character.save(function(err) {
            if (err) {
                res.jsonp(500,err);
            } else {
                res.jsonp(character);
            }
        });
    };
};

/**
 * Delete an character
 */
exports.destroy = function(){
    return function(req, res) {
        var character = req.character;
     
        character.remove(function(err) {
            if (err) {
                res.jsonp(500,err);
            } else {
                res.jsonp(character);
            }
        });
    };
};

/**
 * Show a character
 */
exports.show = function(req, res) {
    res.jsonp(req.character);
};

/**
 * List of Characters
 */
exports.all = function(Character){
    return function(req, res) {
        var criteria = {};
        Character.find(criteria).sort('-created').exec(function(err, characters) {
            if (err) {
                res.jsonp(500,err);
            } else {
                if (characters.length === 0){
                    res.jsonp(204,characters);
                }

                res.jsonp(characters);
            }
        });
    };
};

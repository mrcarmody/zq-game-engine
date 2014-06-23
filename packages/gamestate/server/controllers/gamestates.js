'use strict';

/**
 * Module dependencies.
 */
var _ = require('lodash');

/**
 * Find gamestate by id
 */
exports.gamestate = function(Gamestate){
    return function(req, res, next, id) {
        Gamestate.load(id, function(err, gamestate) {
            if (err) return next(err);
            if (!gamestate) return next(new Error('Failed to load gamestate ' + id));
            req.gamestate = gamestate;
            next();
        });
    };
};

/**
 * Create an gamestate
 */
exports.create = function(Gamestate){
    return function(req, res) {
        var gamestate = new Gamestate(req.body);
        gamestate.user = req.user;

        gamestate.save(function(err) {
            if (err) {
                res.jsonp(500,err);
            } else {
                res.jsonp(gamestate);
            }
        });
    };
};

/**
 * Update an gamestate
 */
exports.update = function(){
    return function(req, res) {
        var gamestate = req.gamestate;

        gamestate = _.extend(gamestate, req.body);
        gamestate.save(function(err) {
            if (err) {
                res.jsonp(500,err);
            } else {
                res.jsonp(gamestate);
            }
        });
    };
};

/**
 * Delete an gamestate
 */
exports.destroy = function(){
    return function(req, res) {
        var gamestate = req.gamestate;
     
        gamestate.remove(function(err) {
            if (err) {
                res.jsonp(500,err);
            } else {
                res.jsonp(gamestate);
            }
        });
    };
};

/**
 * Show a gamestate
 */
exports.show = function(req, res) {
    res.jsonp(req.gamestate);
};

/**
 * List of Gamestates
 */
exports.all = function(Gamestate){
    return function(req, res) {
        var criteria = {};
        Gamestate.find(criteria).sort('-created').exec(function(err, gamestates) {
            if (err) {
                res.jsonp(500,err);
            } else {
                if (gamestates.length === 0){
                    res.jsonp(204,gamestates);
                }

                res.jsonp(gamestates);
            }
        });
    };
};

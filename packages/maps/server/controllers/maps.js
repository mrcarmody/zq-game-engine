'use strict';

/**
 * Module dependencies.
 */
var _ = require('lodash');

/**
 * Find map by id
 */
exports.map = function(Map){
    return function(req, res, next, id) {
        Map.load(id, function(err, map) {
            if (err) return next(err);
            if (!map) return next(new Error('Failed to load map ' + id));
            req.map = map;
            next();
        });
    };
};

/**
 * Create an map
 */
exports.create = function(Map){
    return function(req, res) {
        var map = new Map(req.body);
        map.user = req.user;

        map.save(function(err) {
            if (err) {
                res.jsonp(500,err);
            } else {
                res.jsonp(map);
            }
        });
    };
};

/**
 * Update an map
 */
exports.update = function(){
    return function(req, res) {
        var map = req.map;

        map = _.extend(map, req.body);
        map.save(function(err) {
            if (err) {
                res.jsonp(500,err);
            } else {
                res.jsonp(map);
            }
        });
    };
};

/**
 * Delete an map
 */
exports.destroy = function(){
    return function(req, res) {
        var map = req.map;
     
        map.remove(function(err) {
            if (err) {
                res.jsonp(500,err);
            } else {
                res.jsonp(map);
            }
        });
    };
};

/**
 * Show a map
 */
exports.show = function(req, res) {
    res.jsonp(req.map);
};

/**
 * List of Maps
 */
exports.all = function(Map){
    return function(req, res) {
        var criteria = {};
        Map.find(criteria).sort('-created').exec(function(err, maps) {
            if (err) {
                res.jsonp(500,err);
            } else {
                if (maps.length === 0){
                    res.jsonp(204,maps);
                }

                res.jsonp(maps);
            }
        });
    };
};

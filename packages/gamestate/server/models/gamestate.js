'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;


/**
 * Gamestate Schema
 */
var GamestateSchema = new Schema({
    datetime: {
        type: Date,
        default: Date.now
    },
    map: {
        type: Schema.ObjectId,
        ref: 'Map'
    },
    characters: {
        type: Array,
        default: []
    },
    commandQueue: {
        type: String,
        default: ''
    },
    currentCommand: {
        type: Number,
        default: 0
    }
});

/**
 * Validations
 */
 // valid map?  is there a way to check that the map
 // value is actually a valid obejct id in the db?
GamestateSchema.path('map').validate(function(map) {
    return map;
}, 'map Id cannot be blank');

/**
 * Statics
 */
GamestateSchema.statics.load = function(id, cb) {
    this.findOne({
        _id: id
    }).exec(cb);
};

mongoose.model('Gamestate', GamestateSchema);

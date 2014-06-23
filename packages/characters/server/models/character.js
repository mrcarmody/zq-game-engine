'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;


/**
 * Character Schema
 */
var characterSchema = new Schema({
    age: {
        type: Number,
        default: 0
    },
    name: {
        type: String,
        default: '',
        trim: true
    },
    health: {
        type: Number,
        default: 100
    },
    speed: {
        type: Number,
        default: 1
    },
    strength: {
        type: Number,
        default: 1
    },
    hunger: {
        type: Number,
        default: 0
    },
    locationx: {
        type: Number,
        default: 0
    },
    locationy: {
        type: Number,
        default: 0
    }
});

/**
 * Validations
 */
characterSchema.path('name').validate(function(text) {
    return text.length;
}, 'name cannot be blank');

/**
 * Statics
 */
characterSchema.statics.load = function(id, cb) {
    this.findOne({
        _id: id
    }).exec(cb);
};

mongoose.model('Character', characterSchema);

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
 // - we must have a name
characterSchema.path('name').validate(function(name) {
    return name.length;
}, 'name cannot be blank');
// - the age should be a positive number (or zero)
characterSchema.path('age').validate(function(age) {
    return age >= 0;
}, 'age must be a positive number');
// - the health should be a number between 0 and 100
characterSchema.path('health').validate(function(health) {
    return health >= 0 && health <= 100;
}, 'health must be a number between 0 and 100');
// - the speed should be a number between 0 and 100
characterSchema.path('speed').validate(function(speed) {
    return speed >= 0 && speed <= 100;
}, 'speed must be a number between 0 and 100');
// - the strength should be a number between 0 and 100
characterSchema.path('strength').validate(function(strength) {
    return strength >= 0 && strength <= 100;
}, 'strength must be a number between 0 and 100');
// - the hunger should be a number between 0 and 100
characterSchema.path('hunger').validate(function(hunger) {
    return hunger >= 0 && hunger <= 100;
}, 'hunger must be a number between 0 and 100');
// - the locationx should be a positive number
characterSchema.path('locationx').validate(function(locationx) {
    return locationx >= 0;
}, 'locationx must be a positive number');
// - the locationy should be a positive number
characterSchema.path('locationy').validate(function(locationy) {
    return locationy >= 0;
}, 'locationy must be a positive number');

/**
 * Statics
 */
characterSchema.statics.load = function(id, cb) {
    this.findOne({
        _id: id
    }).exec(cb);
};

mongoose.model('Character', characterSchema);

'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;


/**
 * Character Schema
 */
var mapSchema = new Schema({
    sizex: {
        type: Number,
        default: 10
    },
    sizey: {
        type: Number,
        default: 10
    },
    name: {
        type: String,
        default: '',
        trim: true
    }
});

/**
 * Validations
 */
 // - check for a name
mapSchema.path('name').validate(function(text) {
    return text.length;
}, 'name cannot be blank');
 // - must have a positive sizex
mapSchema.path('sizex').validate(function(sizex) {
    return sizex >= 0;
}, 'sizex must be a positive integer');
 // - must have a positive sizey
mapSchema.path('sizey').validate(function(sizey) {
    return sizey >= 0;
}, 'sizey must be a positive integer');

/**
 * Statics
 */
mapSchema.statics.load = function(id, cb) {
    this.findOne({
        _id: id
    }).exec(cb);
};

mongoose.model('Map', mapSchema);

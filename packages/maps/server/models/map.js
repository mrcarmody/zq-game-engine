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
mapSchema.path('name').validate(function(text) {
    return text.length;
}, 'name cannot be blank');

/**
 * Statics
 */
mapSchema.statics.load = function(id, cb) {
    this.findOne({
        _id: id
    }).exec(cb);
};

mongoose.model('Map', mapSchema);

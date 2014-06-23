'use strict';

/*
 * Defining the Package
 */
var Module = require('meanio').Module;

var Gamestate = new Module('gamestate');

// DB data models for injecting into the routes
var mongoose = require('mongoose');
var gamestateModel = mongoose.model('Gamestate');

/*
 * All MEAN packages require registration
 * Dependency injection is used to define required modules
 */
Gamestate.register(function(app, auth, database) {

    //We enable routing. By default the Package Object is passed to the routes
    Gamestate.routes(app, auth, database, gamestateModel);

    //We are adding a link to the main menu for all authenticated users
    Gamestate.menus.add({
        title: 'Gamestates',
        link: 'gamestates',
        roles: ['authenticated'],
        menu: 'main'
    });

    /**
    //Uncomment to use. Requires meanio@0.3.7 or above
    // Save settings with callback
    // Use this for saving data from administration pages
    Gamestate.settings({
        'someSetting': 'some value'
    }, function(err, settings) {
        //you now have the settings object
    });

    // Another save settings example this time with no callback
    // This writes over the last settings.
    Gamestate.settings({
        'anotherSettings': 'some value'
    });

    // Get settings. Retrieves latest saved settigns
    Gamestate.settings(function(err, settings) {
        //you now have the settings object
    });
    */

    return Gamestate;
});

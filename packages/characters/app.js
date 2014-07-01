'use strict';
 
/*
 * Defining the Package
 */

var Module = require('meanio').Module;

var Characters = new Module('Characters');

// DB data models for injecting into the routes
var mongoose = require('mongoose');
var Character = mongoose.model('Character');

/*
 * All MEAN packages require registration
 * Dependency injection is used to define required modules
 */

Characters.register(function(app, auth, database) {

    //We enable routing. By default the Package Object is passed to the routes
    Characters.routes(app, auth, database, Character);

    //We are adding a link to the main menu for all authenticated users
    // - Characters
    Characters.menus.add({
      title: 'Characters',
      link: 'characters',
      roles: ['authenticated'],
      menu: 'main'
    });

    return Characters;
});
'use strict';

 
/*
 * Defining the Package
 */

var Module = require('meanio').Module;

var Maps = new Module('Maps');

// DB data models for injecting into the routes
var mongoose = require('mongoose');
var mapModel = mongoose.model('Map');

/*
 * All MEAN packages require registration
 * Dependency injection is used to define required modules
 */

Maps.register(function(app, auth, database) {

    //We enable routing. By default the Package Object is passed to the routes
    Maps.routes(app, auth, database, mapModel);

    //We are adding a link to the main menu for all authenticated users
    Maps.menus.add({
      title: 'Maps',
      link: 'maps',
      roles: ['authenticated'],
      menu: 'main'
    });

    // include the css
    Maps.aggregateAsset('css','maps.css');

    return Maps;
});
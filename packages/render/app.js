'use strict';

/*
 * Defining the Package
 */
var Module = require('meanio').Module;

var Render = new Module('render');

/*
 * All MEAN packages require registration
 * Dependency injection is used to define required modules
 */
Render.register(function(app, auth, database) {

    //We enable routing. By default the Package Object is passed to the routes
    Render.routes(app, auth, database);

    //We are adding a link to the main menu for all authenticated users
    Render.menus.add({
        title: 'Render',
        link: 'render',
        roles: ['authenticated'],
        menu: 'main'
    });

    return Render;
});

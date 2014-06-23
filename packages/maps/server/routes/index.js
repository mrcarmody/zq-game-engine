'use strict';

var maps = require('../controllers/maps');

// The Package is past automatically as first parameter
module.exports = function(Maps, app, auth, database, mapModel) {

    // maps
    app.get('/maps',auth.requiresLogin, maps.all(mapModel));
    app.post('/maps', auth.requiresLogin, maps.create(mapModel));
    app.get('/maps/:mapId', auth.requiresLogin, maps.show);
    app.put('/maps/:mapId', auth.requiresLogin, maps.update());
    app.delete('/maps/:mapId', auth.requiresLogin, maps.destroy());

    var mapLoad = maps.map(mapModel);
    // Finish with setting up the mapId param
    app.param('mapId', mapLoad);

};
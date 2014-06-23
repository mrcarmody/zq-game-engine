'use strict';

var gamestates = require('../controllers/gamestates');

// The Package is past automatically as first parameter
module.exports = function(Gamestate, app, auth, database, gamestateModel) {

    // gamestates
    app.get('/gamestates',auth.requiresLogin, gamestates.all(gamestateModel));
    app.post('/gamestates', auth.requiresLogin, gamestates.create(gamestateModel));
    app.get('/gamestates/:gamestateId', auth.requiresLogin, gamestates.show);
    app.put('/gamestates/:gamestateId', auth.requiresLogin, gamestates.update());
    app.delete('/gamestates/:gamestateId', auth.requiresLogin, gamestates.destroy());

    var gamestateLoad = gamestates.gamestate(gamestateModel);
    // Finish with setting up the gamestateId param
    app.param('gamestateId', gamestateLoad);

};

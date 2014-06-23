'use strict';

var characters = require('../controllers/characters');

// The Package is past automatically as first parameter
module.exports = function(Characters, app, auth, database, characterModel) {

    // characters
    app.get('/characters',auth.requiresLogin, characters.all(characterModel));
    app.post('/characters', auth.requiresLogin, characters.create(characterModel));
    app.get('/characters/:characterId', auth.requiresLogin, characters.show);
    app.put('/characters/:characterId', auth.requiresLogin, characters.update());
    app.delete('/characters/:characterId', auth.requiresLogin, characters.destroy());

    var characterLoad = characters.character(characterModel);
    // Finish with setting up the characterId param
    app.param('characterId', characterLoad);

};
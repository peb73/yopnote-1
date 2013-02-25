// ----------------------------------
// Namespace pour structurer l'application
// ----------------------------------

var app = {
    collections: {},
    models: {},
    helpers: {},
    views: {}
};

// ----------------------------------
// Constantes de l'application
// ----------------------------------

// titre de l'application pour la balise <title>
app.APP_NAME = 'Yopnote';

// url du contenu statique, racine de la page html
app.BASE_URL = '/yopnote13/';

// url du service rest
app.REST_SYMFONY_BASE_URL = '/yopnote13/api';

// ----------------------------------
// Lancement (main)
// ----------------------------------

$(function()
{
    console.log(":: Starting '" + app.APP_NAME + "'");
    app.title(app.APP_NAME);

    // Prise en compte des routes
    app.Route = new app.Router();

    // Gestion de l'historique
    Backbone.history.start({root: app.BASE_URL});
});

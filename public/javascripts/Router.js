app.Router = Backbone.Router.extend();

// ----------------------------------
// Init and config
// ----------------------------------

app.Router.prototype.initialize = function()
{
    console.log(":: init app.Router");
    
    new app.views.Default({
        el: $('body')
    });

    (new app.collections.Folders()).fetch({
        success: function(collection) {
            new app.views.PublicFolderList({
                el: $('#row-2'),
                collection: collection
            });
        },
        error: function(m, e) {
            //new app.views.Modal(e);
            alert('erreur folders');
        }
    });
};

app.Router.prototype.routes = {
    'folder/:hash' :         'showNotesFromAFolder'
};

// ----------------------------------
// Routes
// ----------------------------------

app.Router.prototype.default = function()
{
    $('#row-1 input').focus();   
}

app.Router.prototype.folder = null;

app.Router.prototype.showNotesFromAFolder = function(hash)
{
    if (this.folder)
        this.folder.undelegateEvents();

    (new app.models.Folder({'id': hash})).fetch({
        success: function(model) {
            app.Router.prototype.folder = new app.views.Folder({
                el: $('#row-3'),
                model: model
            });
        },
        error: function(m, e) {
            //new app.views.Modal(e);
    	    alert('erreur folder');
        }
    });
};


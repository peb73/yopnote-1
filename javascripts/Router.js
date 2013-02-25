app.Router = Backbone.Router.extend();

// ----------------------------------
// Init and config
// ----------------------------------

app.Router.prototype.initialize = function()
{
    console.log(":: init app.Router");
};

app.Router.prototype.routes = {
    '' :                  'default',
    'notes/:hash' :         'showNotesFromAFolder'
};

// ----------------------------------
// Routes
// ----------------------------------

app.Router.prototype.default = function()
{
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
            new app.views.Modal(e);
        }
    });
};

app.Router.prototype.folders = null

app.Router.prototype.showFolders = function(search)
{
    var that = this;
    if (this.folders)
        this.folders = undelegateEvents();

    (new app.collections.Folders()).fetch({
        success: function(collection) {
            this.folders = new app.views.PublicFolderList({
                el: $('#row-2'),
                collection: collection
            });
        },
        error: function(m, e) {
            new app.views.Modal(e);
        }
    });
};


app.Router.prototype.notes = null;

app.Router.prototype.showNotesFromAFolder = function(hash)
{
    var that = this;
    if (this.notes)
        this.notes = undelegateEvents();

    (new app.collections.Notes({}, {id: hash})).fetch({
        success: function(collection) {
            this.notes = new app.views.Folder({
                el: $('#row-3'),
                collection: collection
            });
        },
        error: function(m, e) {
            new app.views.Modal(e);
        }
    });
};


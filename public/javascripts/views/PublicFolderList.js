app.views.PublicFolderList = Backbone.View.extend();

// ----------------------------------
// Init and events
// ----------------------------------

app.views.PublicFolderList.prototype.initialize = function(options)
{
    console.log(":: init app.views.PublicFolderList on " + this.$el.selector);

    this.render();

    $('#row-2 li').hover(function() {
        $('#row-2-detail').addClass('show');
    },function() {
        $('#row-2-detail').removeClass('show');
    });
};

app.views.PublicFolderList.prototype.events = {
	'click #row-2 li': 'folderClicked'
};

// ----------------------------------
// Actions
// ----------------------------------

app.views.PublicFolderList.prototype.render = function()
{
    console.log("plop")
    console.log("plop",this.collection.toArray());
	this.$el.html('template_PublicFolderList', {collection: this.collection.toArray()});
    
    return this;
};

app.views.PublicFolderList.prototype.folderClicked = function(e)
{
    // TODO
    //var hash = $(e.currentTarget) ...
    //app.Route.navigate('folder/' + hash, {trigger: true});
};
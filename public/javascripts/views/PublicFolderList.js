app.views.PublicFolderList = Backbone.View.extend();

// ----------------------------------
// Init and events
// ----------------------------------

app.views.PublicFolderList.prototype.initialize = function(options)
{
    console.log(":: init app.views.PublicFolderList on " + this.$el.selector);

    this.render();

    /*$('#row-2 li').hover(function() {
        $('#row-2-detail').addClass('show');
    },function() {
        $('#row-2-detail').removeClass('show');
    });*/

    $(document).bind('keydown', 'down',function() {
        console.log('down');
        $('#row-2 li.selected').next('li').addClass('selected').siblings().removeClass('selected');
    });

    $(document).bind('keydown', 'up',function() {
        console.log('up');
        $('#row-2 li.selected').prev('li').addClass('selected').siblings().removeClass('selected');
    });

    $(document).bind('keydown', 'return',function() {
        console.log('return');
        $('#row-2 li.selected').click();
    });

};

app.views.PublicFolderList.prototype.events = {
    'click li' : 'folderClicked'
};

// ----------------------------------
// Actions
// ----------------------------------

app.views.PublicFolderList.prototype.render = function()
{
    this.$el.html('template_PublicFolderList', {
	    collection: this.options.collection.toJSON()
    });
    
    return this;
};

app.views.PublicFolderList.prototype.folderClicked = function(e)
{
    $('#row-2 li').removeClass('selected');
    $(e.currentTarget).addClass('selected');
    var hash = $(e.currentTarget).attr('data-hash');
    var name = $(e.currentTarget).attr('data-name');
    app.Route.navigate('folder/' + hash, {trigger: true});
};



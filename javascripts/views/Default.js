app.views.Default = Backbone.View.extend();

// ----------------------------------
// Init and events
// ----------------------------------

app.views.Default.prototype.initialize = function(options)
{
    console.log(":: init app.views.Default on " + this.$el.selector);

    this.render();

    $('#row-1 input').focus();

    /*$('#row-1 input').keyup(function() {
        $('#row-2 ul').find('li').show();
        if (this.value != '') {
            $('#row-2 ul').find('li:not(:contains(' + this.value + '))').hide();
        }
    });*/
};

app.views.Default.prototype.events = {
	
};

// ----------------------------------
// Actions
// ----------------------------------

app.views.Default.prototype.render = function()
{
	this.$el.html('template_Default', {});
    
    return this;
};
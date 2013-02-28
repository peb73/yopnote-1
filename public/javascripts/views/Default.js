app.views.Default = Backbone.View.extend();

// ----------------------------------
// Init and events
// ----------------------------------

app.views.Default.prototype.initialize = function(options)
{
    console.log(":: init app.views.Default on " + this.$el.selector);

    this.render();

    $('#row-1 input').keyup(function() {
        $('#row-2 ul').find('li').show();
        if (this.value != '') {
            $('#row-2 ul').find('li:not(:contains(' + this.value + '))').hide();
        }
    });

    $('#row-1 input').bind('keydown', 'down',function() {
        $('#row-2 li').removeClass('selected');
        $('#row-2 li:first-child').addClass('selected');
    });

    $('#row-1 input').bind('keydown', 'return',function() {
        console.log('enter input');
        app.views.Default.prototype.createANewFolder();
    });
};

app.views.Default.prototype.events = {
    //'click #create': 'createANewFolder'
};

// ----------------------------------
// Actions
// ----------------------------------

app.views.Default.prototype.render = function()
{
    this.$el.html('template_Default', {});
    
    return this;
};

app.views.Default.prototype.createANewFolder = function(e)
{
    var new_folder_name = $('#row-1 input').val();

    if (new_folder_name == '') return; 

    var nf = new app.models.Folder({'name': new_folder_name});
    nf.save({}, {
	    wait: true,
	    success: function(model, response, options) {
	        // Ajouter la note
		// Mettre à jour la collection
                console.log(response);
            },
	    error: function(model, xhr, options) {
	        alert('Error during create a new folder!');
	    }
	});
};



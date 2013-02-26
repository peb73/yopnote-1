app.views.Folder = Backbone.View.extend();

// ----------------------------------
// Init and events
// ----------------------------------

app.views.Folder.prototype.initialize = function(options)
{
    console.log(":: init app.views.Folder on " + this.$el.selector);

    this.render();

    $('#row-3 input').focus();
};

app.views.Folder.prototype.events = {
	
};

// ----------------------------------
// Actions
// ----------------------------------

app.views.Folder.prototype.render = function()
{
	this.$el.html('template_Folder', {});
    
    return this;
};

app.views.Folder.prototype.sendANewNote = function(e)
{
	e.preventDefault();

	var new_note_content = $('#row-3 input').val();

	var nn = new app.models.Note({'message': new_note_content});
	nn.save({}, {
		wait: true,
		success: function(model, reponse, options) {
			// Ajouter la note
			// Mettre à jour la collection
		},
		error: function(model, xhr, options) {
			alert('Error during add of this new note!');
		}
	})
};
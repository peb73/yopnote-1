app.views.Folder = Backbone.View.extend();

// ----------------------------------
// Init and events
// ----------------------------------

app.views.Folder.prototype.initialize = function(options)
{
    console.log(":: init app.views.Folder on " + this.$el.selector);

    this.render();

    $('#row-3 input').focus();

    $('#row-3 input').bind('keydown', 'return',function() {
        this.sendANewNote();
    });

    app.views.Folder.prototype.renderNotes();
};

app.views.Folder.prototype.events = {
    'click #add': 'sendANewNote'	
};

// ----------------------------------
// Actions
// ----------------------------------

app.views.Folder.prototype.render = function()
{
    console.log(this.options);

    this.$el.html('template_Folder', {
        collection: this.options.model.toJSON()
    });
    
    return this;
};

app.views.Folder.prototype.notes = null;

app.views.Folder.prototype.renderNotes = function()
{
    (new app.collections.Notes({}, {'hash': this.options.model.get('hash')})).fetch({
        success: function(collection) {
            $('#row-3 ul').html('template_Notes', {
                collection: collection.toJSON()
            });

        },
        error: function(m, e) {
            //new app.views.Modal(e);
            alert('erreur notes');
        }
    });

    return this;
};

app.views.Folder.prototype.sendANewNote = function(e)
{
	var new_note_content = $('#row-3 input').val();

	if (new_note_content == '') return;

	var nn = new app.models.Note({
        'message': new_note_content
    },{
        'hash': this.options.model.get('hash')
    });
	nn.save({}, {
		wait: true,
		success: function(model, response, options) {
			// Ajouter la note
			// Miettre à jour la collection
            console.log(response);
		},
		error: function(model, xhr, options) {
			alert('Error during add of this new note!');
		}
	})
};

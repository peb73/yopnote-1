app.collections.Notes = Backbone.Collection.extend({
    model: app.models.Note,
    url: function() {
        return app.REST_BASE_URL + '/folder/' + this.hash + '/note';
    }
});

// ----------------------------------
// Init and defaults
// ----------------------------------

app.collections.Notes.prototype.initialize = function(models, options)
{
    this.hash = options.hash;
};

// ----------------------------------
// Override
// ----------------------------------

/*app.collections.Notes.prototype.comparator = function(m)
{
	return m.id;
};

app.collections.Notes.prototype.parse = function(data)
{
	return data.result;
};*/

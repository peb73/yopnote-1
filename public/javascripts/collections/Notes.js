app.collections.Notes = Backbone.Collection.extend({
	model: app.models.Note,
	url: app.REST_BASE_URL + '/note'
});

// ----------------------------------
// Init and defaults
// ----------------------------------

app.collections.Notes.prototype.initialize = function(models, options)
{
    
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
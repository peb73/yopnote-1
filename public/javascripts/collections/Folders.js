app.collections.Folders = Backbone.Collection.extend({
    model: app.models.Folder,
    url: app.REST_BASE_URL + '/folder/'
});

// ----------------------------------
// Init and defaults
// ----------------------------------

app.collections.Folders.prototype.initialize = function(models, options)
{

};

// ----------------------------------
// Override
// ----------------------------------

/*app.collections.Folders.prototype.comparator = function(m)
{
	return m.id;
};

app.collections.Folders.prototype.parse = function(data)
{
	return data.result;
};*/

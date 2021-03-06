app.models.Note = Backbone.Model.extend({
	url: function() {
        return app.REST_BASE_URL + '/folder/' + this.hash + '/note';
    }
});

// ----------------------------------
// Init and defaults
// ----------------------------------

app.models.Note.prototype.initialize = function(attributes, options)
{
    this.hash = options.hash;
};

// ----------------------------------
// Override
// ----------------------------------

/*app.models.Note.prototype.validate = function(attributes)
{
	var error = this.validateAttribute(attributes);
	if (error) return error;

	if (attributes.attribute_beta < 5)
		return new Error('Too low');

	if (attributes.attribute_beta > 10)
		return new Error('Too high');
};

app.models.Note.prototype.url = function()
{
	return app.REST_BASE_URL + '/abc/123/' + this.id;
};*/

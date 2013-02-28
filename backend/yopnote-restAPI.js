var express = require('express')
	, m = require('./middleware')
	, folder = require('./routes/folder')
	, note = require('./routes/note')
	, CONFIG = require('config').YopnoteAPI;

// Instanciated module

module.exports = function () {
	var app = express();
	
	app.configure(function () {
		app.param('id', m.checkIdParameter);
		app.use(m.checkRequestHeaders);
		app.use(express.bodyParser());
		app.use(m.handleBodyParserError);
		app.use(express.methodOverride());
		app.use(app.router);
	});

	app.configure('development', function () {
		app.use(m.errorHandler({"stack": true}));
	});

	app.configure('production', function () {
		app.use(m.errorHandler({}));
	});

	//Routing
	app.get('/folder', folder.list);
	app.get('/folder/:hash',function(req, res,next){
	  var hash = req.params.hash;
	  folder.get(req,res,hash);
	});
	app.put('/folder/:id',function(req, res, next){
	  var id = req.params.id;
	  folder.put(req,res,id);
	});
	app.post('/folder',folder.post);

	app.get('/folder/:hash/note', function(req, res, next){
	  var hash = req.params.hash;
	  note.list(req,res,hash);
	});
	app.post('/folder/:hash/note', function(req, res, next){
	  var hash = req.params.hash;
	  note.post(req,res,hash);
	});

	return app;
}

 

// Expose dependencies to avoid duplicate modules
exports.express = express;
exports.middlewares = m;

 
// Start when main module
if (module.parent == null) module.exports().listen(CONFIG.appPort);

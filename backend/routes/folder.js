
var MongoClient = require('mongodb').MongoClient,
	Server = require('mongodb').Server,
	CONFIG = require('config').YopnoteAPI;

var collectionName = "folder";
var mongoclient = new MongoClient(new Server(CONFIG.dbHost, CONFIG.dbPort, {native_parser: true}));

/**
 * Folder controller
 */
exports.list = function(req, res){

	mongoclient.open(function(err, mongoclient){
		
		if(err!=null){
			res.respond(err,500);
			mongoclient.close();
			return;
		}

		var dataBase = mongoclient.db(CONFIG.dbName);
		dataBase.collection(collectionName).find().toArray(function(err, docs){
		
			if(err!=null){
				res.respond(err,500);
				mongoclient.close();
				return;
			}

			res.json(docs);
			mongoclient.close();
		});
	});

};
exports.get = function(req, res, hash){

	mongoclient.open(function(err, mongoclient){

		if(err!=null){
			res.respond(err,500);
			mongoclient.close();
			return;
		}

		var dataBase = mongoclient.db(CONFIG.dbName);
		dataBase.collection(collectionName).findOne({hash: hash},function(err,doc){
		
			//Error
			if(err!=null){
				res.respond(err,500);
				mongoclient.close();
				return;
			}

			//No result
			if(doc==null){
				res.respond("No folder found",404);
				mongoclient.close();
				return;x
			}

			//return result
			res.json(doc);
			mongoclient.close();
		});

	});
	
};
exports.put = function(req, res, id){
	res.respond("Not Yet Implemented",501);
};
exports.post = function(req, res){

	if(req.body.name == null || req.body.name == ""){
		res.respond("name param could not be null",412);
		return;
	}

	var private = false;
	if(req.body.private != null && (req.body.private == true || req.body.private == true))
		private = true;

	var name = req.body.name;

	//TODO calcul du hash

	mongoclient.open(function(err, mongoclient){
		if(err!=null){
			res.respond(err,500);
			mongoclient.close();
			return;
		}

		var dataBase = mongoclient.db(CONFIG.dbName);
		//TODO post
	});
	//res.respond("Not Yet Implemented",501);
};
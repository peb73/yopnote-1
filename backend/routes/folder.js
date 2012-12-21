
var MongoClient = require('mongodb').MongoClient,
	Server = require('mongodb').Server,
	db = require('../db');

var collectionName = "folder";
var mongoclient = new MongoClient(new Server(db.serverUrl, db.port, {native_parser: true}));

/**
 * Folder controller
 */
exports.list = function(req, res){

	console.log(process.env);
	mongoclient.open(function(err, mongoclient){
		
		if(err!=null){
			res.respond(err,500);
			return;
		}

		var dataBase = mongoclient.db(db.dbName);
		dataBase.collection(collectionName).find().toArray(function(err, docs){
		
			if(err!=null){
				res.respond(err,500);
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
			return;
		}

		var dataBase = mongoclient.db(db.dbName);
		dataBase.collection(collectionName).findOne({hash: hash},function(err,doc){
		
			if(err!=null){
				res.respond(err,500);
				return;
			}

			res.json(doc);
			mongoclient.close();
		});

	});
	
};
exports.put = function(req, res, id){
	res.respond("Not Yet Implemented",501);
};
exports.post = function(req, res){
	res.respond("Not Yet Implemented",501);
};
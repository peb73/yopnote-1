var MongoClient = require('mongodb').MongoClient,
	Server 		= require('mongodb').Server,
	CONFIG 		= require('config').YopnoteAPI,
	utils 		= require('../util');

var collectionName = "note";
var mongoclient = new MongoClient(new Server(CONFIG.dbHost, CONFIG.dbPort, {native_parser: true}));

/**
 * Note controller
 */
exports.list = function(req, res, folderHash){

	mongoclient.open(function(err, mongoclient){
		if(err!=null){
			res.respond(err,500);
			if(mongoclient!=null)
				mongoclient.close();
			return;
		}

		var dataBase = mongoclient.db(CONFIG.dbName);
		dataBase.collection(collectionName).find({
			"folder_hash" : folderHash
		},{
			"sort":[["date","desc"]]
		}).toArray(function(err,docs){

			if(err!=null){
				res.respond(err,500);
				if(mongoclient!=null)
					mongoclient.close();
				return;
			}

			res.json(docs);
			mongoclient.close();

		});
	});

};

exports.post = function(req, res, folderHash){

	//test folderHash

	res.respond("Not Yet Implemented",501);
};
var MongoClient = require('mongodb').MongoClient,
	Server 		= require('mongodb').Server,
	CONFIG 		= require('config').YopnoteAPI,
	utils 		= require('../util');

var collectionName = "note";

var openMongoclient = function(action){

        var mongoclient = new MongoClient(new Server(CONFIG.dbHost, CONFIG.dbPort, {native_parser: true}));
        mongoclient.open(function(err, thisMongoclient){
                if(err!=null){
                        res.respond(err,500);
                        if (thisMongoclient!=null)
                                thisMongoclient.close();
                        return;
                }

                //the action should close the connection
                action(thisMongoclient);
        });
}

/**
 * Remove _id field from note
 */
var filtreResult = function(input){
	if(input.toString() == '[object Object]'){
		delete input._id;
	}else{
		for(var i=0; i<input.length;i++){ //Array
			filtreResult(input[i]);
		}
	}
	//console.log(input.toString());
	return input;
}

/**
 * Note controller
 */

 /**
  * List note from folderHash
  */
exports.list = function(req, res, folderHash){

	openMongoclient(function(mongoclient){
		var dataBase = mongoclient.db(CONFIG.dbName);
		dataBase.collection(collectionName).find({
			folder_hash : folderHash
		},{
			"sort":[["date","desc"]]
		}).toArray(function(err,docs){

			if(err!=null){
				res.respond(err,500);
				if(mongoclient!=null)
					mongoclient.close();
				return;
			}

			res.json(filtreResult(docs));
			mongoclient.close();

		});
	});

};

/**
 * post note
 * rest param :
 * - message
 */
exports.post = function(req, res, folderHash){

	if(req.body.message == null || req.body.message == ""){
		res.respond("message param could not be null",412);
		return;
	}

	openMongoclient(function(mongoclient){
		var dataBase = mongoclient.db(CONFIG.dbName);
		dataBase.collection(collectionName).insert({
			message 	: req.body.message,
			folder_hash : folderHash,
			date 		: new Date()
		},function(err,result){
			if(err!=null){
				res.respond(err,500);
				mongoclient.close();
				return;
			}

			res.json(filtreResult(result));
			mongoclient.close();
		});
	});
	//TODO test folderHash

	//res.respond("Not Yet Implemented",501);
};

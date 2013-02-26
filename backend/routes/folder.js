
var MongoClient = require('mongodb').MongoClient,
	Server 		= require('mongodb').Server,
	CONFIG 		= require('config').YopnoteAPI,
	utils 		= require('../util');

var collectionName = "folder";
var mongoclient = new MongoClient(new Server(CONFIG.dbHost, CONFIG.dbPort, {native_parser: true}));

/**
 * Insertion of folder
 */
var insertFolder = function(res,mongoclient, dataBase, name, private,hash){
	dataBase.collection(collectionName).insert({
			name 	: name,
			private : private
		},function(err,result){
			if(err!=null){
				res.respond(err,500);
				mongoclient.close();
				return;
		}

		var tmpId = result._id;
		if(hash==null)
			hash = utils.getHash(tmpId);

		//Test to know id the hash has not been ever use.
		dataBase.collection(collectionName).findOne({hash: hash},function(err,doc){

			//Error
			if(err!=null){
				res.respond(err,500);
				mongoclient.close();
				return;
			}

			//No result
			if(doc==null){

				//keep this id
				dataBase.collection(collectionName).update(
					result[0],
					{
						$set:{hash:hash}
					},
					function(err,count){

						if(err!=null){
							res.respond(err,500);
							mongoclient.close();
							return;
						}

						result[0].hash = hash;
						res.json(filtreResult(result[0]));

						mongoclient.close();
					}
				);
			}else{
				//change the id

				//clean old id
				dataBase.collection(collectionName).remove(
					{
						_id: tmpId
					},
					function(result,err){

						if(err!=null){
							res.respond(err,500);
							mongoclient.close();
							return;
						}

						insertFolder(res,mongoclient, dataBase, name, private,hash);
					}
				);
			}
		});
	});
}

/**
 * Remove _id field from folder
 */
var filtreResult = function(input){
	if(input.toString() == '[object Object]'){
		delete input._id;
	}else{
		for(var i=0; i<input.length;i++){ //Array
			filtreResult(input[i]);
		}
	}
	return input;
}

/**
 * Folder controller
 */

/**
 * List folder
 */
exports.list = function(req, res){

	mongoclient.open(function(err, mongoclient){
		
		if(err!=null){
			res.respond(err,500);
			if (mongoclient!=null)
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

			res.json(filtreResult(docs));
			mongoclient.close();
		});
	});
};
/**
 * Get folder
 */
exports.get = function(req, res, hash){

	mongoclient.open(function(err, mongoclient){

		if(err!=null){
			res.respond(err,500);
			if (mongoclient!=null)
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
				//create folder with hash
				var name = hash;
				var private = false;
				insertFolder(res,mongoclient, dataBase, name, private,hash);

			}else{
				//return result
				res.json(filtreResult(doc));
				mongoclient.close();
			}
		});

	});
	
};
/**
 * Update folder
 */
exports.put = function(req, res, id){
	res.respond("Not Yet Implemented",501);

	//Control hash param
	/*
	if(req.body.hash == null || req.body.hash == ""){
		res.respond("hash param could not be null",412);
		return;
	}
	var hash = req.body.hash;
	*/

	//Control name param
	if(req.body.name == null || req.body.name == ""){
		res.respond("hash param could not be null",412);
		return;
	}
	var name = req.body.name;

	mogoclient.open(function(err,mongoclient){
		if(err!=null){
			res.respond(err,500);
			if (mongoclient!=null)
				mongoclient.close();
			return;
		}

		var dataBase = mongoclient.db(CONFIG.dbName);
		dataBase.collection(collectionName).update(
			{_id: id},
			{
				$set:{
					//hash: hash,
					name: name
				}
			},
			function(err,count){
				if(err!=null){
					res.respond(err,500);
					mongoclient.clode();
					return;
				}

				//return result
				res.json(filtreResult(doc));
				mongoclient.close();
			});

	});

};
/**
 * Post folder
 */
exports.post = function(req, res){

	if(req.body.name == null || req.body.name == ""){
		res.respond("name param could not be null",412);
		return;
	}

	var private = false;
	if(req.body.private != null && (req.body.private == true || req.body.private == true))
		private = true;

	var name = req.body.name;

	//TODO id incrementation
	mongoclient.open(function(err, mongoclient){
		if(err!=null){
			res.respond(err,500);
			if (mongoclient!=null)
				mongoclient.close();
			return;
		}

		var dataBase = mongoclient.db(CONFIG.dbName);
		var hash = null;

		insertFolder(res,mongoclient, dataBase, name, private,hash);

	});
};
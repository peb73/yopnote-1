/**
 * Permet de caculer le hash d'un id
 */
function getHash(id){
	var charString = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ-";
	var charLength = charString.length;
	var reste = id;
	reste = reste%charLength;
	if(id/charLength>1){
		return charString[reste]+getHash((id-reste)/charLength);
	}else{
		return charString[reste];
	}
};

function getNextSequence(db,name,callback) {
	console.log(name);
   	db.collection("counters").findAndModify(
          { _id: name },
          {},
          { $inc: { seq: 1 } },
          {new: true},
            function(err, ret){
            	callback(ret.seq);
//            	return ret.seq;
            }
   );

   
}

exports.getHash = getHash;
exports.getNextSequence = getNextSequence;
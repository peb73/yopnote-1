/**
 * Permet de caculer le hash d'un id
 */
function getHash(id){
	var charString = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ-";
	var charLength = charString.length;

	var reste = id%charLength;

	if(id/charLength>1){
		return charString[reste]+getHash((id-reste)/charLength);
	}else{
		return charString[reste];
	}
};

exports.getHash = getHash;
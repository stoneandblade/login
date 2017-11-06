'use strict';


let bcrypt =	require( 'bcrypt-nodejs' );



class Encryptor {
	
	
	static generateHash( password ){
		
		return bcrypt.hashSync( password, bcrypt.genSaltSync() );
		
	}

	
	static compareHash( encryptedPassword, userInput ){
		
		return bcrypt.compareSync( userInput, encryptedPassword );
		
	}
	
}


module.exports = Encryptor;

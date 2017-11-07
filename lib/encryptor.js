'use strict';


let bcrypt =	require( 'bcrypt-nodejs' );



class Encryptor {
	
	
	static generateHash( password ){
		
		if( !password || typeof password !== 'string' ){
			
			throw new Error( 'Invalid parameter "password"' );
			
		}
		
		return bcrypt.hashSync( password, bcrypt.genSaltSync() );
		
	}

	
	static compareHash( encryptedPassword, userInput ){
		
		if( !encryptedPassword || typeof encryptedPassword !== 'string' ){
			
			throw new Error( 'Invalid parameter "encryptedPassword"' );
		
		} else if( typeof userInput !== 'string' ){
			
			userInput =	String( userInput );
		
		}
		
		
		return bcrypt.compareSync( userInput || '', encryptedPassword );
		
	}
	
}


module.exports = Encryptor;

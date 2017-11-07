'use strict';


let mongoose =	require( 'mongoose' );
let encryptor =	require( 'encryptor' );


class LoginSchema {
	
	
	constructor( options ) {
		
		let schema =	new Mongoose.Schema({
			username :	{ 
				type : 		String, 
				trim : 		true,
				index : 	{ unique : true },
				validate :	options.validateUsername || null,
				required :	[ true, 'Username is required for Login' ]
			},
			password :	{
				type : 		String,
				validate :	options.validatePassword || null,
				required :	[ true, 'Password is required for Login' ]
			}
		});

		
		// add helper methods
		schema.methods.generateHash =	options.hashGenerator || encryptor.generateHash;
		schema.methods.comparator =		options.passwordComparator || encryptor.compareHash;


		// add event handlers
		schema.pre( 'save',		options.save || this.preSaveHandler );
		schema.pre( 'remove',	options.remove || null );
		
		
		return mongoose.model( 'Login', schema );
		
	}


	preSaveHandler( next ){

		if( this.isNew ){

			// hash password
			this.password =		this.generateHash( this.password );

		}

		next();

	}
	
}


module.exports = LoginSchema;
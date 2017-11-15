'use strict';


let mongoose =	require( 'mongoose' );
let encryptor =	require( './encryptor' );


class LoginSchema {


	constructor( options ) {

		// default options
		options =	options || {};

		let usernameSchema = {
			type : 		String,
			trim : 		true,
			index : 	{ unique : true },
			required :	[ true, 'Username is required for Login' ]
		};

		if( typeof options.validateUsername === 'function' ){
			usernameSchema.validate =	options.validateUsername;
		}


		let passwordSchema = {
			type : 		String,
			required :	[ true, 'Password is required for Login' ]
		};

		if( typeof options.validatePassword === 'function' ){
			passwordSchema.validate =	options.validatePassword;
		}


		let schema =	new mongoose.Schema( {
			username :	usernameSchema,
			password :	passwordSchema
		} );


		// add helper methods
		schema.methods.generateHash =	options.hashGenerator || encryptor.generateHash;
		schema.methods.comparator =		options.passwordComparator || encryptor.compareHash;


		// add event handlers
		schema.pre( 'save', options.save || this.preSaveHandler );

		if( typeof options.remove === 'function' ){
			schema.pre( 'remove', options.remove );
		}


		return schema;

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
'use strict';


let mongoose =		require( 'mongoose' );
let Schema =		require( './schema' );
let parameters =	require( '@stoneandblade/utils' ).parameters;


// expose module
module.exports = function( options ){

	return new Login( options );

};


/*
* @constructor
* @params {Object} optional params for configuring login
* 	- validateUsername {Function} Custom validator for username
* 	- validatePassword	{Function} Custom validator for password
* 	- hashGenerator {Function} Password encryption function
	- passwordComparator {Function} Compares hashed password with user-input password
	- save {Function} Mongoose pre-save handler function
	- remove {Function} Mongoose pre-remove handler function
* */
function Login( options ){

	this.options =	options || {};

	this.schema =	mongoose.model( 'Login', new Schema( options || {} ) );

}


/*
* Tests user-provided username and password
*
* @param {string} username The user identifier
* @param {string} password The user's password
* */
Login.prototype.attemptLogin = ( username, password, callback ) => {

	let params =	parameters.validateArgs( [
		{ name : 'username', value : username, required : true, type : 'string' },
		{ name : 'password', value : password, required : true, type : 'string' }
	] );

	if( params.errors ){
		return callback( parameters.getParamterError( params.errors, 'attemptLogin' ) );
	}


	// get user by username
	this.schema.findOne( { username : params.username.toLowerCase() }, ( error, userInstance ) => {

		if( error ){
			return callback( error );
		}

		// no user found
		if( !userInstance ){
			return callback( null, null );
		}


		// check the password
		if( userInstance.comparator( userInstance.password, params.password ) ){
			callback( null, userInstance );
		} else {
			callback( null, null );
		}

	} );


};

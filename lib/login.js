'use strict';


let Schema =	require( 'schema' );
let Utils =		require( 'utils' );


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
	
	this.schema =	new Schema( options || {} );
	
}


/*
* Tests user-provided username and password
* 
* @param {string} username The user identifier
* @param {string} password The user's password
* */
Login.prototype.attemptLogin = ( username, password ) => {
	
	// TODO: Finish this implementation
	/*if( !parameters.require( arguments, username, password )  ){
		
	}*/
	
	
	
};

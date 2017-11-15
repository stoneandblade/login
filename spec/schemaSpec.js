
describe( 'schema', () => {

	let Schema =	require( '../lib/schema' );

	it( 'should set default configuration', () => {

		let encryptor =	require( '../lib/encryptor' );
		let instance =	new Schema();

		expect( instance.methods.generateHash ).toBe( encryptor.generateHash );
		expect( instance.methods.comparator ).toBe( encryptor.compareHash );

		expect( instance.obj.username.validate ).toBe( undefined );
		expect( instance.obj.password.validate ).toBe( undefined );

	} );

	it( 'should override default configuration', () => {

		let hashFunction = 			() => {};
		let compareFunction =		() => {};
		let usernameValidator =		() => {};
		let passwordValidator =		() => {};

		let instance = new Schema( {
			hashGenerator :			hashFunction,
			passwordComparator :	compareFunction,
			validateUsername :		usernameValidator,
			validatePassword :		passwordValidator
		} );

		expect( instance.methods.generateHash ).toBe( hashFunction );
		expect( instance.methods.comparator ).toBe( compareFunction );

		expect( instance.obj.username.validate ).toBe( usernameValidator )
		expect( instance.obj.password.validate ).toBe( passwordValidator );

	} );

});


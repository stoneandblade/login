
describe( 'encryptor', () => {
	
	let encryptor =			require( '../lib/encryptor' );
	let testPassword =		'abcdefghijk';
	let encryptedPassword;
	
	
	describe( 'generating hash', () => {
		
		it( 'should encrypt password strings', () => {
			
			encryptedPassword =	encryptor.generateHash( testPassword );
			
			expect( encryptedPassword ).not.toEqual( testPassword );
	
		} );


		it( 'should throw an error when parameters are invalid', () => {

			expect( () => { encryptor.generateHash( '' ) } ).toThrowError( 'Invalid parameter "password"' );
			expect( () => { encryptor.generateHash( null ) } ).toThrowError( 'Invalid parameter "password"' );
			expect( () => { encryptor.generateHash( 123 ) } ).toThrowError( 'Invalid parameter "password"' );

		});
		
	} );
	
	
	describe( 'comparing hash', () => {
		
		it( 'should compare encrypted strings', () => {
			
			expect( encryptor.compareHash( encryptedPassword, testPassword ) ).toBeTruthy();
	
			expect( encryptor.compareHash( encryptedPassword, 'lmnopqrstuv' ) ).toBeFalsy();
			expect( encryptor.compareHash( encryptedPassword, 1234567 ) ).toBeFalsy();
			expect( encryptor.compareHash( encryptedPassword, '' ) ).toBeFalsy();
			expect( encryptor.compareHash( encryptedPassword, null ) ).toBeFalsy();
			expect( encryptor.compareHash( encryptedPassword, 'abcdef' ) ).toBeFalsy();
			
		});
		
		
		it( 'should throw an error when parameters are invalid', () => {
			
			expect( () => { encryptor.compareHash( null, testPassword ) } ).toThrowError( 'Invalid parameter "encryptedPassword"' );
			expect( () => { encryptor.compareHash( '', testPassword ) } ).toThrowError( 'Invalid parameter "encryptedPassword"' );
			expect( () => { encryptor.compareHash( 1234, testPassword ) } ).toThrowError( 'Invalid parameter "encryptedPassword"' );
			
		});
		
		
	} );
	
});


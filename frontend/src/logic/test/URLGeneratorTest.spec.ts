import { generateURL } from '../Controllers/URLGenerator';
import { assert } from 'chai';
import 'mocha';

describe('URL Generator', () => {
    it('should be able to generate a random string with a length of 11', () => {
        const url = generateURL();
        assert.equal(url.length, 11);
    });

    it('should start with a /', () => {
        const url = generateURL();
        const firstChar = url.charAt(0);
        assert.equal(firstChar, '/');
    });
});
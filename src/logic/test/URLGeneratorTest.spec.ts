import { URLGenerator } from '../Controllers/URLGenerator';
import { assert } from 'chai';
import 'mocha';

describe('URL Generator', () => {
    let numberOfPlayers: number;
    let urlGenerator: URLGenerator;
    beforeEach(function () {
        numberOfPlayers = 2;
        urlGenerator = new URLGenerator(numberOfPlayers);
    })

    it('should be able to generate a random string with a length of 11', () => {
        const url = urlGenerator.generateURL();
        assert.equal(url.length, 11);
    });

    it('should start with a /', () => {
        const url = urlGenerator.generateURL();
        const firstChar = url.charAt(0);
        assert.equal(firstChar, '/');
    });
});
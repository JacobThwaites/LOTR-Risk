import { AdventureCard } from '../Models/AdventureCard';
import { assert } from 'chai';
import 'mocha';

describe('AdventureCard', () => {
    const card = new AdventureCard('Do something');

    it('should have an effect', () => {
        const result = card.getEffect();
        assert.equal(result, 'Do something');
    });
});
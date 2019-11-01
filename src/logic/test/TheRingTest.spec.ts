import { TheRing } from '../Models/TheRing';
import { assert } from 'chai';
import 'mocha';

describe('TheRing', () => {
    let theRing: TheRing;
    beforeEach(function () {
        theRing = new TheRing(2);
    })

    it('should start on turn 1', () => {
        const result = theRing.getCurrentTurn();
        assert.equal(result, 1);
    });

    it('should be able to increment the turn counter', () => {
        theRing.incrementCurrentTurn();
        const result = theRing.getCurrentTurn();
        assert.equal(result, 2);
    });

    it('should be able to check when the max turns are reached', () => {
        theRing.incrementCurrentTurn();
        const result = theRing.maxTurnsReached();
        assert.equal(result, true);
    });
});
import { AdventureCard } from '../Models/AdventureCard';
import { CardPile } from '../Models/CardPile';
import { assert } from 'chai';
import 'mocha';

describe('CardPile', () => {
    const card = new AdventureCard('Do something');
    const cards = [card];
    const cardPile = new CardPile(cards);

    it('should be able to deal a card', () => {
        const result = cardPile.dealCard();
        assert.equal(result, card);
    });
});
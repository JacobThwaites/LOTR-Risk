import { assert } from 'chai';
import 'mocha';
import TerritoryCardManager, { TradableCards } from '../Controllers/TerritoryCardManager';
import { TerritoryCard } from '../Models/TerritoryCard';
import { Symbol } from '../Enums/Symbols';

describe('TerritoryCardManager', () => {
    it('areCardsValid should return false if number of cards is greater than 3', () => {
        const card1 = new TerritoryCard(Symbol.ARCHER);
        const card2 = new TerritoryCard(Symbol.WILD_CARD);
        const card3 = new TerritoryCard(Symbol.WILD_CARD);
        const card4 = new TerritoryCard(Symbol.WILD_CARD);
        const cards = [card1, card2, card3];
        
        assert.isFalse(TerritoryCardManager.isNewCardValidWithExistingCards(cards, card4));
    });

    it('areCardsValid should return false if cards cannot be exchanged', () => {
        const card1 = new TerritoryCard(Symbol.ARCHER);
        const card2 = new TerritoryCard(Symbol.ARCHER);
        const card3 = new TerritoryCard(Symbol.CAVALRY);
        const cards: TradableCards = [card1, card2, card3];
        
        assert.isFalse(TerritoryCardManager.areCardsExchangeable(cards));
    });

    it('areCardsValid should return true if cards could create a valid combination', () => {
        const archerCard = new TerritoryCard(Symbol.ARCHER);
        const cavalryCard = new TerritoryCard(Symbol.CAVALRY);
        
        const allArcherCards: TradableCards = [archerCard, archerCard, archerCard];
        assert.isTrue(TerritoryCardManager.areCardsExchangeable(allArcherCards));

        const mixedCards = [archerCard];
        assert.isTrue(TerritoryCardManager.isNewCardValidWithExistingCards(mixedCards, cavalryCard));

        const archers = [archerCard, archerCard];
        assert.isTrue(TerritoryCardManager.isNewCardValidWithExistingCards(archers, archerCard));
    });
});
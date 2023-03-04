import { assert } from 'chai';
import 'mocha';
import { Player } from '../Models/Player';
import { Colour } from '../Enums/Colours';
import TerritoryCardManager, { TradableCards } from '../Controllers/TerritoryCardManager';
import { TerritoryCard } from '../Models/TerritoryCard';
import { Symbol } from '../Enums/Symbols';

describe('TerritoryCardManager', () => {
    let player: Player;
    beforeEach(function () {
        player = new Player(1, Colour.BLACK, 'userID');
    })

    it('should give the player 4 units for 3 archer cards', () => {
        assert.equal(player.getUnits(), 0);

        const card1 = new TerritoryCard(Symbol.ARCHER);
        const card2 = new TerritoryCard(Symbol.ARCHER);
        const card3 = new TerritoryCard(Symbol.ARCHER);
        const cards: TradableCards = [card1, card2, card3];
        TerritoryCardManager.exchangeCards(player, cards);
        
        assert.equal(player.getUnits(), 4);
    });

    it('should give the player 4 units for archer cards with wild cards', () => {
        assert.equal(player.getUnits(), 0);

        const card1 = new TerritoryCard(Symbol.ARCHER);
        const card3 = new TerritoryCard(Symbol.ARCHER);
        const card2 = new TerritoryCard(Symbol.WILD_CARD);
        const cards: TradableCards = [card1, card2, card3];
        TerritoryCardManager.exchangeCards(player, cards);
        
        assert.equal(player.getUnits(), 4);
    });

    it('should give the player 6 units for 3 cavalry cards', () => {
        assert.equal(player.getUnits(), 0);

        const card1 = new TerritoryCard(Symbol.CAVALRY);
        const card2 = new TerritoryCard(Symbol.CAVALRY);
        const card3 = new TerritoryCard(Symbol.CAVALRY);
        const cards: TradableCards = [card1, card2, card3];
        TerritoryCardManager.exchangeCards(player, cards);
        
        assert.equal(player.getUnits(), 6);
    });

    it('should give the player 6 units for cavalry cards with wild cards', () => {
        assert.equal(player.getUnits(), 0);

        const card1 = new TerritoryCard(Symbol.CAVALRY);
        const card3 = new TerritoryCard(Symbol.CAVALRY);
        const card2 = new TerritoryCard(Symbol.WILD_CARD);
        const cards: TradableCards = [card1, card2, card3];
        TerritoryCardManager.exchangeCards(player, cards);
        
        assert.equal(player.getUnits(), 6);
    });
    
    it('should give the player 8 units for 3 eagle cards', () => {
        assert.equal(player.getUnits(), 0);

        const card1 = new TerritoryCard(Symbol.EAGLE);
        const card2 = new TerritoryCard(Symbol.EAGLE);
        const card3 = new TerritoryCard(Symbol.EAGLE);
        const cards: TradableCards = [card1, card2, card3];
        TerritoryCardManager.exchangeCards(player, cards);
        
        assert.equal(player.getUnits(), 8);
    });

    it('should give the player 8 units for eagle cards with wild cards', () => {
        assert.equal(player.getUnits(), 0);

        const card1 = new TerritoryCard(Symbol.EAGLE);
        const card3 = new TerritoryCard(Symbol.EAGLE);
        const card2 = new TerritoryCard(Symbol.WILD_CARD);
        const cards: TradableCards = [card1, card2, card3];
        TerritoryCardManager.exchangeCards(player, cards);
        
        assert.equal(player.getUnits(), 8);
    });

    it('should give the player 10 units for an archer, cavalry and eagle card', () => {
        assert.equal(player.getUnits(), 0);

        const card1 = new TerritoryCard(Symbol.ARCHER);
        const card2 = new TerritoryCard(Symbol.CAVALRY);
        const card3 = new TerritoryCard(Symbol.EAGLE);
        const cards: TradableCards = [card1, card2, card3];
        TerritoryCardManager.exchangeCards(player, cards);
        
        assert.equal(player.getUnits(), 10);
    });

    it('should give the player 10 units for 3 wild cards', () => {
        assert.equal(player.getUnits(), 0);

        const card1 = new TerritoryCard(Symbol.WILD_CARD);
        const card2 = new TerritoryCard(Symbol.WILD_CARD);
        const card3 = new TerritoryCard(Symbol.WILD_CARD);
        const cards: TradableCards = [card1, card2, card3];
        TerritoryCardManager.exchangeCards(player, cards);
        
        assert.equal(player.getUnits(), 10);
    });

    it('should give the player 10 units if at least 2 wild cards are given', () => {
        assert.equal(player.getUnits(), 0);

        const card1 = new TerritoryCard(Symbol.ARCHER);
        const card2 = new TerritoryCard(Symbol.WILD_CARD);
        const card3 = new TerritoryCard(Symbol.WILD_CARD);
        const cards: TradableCards = [card1, card2, card3];
        TerritoryCardManager.exchangeCards(player, cards);
        
        assert.equal(player.getUnits(), 10);
    });
});
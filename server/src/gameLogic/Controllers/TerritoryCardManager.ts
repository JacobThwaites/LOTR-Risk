import { Symbol } from "../Enums/Symbols";
import { Player } from "../Models/Player";
import { TerritoryCard } from "../Models/TerritoryCard";

export type TradableCards = [TerritoryCard, TerritoryCard, TerritoryCard];

export default class TerritoryCardManager {
    public static isNewCardValidWithExistingCards(existingCards: TerritoryCard[], newCard: TerritoryCard): boolean {
        const cards = [...existingCards, newCard];
        
        if (cards.length > 3) {
            return false;
        }

        if (cards.length === 3) {
            return this.areCardsExchangeable(cards as TradableCards);
        }

        return true;
    }

    public static areCardsExchangeable(cards: TradableCards): boolean {
        const cardBonus = this.getBonusForCards(cards);
        return cardBonus > 0;
    }

    public static exchangeCards(player: Player, cards: TradableCards): void {
        const bonus = this.getBonusForCards(cards);
        player.addReinforcements(bonus);
        this.removeCardsFromPlayer(cards, player);
    }

    private static getBonusForCards(cards: TradableCards): number {
        const cardCounts = this.getCardCounts(cards);

        if (cardCounts[Symbol.WILD_CARD] >= 2) {
            return 10;
        }

        const archerCount = cardCounts[Symbol.ARCHER] + cardCounts[Symbol.WILD_CARD];
        if (archerCount === 3) {
            return 4;
        }

        const cavalryCount = cardCounts[Symbol.CAVALRY] + cardCounts[Symbol.WILD_CARD];
        if (cavalryCount === 3) {
            return 6;
        }

        const eagleCount = cardCounts[Symbol.EAGLE] + cardCounts[Symbol.WILD_CARD];
        if (eagleCount === 3) {
            return 8;
        }

        const uniqueCount = (cardCounts[Symbol.ARCHER] + cardCounts[Symbol.CAVALRY] + cardCounts[Symbol.EAGLE] + cardCounts[Symbol.WILD_CARD]);
        if (this.isUniqueCount(cardCounts) && uniqueCount === 3) {
            return 10;
        }

        return 0;
    }

    private static getCardCounts(cards: TradableCards): any {
        const counts = {[Symbol.ARCHER]: 0, [Symbol.CAVALRY]: 0, [Symbol.EAGLE]: 0, [Symbol.WILD_CARD]: 0};

        for (let i = 0; i < cards.length; i++) {
            const symbol = cards[i].getSymbolValue();
            counts[symbol]++;
        }

        return counts;
    }

    private static isUniqueCount(cardCounts: any): boolean {
        if (cardCounts[Symbol.ARCHER] > 1) {
            return false;
        } 
        
        if (cardCounts[Symbol.CAVALRY] > 1) {
            return false;
        } 

        if (cardCounts[Symbol.EAGLE] > 1) {
            return false;
        } 

        return true;
    }

    private static removeCardsFromPlayer(cards: TradableCards, player: Player): void {
        for (let i = 0; i < cards.length; i++) {
            const symbol = cards[i].getSymbolValue();
            this.removeSinglePlayerCardBySymbol(player, symbol);
        }
    }

    private static removeSinglePlayerCardBySymbol(player: Player, symbol: Symbol): void {
        const cards = player.getTerritoryCards();
        for (let i = 0; i < cards.length; i++) {
            if (cards[i].getSymbolValue() === symbol) {
                player.removeTerritoryCardByIndex(i);
                return;
            }
        }
    }

    public static givePlayerNewCard(player: Player): void {
        const card = this.generateRandomCard();
        player.addTerritoryCard(card);
    }

    private static generateRandomCard(): TerritoryCard {
        const randomNumber = this.randomNumberFromInterval(1, 32);
        if (randomNumber % 32 === 0) {
            return new TerritoryCard(Symbol.WILD_CARD);
        } else if (randomNumber % 32 === 3) {
            return new TerritoryCard(Symbol.EAGLE);
        } else if (randomNumber % 32 === 2) {
            return new TerritoryCard(Symbol.CAVALRY);
        } else {
            return new TerritoryCard(Symbol.ARCHER);
        }
    }

    private static randomNumberFromInterval(min: number, max: number) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }
}
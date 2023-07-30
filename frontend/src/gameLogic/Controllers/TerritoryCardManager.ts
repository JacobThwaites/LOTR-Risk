import { Symbol } from "../Enums/Symbols";
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
}
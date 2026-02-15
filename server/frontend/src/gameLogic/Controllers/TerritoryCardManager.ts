export type TradableCards = [string, string, string];

export default class TerritoryCardManager {
    public static isNewCardValidWithExistingCards(existingCards: string[], newCard: string): boolean {
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

        if (cardCounts["WILD_CARD"] >= 2) {
            return 10;
        }

        const archerCount = cardCounts["ARCHER"] + cardCounts["WILD_CARD"];
        if (archerCount === 3) {
            return 4;
        }

        const cavalryCount = cardCounts["CAVALRY"] + cardCounts["WILD_CARD"];
        if (cavalryCount === 3) {
            return 6;
        }

        const eagleCount = cardCounts["EAGLE"] + cardCounts["WILD_CARD"];
        if (eagleCount === 3) {
            return 8;
        }

        const uniqueCount = (cardCounts["ARCHER"] + cardCounts["CAVALRY"] + cardCounts["EAGLE"] + cardCounts["WILD_CARD"]);
        if (this.isUniqueCount(cardCounts) && uniqueCount === 3) {
            return 10;
        }

        return 0;
    }

    private static getCardCounts(cards: TradableCards): any {
        const counts: any = {"ARCHER": 0, "CAVALRY": 0, "EAGLE": 0, "WILD_CARD": 0};

        for (const card of cards) {
            counts[card]++;
        }

        return counts;
    }

    private static isUniqueCount(cardCounts: any): boolean {
        if (cardCounts["ARCHER"] > 1) {
            return false;
        } 
        
        if (cardCounts["CAVALRY"] > 1) {
            return false;
        } 

        if (cardCounts["EAGLE"] > 1) {
            return false;
        } 

        return true;
    }
}
import { AdventureCard } from './AdventureCard';

export class CardPile {
    private cards: Array<AdventureCard>;
    constructor(cards: Array<AdventureCard>) {
        this.cards = cards;
    }

    dealCard<Card>() {
        const card = this.cards.pop();
        return card;
    }
}
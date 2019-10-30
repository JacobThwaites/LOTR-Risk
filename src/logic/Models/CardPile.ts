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

    shuffle() {
        let tempArray = this.cards;
        let currentIndex = tempArray.length, temporaryValue, randomIndex;

        // While there remain elements to shuffle...
        while (0 !== currentIndex) {

            // Pick a remaining element...
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;

            // And swap it with the current element.
            temporaryValue = this.cards[currentIndex];
            tempArray[currentIndex] = tempArray[randomIndex];
            tempArray[randomIndex] = temporaryValue;
        }

        this.cards = tempArray;
    }
}
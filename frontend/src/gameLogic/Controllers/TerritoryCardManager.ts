import { Symbol } from "../Enums/Symbols";
import { Player } from "../Models/Player";
import { TerritoryCard } from "../Models/TerritoryCard";

export default class TerritoryCardManager {
    public static givePlayerNewCard(player: Player) {
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
            return new TerritoryCard(Symbol.DARK_RIDER);
        } else {
            return new TerritoryCard(Symbol.ELVEN_ARCHER);
        }
    }

    private static randomNumberFromInterval(min: number, max: number) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }
}
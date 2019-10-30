import { AdventureCard } from './AdventureCard';
import { Area } from './Area';
import { Region } from './Region';
import { Colour } from '../Enums/Colours';

export class Player {
    
    private name: string;
    private colour: Colour;
    private isGood: boolean;
    private units: number;
    private reinforcements: number;
    private adventureCards: Array<AdventureCard>;
    private areas: Array<Area>;
    private regions: Array<Region>;
    constructor(
        name: string, 
        colour: Colour, 
        isGood: boolean, 
        startingUnits: number,
        ) {
        this.name = name;
        this.colour = colour;
        this.isGood = isGood;
        this.units = startingUnits;
        this.reinforcements = startingUnits;
        this.adventureCards = [];
        this.areas = [];
        this.regions = [];
    }
    
    getUnits(): number {
        return this.units;
    }

    getAdventureCards(): Array<AdventureCard> {
        return this.adventureCards;
    }

    getAreas(): Array<Area> {
        return this.areas;
    }

    getAdventureCard(index: number) {
        return this.adventureCards[index];
    }

    takeAdventureCard(card: AdventureCard) {
        this.adventureCards.push(card);
    }

    removeAdventureCard(index: number) {
        this.adventureCards.splice(index, 1);
    }

    addUnits(numberOfUnits: number) {
        this.units += numberOfUnits;
    }

    removeUnits(numberOfUnits: number) {
        this.units -= numberOfUnits;
    }

    addArea(area: Area) {
        this.areas.push(area);
    }

    removeArea(index: number) {
        this.areas.splice(index, 1);
    }

    addRegion(region: Region) {
        this.regions.push(region);
    }

    removeRegion(index: number) {
        this.regions.splice(index, 1);
    }

    calculateAreaBonus(): number {
        let bonusUnits = this.areas.length / 3;
        if (bonusUnits < 3) {
            bonusUnits = 3;
        }
        return Math.floor(bonusUnits);
    }

    calculateRegionBonus(): number {
        let bonusUnits = 0;
        for (let i = 0; i < this.regions.length; i++) {
            bonusUnits += this.regions[i].getBonusUnits();
        }
        return bonusUnits;
    }

    addLeader(area: Area) {
        if (!area.getHasLeader()) {
            area.changeHasLeader();
        }
    }

    addReinforcements(reinforcements: number, area: Area) {
        if (this.reinforcements >= reinforcements) {
            this.reinforcements -= reinforcements;
            area.addUnits(reinforcements);
        }
    }

    rollDice(numberOfDice: number): Array<number> {
        let numbersRolled = [];
        for (let i = 0; i < numberOfDice; i++) {
            const number = this.getDiceRoll();
            numbersRolled.push(number); 
        }
        return numbersRolled.sort();
    }

    getDiceRoll(): number {
        const numberRolled = Math.floor(Math.random() * 6) + 1; 
        return numberRolled;
    }

    calculateDiceWithBonus(numbersRolled: Array<number>): Array<number> {
        const diceRolls = numbersRolled;
        const highestDice = this.findHighestDice(numbersRolled);
        diceRolls[highestDice] += 1;
        return diceRolls;
    }

    findHighestDice(numbersRolled: Array<number>): number {
        let highestNumber = numbersRolled[0];
        var highestNumberIndex = 0;
        for (let i = 1; i < numbersRolled.length; i++) {
            if (numbersRolled[i] > highestNumber) {
                highestNumber = numbersRolled[i];
                highestNumberIndex = i;
            }
        }

        return highestNumberIndex;
    }
}
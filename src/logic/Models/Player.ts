import { AdventureCard } from './AdventureCard';
import { Area } from './Area';
import { Region } from './Region';
import { Colour } from '../Enums/Colours';

export class Player {
    private isGood: boolean;
    private units: number;
    private reinforcements: number;
    private adventureCards: Array<AdventureCard>;
    private areas: Array<Area>;
    private regions: Array<Region>;
    private colour: Colour;
    constructor(
        name: string, 
        colour: Colour, 
        isGood: boolean, 
        startingUnits: number,
        ) {
        this.isGood = isGood;
        this.units = startingUnits;
        this.reinforcements = startingUnits;
        this.adventureCards = [];
        this.areas = [];
        this.regions = [];
        this.colour = colour;
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
}
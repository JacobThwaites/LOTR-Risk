import { AdventureCard } from './AdventureCard';
import { Area } from './Area';
import { Region } from './Region';
import { Colour } from '../Enums/Colours';
import { getRegionForArea } from '../../utils/getRegionForArea';

export class Player {
    private name: String;
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
        isGood: boolean
        ) {
        this.name = name;
        this.isGood = isGood;
        this.units = 0;
        this.reinforcements = 0;
        this.adventureCards = [];
        this.areas = [];
        this.regions = [];
        this.colour = colour;
    }

    getName(): String {
        return this.name;
    }
    
    getUnits(): number {
        return this.units;
    }

    getAreas(): Array<Area> {
        return this.areas;
    }

    getTotalAreas(): number {
        return this.areas.length;
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

        const regionForArea = getRegionForArea(area);

        if (this.ownsRegion(regionForArea)) {
            this.addRegion(regionForArea);
        }
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

    getReinforcements(): number {
        return this.reinforcements;
    }

    addReinforcementsForNewTurn() {
        const totalReinforcements = this.calculateTotalReinforcements();
        this.addReinforcements(totalReinforcements);
    }

    calculateTotalReinforcements(): number {
        let totalReinforments = 0;
        totalReinforments += this.calculateAreaBonus();
        totalReinforments += this.calculateRegionBonus();

        return totalReinforments;
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

    addReinforcements(reinforcements: number) {
        this.reinforcements += reinforcements;
    }

    addReinforcementsToArea(reinforcements: number, area: Area) {
        if (this.reinforcements >= reinforcements) {
            this.reinforcements -= reinforcements;
            area.addUnits(reinforcements);
        }
    }

    addStartingUnits() {
        for (let i = 0; i < this.areas.length; i++) {   
            this.addReinforcementsToArea(1, this.areas[i]);
        }
    }

    ownsArea(area: Area): boolean {
        return this.areas.includes(area);
    }

    ownsRegion(region: Region): boolean {
        const regionAreas = region.getAreas();
    
        for (let i = 0; i < regionAreas.length; i++) {
            if (!this.areas.includes(regionAreas[i])) {
                return false;
            }
        }

        return true;
    }
}
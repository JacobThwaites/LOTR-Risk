import { Region } from './Region';
import { Colour } from '../Enums/Colours';
import { getRegionForArea } from '../utils/getRegionForArea';
import { AreaType } from './AreaType';
import { TerritoryCard } from './TerritoryCard';
import { AreaName } from '../Enums/AreaNames';

export class Player {
    private userID: string;
    private isGood: boolean;
    private units: number;
    private reinforcements: number;
    private territoryCards: Array<TerritoryCard>;
    private areas: Array<AreaType>;
    private regions: Array<Region>;
    private colour: Colour;
    constructor(
        colour: Colour,
        userID: string
        ) {
        this.userID = userID;
        this.isGood = colour === (Colour.GREEN || Colour.YELLOW);
        this.units = 0;
        this.reinforcements = 0;
        this.territoryCards = [];
        this.areas = [];
        this.regions = [];
        this.colour = colour;
    }

    getUserID(): string {
        return this.userID;
    }

    setUserID(userID: string) {
        this.userID = userID;
    }
    
    getUnits(): number {
        return this.units;
    }

    getAreas(): Array<AreaType> {
        return this.areas;
    }

    getTotalAreas(): number {
        return this.areas.length;
    }

    getColour(): Colour {
        return this.colour;
    }

    getTerritoryCards() {
        return this.territoryCards;
    }

    addTerritoryCard(card: TerritoryCard) {
        this.territoryCards.push(card);
    }

    removeTerritoryCardByIndex(index: number) {
        this.territoryCards.splice(index, 1);
    }

    addUnits(numberOfUnits: number) {
        this.units += numberOfUnits;
    }

    removeUnits(numberOfUnits: number) {
        this.units -= numberOfUnits;
    }

    addArea(area: AreaType) {
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
        let totalReinforcements = 0;
        totalReinforcements += this.calculateAreaBonus();
        totalReinforcements += this.calculateRegionBonus();

        return totalReinforcements;
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

    addLeader(area: AreaType) {
        if (!area.getHasLeader()) {
            area.changeHasLeader();
        }
    }

    addReinforcements(reinforcements: number) {
        this.reinforcements += reinforcements;
        this.units += reinforcements;
    }

    addReinforcementsToArea(area: AreaType) {
        if (this.reinforcements >= 1) {
            this.reinforcements -= 1;
            area.addUnits(1);
        }
    }

    addStartingUnits() {
        for (let i = 0; i < this.areas.length; i++) {   
            this.addReinforcementsToArea(this.areas[i]);
        }
    }

    public ownsArea(area: AreaType): boolean {
        return this.areas.includes(area);
    }

    private ownsRegion(region: Region): boolean {
        const regionAreas = region.getAreaNames();
    
        for (let i = 0; i < regionAreas.length; i++) {
            const areaName = regionAreas[i];
            if (!this.isAreaNameInAreas(areaName)) {
                return false;
            }
        }

        return true;
    }

    private isAreaNameInAreas(areaName: AreaName): boolean {
        for (let i = 0; i < this.areas.length; i++) {
            if (this.areas[i].getName() === areaName) {
                return true;
            }            
        }

        return false;
    }
}
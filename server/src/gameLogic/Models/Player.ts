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

    public getUserID(): string {
        return this.userID;
    }

    public setUserID(userID: string) {
        this.userID = userID;
    }
    
    public getUnits(): number {
        return this.units;
    }

    public getAreas(): Array<AreaType> {
        return this.areas;
    }

    public getTotalAreas(): number {
        return this.areas.length;
    }

    public getColour(): Colour {
        return this.colour;
    }

    public getTerritoryCards() {
        return this.territoryCards;
    }

    public addTerritoryCard(card: TerritoryCard) {
        this.territoryCards.push(card);
    }

    public removeTerritoryCardByIndex(index: number) {
        this.territoryCards.splice(index, 1);
    }

    public addUnits(numberOfUnits: number) {
        this.units += numberOfUnits;
    }

    public removeUnits(numberOfUnits: number) {
        this.units -= numberOfUnits;
    }

    public addArea(area: AreaType) {
        this.areas.push(area);
        const regionForArea = getRegionForArea(area);

        if (this.ownsRegion(regionForArea)) {
            this.addRegion(regionForArea);
        }
    }

    public removeArea(area: AreaType) {
        this.areas = this.areas.filter(a => a !== area);

        const areaRegion = getRegionForArea(area);
        console.log('areaRegion: ' + areaRegion.getName());
        
        if (this.ownsRegion(areaRegion)) {
            this.removeRegion(areaRegion);
        }
    }

    public addRegion(region: Region) {
        this.regions.push(region);
    }

    public removeRegion(region: Region) {
        this.regions = this.regions.filter(r => r !== region);
    }

    public getReinforcements(): number {
        return this.reinforcements;
    }

    public addReinforcementsForNewTurn() {
        const totalReinforcements = this.calculateTotalReinforcements();
        this.addReinforcements(totalReinforcements);
    }

    public calculateTotalReinforcements(): number {
        let totalReinforcements = 0;
        totalReinforcements += this.calculateAreaBonus();
        totalReinforcements += this.calculateRegionBonus();

        return totalReinforcements;
    }

    public calculateAreaBonus(): number {
        let bonusUnits = this.areas.length / 3;
        if (bonusUnits < 3) {
            bonusUnits = 3;
        }
        return Math.floor(bonusUnits);
    }

    public calculateRegionBonus(): number {
        let bonusUnits = 0;
        
        for (let i = 0; i < this.regions.length; i++) {
            bonusUnits += this.regions[i].getBonusUnits();
        }
        return bonusUnits;
    }

    public addLeader(area: AreaType) {
        if (!area.getHasLeader()) {
            area.changeHasLeader();
        }
    }

    public addReinforcements(reinforcements: number) {
        this.reinforcements += reinforcements;
        this.units += reinforcements;
    }

    public addReinforcementsToArea(area: AreaType) {
        if (this.reinforcements >= 1) {
            this.reinforcements -= 1;
            area.addUnits(1);
        }
    }

    public addStartingUnits() {
        for (let i = 0; i < this.areas.length; i++) {   
            this.addReinforcementsToArea(this.areas[i]);
        }
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
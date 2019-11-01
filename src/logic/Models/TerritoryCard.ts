import { Area } from './Area';
import { Symbol } from '../Enums/Symbols';

export class TerritoryCard {
    private area: Area;
    private symbol: Symbol;
    constructor(area: Area, symbol: Symbol) {
        this.area = area;
        this.symbol = symbol;
    }

    getArea(): Area {
        return this.area;
    }

    getSymbolValue(): Symbol {
        return this.symbol;
    }
}
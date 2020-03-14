import { Symbol } from '../Enums/Symbols';
import { AreaType } from './AreaType';

export class TerritoryCard {
    private area: AreaType;
    private symbol: Symbol;
    constructor(area: AreaType, symbol: Symbol) {
        this.area = area;
        this.symbol = symbol;
    }

    getArea(): AreaType {
        return this.area;
    }

    getSymbolValue(): Symbol {
        return this.symbol;
    }
}
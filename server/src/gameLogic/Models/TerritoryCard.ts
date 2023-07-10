import { Symbol } from '../Enums/Symbols';

export class TerritoryCard {
    private symbol: Symbol;
    constructor(symbol: Symbol) {
        this.symbol = symbol;
    }

    getSymbolValue(): Symbol {
        return this.symbol;
    }
}
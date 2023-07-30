import { IDefendingBonus } from "./IDefendingBonus";

export class NoDefendingBonus implements IDefendingBonus {
    public getBonus(): number {
        return 0;
    }
}
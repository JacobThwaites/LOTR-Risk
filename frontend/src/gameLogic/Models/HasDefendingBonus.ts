import { IDefendingBonus } from "./IDefendingBonus";

export class HasDefendingBonus implements IDefendingBonus {
    public getBonus(): number {
        return 1;
    }
}
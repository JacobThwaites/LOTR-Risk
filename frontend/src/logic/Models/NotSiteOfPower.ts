import { ISiteOfPower } from "./ISiteOfPower";

export class NotSiteOfPower implements ISiteOfPower {
    public isSiteOfPower(): boolean {
        return false;
    }
}
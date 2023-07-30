export class AdventureCard {
    private effect: string;
    constructor(effect: string) {
        this.effect = effect;
    }

    getEffect(): string {
        return this.effect;
    }
}
export class AdventureCard {
    //TODO: amend effect to be an interface
    private effect: string;
    constructor(effect: string) {
        this.effect = effect;
    }

    getEffect(): string {
        return this.effect;
    }
}
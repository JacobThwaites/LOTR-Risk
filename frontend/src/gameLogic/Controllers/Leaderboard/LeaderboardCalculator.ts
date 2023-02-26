import { Game } from "../../Models/Game";

export interface LeaderboardEntry {
    colour: string,
    areasControlled: number,
    totalUnits: number,
}

export default class LeaderboardCalculator {
    public static getLeaderboard(game: Game): LeaderboardEntry[] {
        const leaders: LeaderboardEntry[] = [];
        const players = game.getPlayers();

        for (let i = 0; i < players.length; i++) {
            const entry = {
                colour: players[i].getColour(),
                areasControlled: players[i].getAreas().length,
                totalUnits: players[i].getUnits()
            }
            
            leaders.push(entry);
        }

        leaders.sort((a, b) => b.areasControlled - a.areasControlled || b.totalUnits - a.totalUnits);
        return leaders;
    }
}
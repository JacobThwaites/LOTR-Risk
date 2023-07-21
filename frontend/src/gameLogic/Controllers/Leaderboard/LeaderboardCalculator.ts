import areaDetails from "../../../components/svgPaths/AreaDetails";
import { Colour } from "../../Enums/Colours";

export interface LeaderboardEntry {
    colour: string,
    areasControlled: number,
    totalUnits: number,
}

interface PlayerInfo {
    areasControlled: number,
    totalUnits: number,
}

// TODO: do this on frontend
export default class LeaderboardCalculator {
    public static getLeaderboard(playerColours: Colour[]): LeaderboardEntry[] {
        return [];
        // const playersInfo: {[name in Colour]: PlayerInfo} = {};
        const leaders: LeaderboardEntry[] = [];
        for (let i = 0; i < playerColours.length; i++) {
            // playersInfo[playerColours[i]] = {areasControlled: 0, totalUnits: 0};
            leaders.push({colour: playerColours[i], areasControlled: 0, totalUnits: 0});    
        }

        for (const [areaName, areaDetail] of Object.entries(areaDetails)) {
            const { colour, units } = areaDetail;
            // playersInfo[colour!].totalUnits += 
        }

        leaders.sort((a, b) => b.areasControlled - a.areasControlled || b.totalUnits - a.totalUnits);
        return leaders;
    }
}
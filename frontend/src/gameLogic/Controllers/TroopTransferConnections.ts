import areaDetails from "../../components/svgPaths/AreaDetails";
import { Adjacencies } from "../Enums/AreaAdjacencies";
import { AreaName } from "../Enums/AreaNames";
import { Player } from "../Models/Player";

export function getConnectedAreasForTroopTransfer(area: AreaName, player: Player): Array<AreaName> {
    const connected: Array<AreaName> = [];
    const visited: any = {};

    function dfs(areaName: AreaName) {
        if (visited.hasOwnProperty(areaName)) {
            return;
        }

        visited[areaName] = true;
        const areaDetail = areaDetails[areaName];
        if (player.getColour() !== areaDetail.colour) {
            return;
        }

        connected.push(area);
        const adjacencies = Adjacencies[areaName];

        for (let i = 0; i < adjacencies.length; i++) {
            dfs(adjacencies[i]);
        }
    }

    dfs(area);
    return connected;
}
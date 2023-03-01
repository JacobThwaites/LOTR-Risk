import { Adjacencies } from "../Enums/AreaAdjacencies";
import { AreaType } from "../Models/AreaType";
import { Player } from "../Models/Player";

export function getConnectedAreasForTroopTransfer(area: AreaType, player: Player): Array<AreaType> {
    const connected: Array<AreaType> = [];
    const visited: any = {};

    function dfs(area: AreaType) {
        const areaName = area.getName();
        if (visited.hasOwnProperty(areaName)) {
            return;
        }

        visited[areaName] = true;

        if (!player.ownsArea(area)) {
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
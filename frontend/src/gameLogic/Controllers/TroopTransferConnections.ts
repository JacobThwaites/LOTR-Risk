import areaDetails from "../../components/svgPaths/AreaDetails";
import { Adjacencies } from "../Enums/AreaAdjacencies";
import { AreaName } from "../Enums/AreaNames";
import { Colour } from "../Enums/Colours";

export function getConnectedAreasForTroopTransfer(startArea: AreaName, userColour: Colour): Array<AreaName> {
    const connected: Array<AreaName> = [];
    const visited: any = {};

    function dfs(areaName: AreaName) {
        if (visited.hasOwnProperty(areaName)) {
            return;
        }

        visited[areaName] = true;
        const areaDetail = areaDetails[areaName];
        if (userColour !== areaDetail.colour) {
            return;
        }

        connected.push(areaName);
        const adjacencies = Adjacencies[areaName];

        for (let i = 0; i < adjacencies.length; i++) {
            dfs(adjacencies[i]);
        }
    }

    dfs(startArea);
    return connected;
}
import areaDetails from "../components/svgPaths/AreaDetails";
import { getConnectedAreasForTroopTransfer } from "../gameLogic/Controllers/TroopTransferConnections";
import { AreaName } from "../gameLogic/Enums/AreaNames";
import { Colour } from "../gameLogic/Enums/Colours";
import { Player } from "../gameLogic/Models/Player";
import { areAreasConnected } from "../utils/areAreasConnected";


export default class AreaSelectValidator {
    private isUsersTurn: boolean;
    private isCombatPhase: boolean;
    private attackingArea: AreaName | null;
    private troopTransferStart: AreaName | null;
    private currentPlayer: Player;
    private userColour: Colour;

    constructor(
        isUsersTurn: boolean,
        isCombatPhase: boolean,
        attackingArea: AreaName | null,
        troopTransferStart: AreaName | null,
        currentPlayer: Player,
        userColour: Colour
    ) {
        this.isUsersTurn = isUsersTurn;
        this.isCombatPhase = isCombatPhase;
        this.attackingArea = attackingArea;
        this.currentPlayer = currentPlayer;
        this.troopTransferStart = troopTransferStart;
        this.userColour = userColour;
    }

    public isAreaClickable(areaName: AreaName): boolean {
        const areaDetail = areaDetails[areaName as AreaName];
        
        if (!areaDetail) {
            return false;
        }

        if (!this.isUsersTurn) {
            return false;
        } else if (this.isCombatPhase) {
            return this.isCombatSelectionValid(areaName);
        } else {
            return this.isTroopTransferSelectionValid(areaName);
        }
    }

    private isCombatSelectionValid(areaName: AreaName): boolean {
        const areaDetail = areaDetails[areaName as AreaName];

        if (this.isAttackingAreaSelected(areaName)) {
            return this.isAttackingAreaClickable(this.userColour, areaDetail.colour!);
        } else {
            return this.isDefendingAreaClickable(areaName);
        }
    }

    private isAttackingAreaClickable(userColour: Colour, areaColour: Colour): boolean {
        return userColour === areaColour;
    }

    private isAttackingAreaSelected(area: AreaName): boolean {
        return (
            this.attackingArea === null || this.attackingArea === area
        );
    }

    private isDefendingAreaClickable(areaName: AreaName): boolean {
        const areaDetail = areaDetails[areaName as AreaName];
        const { area } = areaDetail;
        

        const attackingAreaDetail = areaDetails[this.attackingArea as AreaName];
        const attackingArea = attackingAreaDetail?.area;

        if (!this.attackingArea) {
            return false;
        }
        
        const defendingPlayer = area.getPlayer();
        return (
            (areAreasConnected(this.attackingArea, areaName) && this.currentPlayer !== defendingPlayer) ||
            attackingArea === area
        );
    }

    private isTroopTransferSelectionValid(areaName: AreaName): boolean {
        const areaDetail = areaDetails[areaName];

        if (!this.troopTransferStart) {
            return areaDetail.colour as Colour === this.userColour as Colour;
        } else if (this.troopTransferStart === areaName) {
            return true;
        } else {
            const validAreas = getConnectedAreasForTroopTransfer(this.troopTransferStart, this.userColour);
            return validAreas.includes(areaName);
        }
    }
}
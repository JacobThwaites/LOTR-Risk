import areaDetails from "../components/svgPaths/AreaDetails";
import { getConnectedAreasForTroopTransfer } from "../gameLogic/Controllers/TroopTransferConnections";
import { AreaName } from "../gameLogic/Enums/AreaNames";
import { Colour } from "../gameLogic/Enums/Colours";
import { AreaType } from "../gameLogic/Models/AreaType";
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
        const { area } = areaDetail;

        if (!this.isUsersTurn) {
            return false;
        } else if (this.isCombatPhase) {
            return this.isCombatSelectionValid(areaName);
        } else {
            return this.isTroopTransferSelectionValid(area);
        }
    }

    private isCombatSelectionValid(areaName: AreaName): boolean {
        const areaDetail = areaDetails[areaName as AreaName];
        const { area } = areaDetail;

        if (this.isAttackingAreaSelected(areaName)) {
            return this.isAttackingAreaClickable(this.userColour, area.getPlayer()!.getColour());
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
        const attackingArea = attackingAreaDetail.area;

        if (!this.attackingArea) {
            return false;
        }

        const defendingPlayer = area.getPlayer();
        return (
            (areAreasConnected(attackingArea, area) && this.currentPlayer !== defendingPlayer) ||
            attackingArea === area
        );
    }

    private isTroopTransferSelectionValid(area: AreaType): boolean {
        const troopTransferStartDetail = areaDetails[this.troopTransferStart as AreaName];
        const troopTransferStart = troopTransferStartDetail.area;

        if (!this.troopTransferStart) {
            return this.currentPlayer.ownsArea(area);
        } else if (troopTransferStart === area) {
            return true;
        } else {
            const validAreas = getConnectedAreasForTroopTransfer(troopTransferStart, this.currentPlayer);
            return validAreas.includes(area);
        }
    }
}
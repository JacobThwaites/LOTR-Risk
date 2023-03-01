import { getConnectedAreasForTroopTransfer } from "../gameLogic/Controllers/TroopTransferConnections";
import { AreaType } from "../gameLogic/Models/AreaType";
import { Player } from "../gameLogic/Models/Player";
import { areAreasConnected } from "../utils/areAreasConnected";

// TODO: can probably use factory pattern
export default class AreaSelectValidator {
    private isUsersTurn: boolean;
    private isCombatPhase: boolean;
    private attackingArea: AreaType | null;
    private troopTransferStart: AreaType | null;
    private currentPlayer: Player;

    constructor(
        isUsersTurn: boolean,
        isCombatPhase: boolean,
        attackingArea: AreaType | null,
        troopTransferStart: AreaType | null,
        currentPlayer: Player
    ) {
        this.isUsersTurn = isUsersTurn;
        this.isCombatPhase = isCombatPhase;
        this.attackingArea = attackingArea;
        this.currentPlayer = currentPlayer;
        this.troopTransferStart = troopTransferStart;
    }

    public isAreaClickable(area: AreaType): boolean {
        if (!this.isUsersTurn) {
            return false;
        } else if (this.isCombatPhase) {
            return this.isCombatSelectionValid(area);
        } else {
            return this.isTroopTransferSelectionValid(area);
        }
    }

    private isCombatSelectionValid(area: AreaType): boolean {
        if (this.isAttackingAreaSelected(area)) {
            return this.isAttackingAreaClickable(area);
        } else {
            return this.isDefendingAreaClickable(area);
        }
    }

    private isAttackingAreaClickable(area: AreaType): boolean {
        return this.currentPlayer.ownsArea(area);
    }

    private isAttackingAreaSelected(area: AreaType): boolean {
        return (
            this.attackingArea === null || this.attackingArea === area
        );
    }

    private isDefendingAreaClickable(area: AreaType): boolean {
        if (!this.attackingArea) {
            return false;
        }

        const defendingPlayer = area.getPlayer();
        return (
            (areAreasConnected(this.attackingArea, area) && this.currentPlayer !== defendingPlayer) ||
            this.attackingArea === area
        );
    }

    private isTroopTransferSelectionValid(area: AreaType): boolean {
        if (!this.troopTransferStart) {
            return this.currentPlayer.ownsArea(area);
        } else if (this.troopTransferStart === area) {
            return true;
        } else {
            const validAreas = getConnectedAreasForTroopTransfer(this.troopTransferStart, this.currentPlayer);
            return validAreas.includes(area);
        }
    }
}
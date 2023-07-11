import { Player } from '../gameLogic/Models/Player';

function addUserID(player: Player, userID: string): Player {
    player.setUserID(userID);
    return player;
}

module.exports = {
    addUserID
};
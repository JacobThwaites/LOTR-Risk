import React from "react";
import { CombatController } from "../logic/Controllers/CombatController";

function CombatButton(props) {
  const attackingArea = props.attackingArea.area;
  const defendingArea = props.defendingArea.area;
  const combatController = new CombatController(attackingArea, defendingArea);

  return (
    <button
      class="combatTest"
      type="button"
      onClick={() => {
        combatController.handleCombat(1, 1);
      }}
    />
  );
}

export default CombatButton;

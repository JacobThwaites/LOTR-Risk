import React from "react";

function CombatButton(props) {
  return (
    <button
      className="combatTest"
      type="button"
      onClick={props.onCombatButtonClick}
    >
    Handle Combat
    </button>
  );
}

export default CombatButton;

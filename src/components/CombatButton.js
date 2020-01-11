import React from "react";

function CombatButton(props) {

  return (
    <button
      class="combatTest"
      type="button"
      onClick={props.onCombatButtonClick}
    />
  );
}

export default CombatButton;

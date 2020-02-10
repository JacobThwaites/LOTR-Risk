import React from "react";

function ReinforcementsModal(props) {
  return (
    <div className="reinforcements">
      <label htmlFor="reinforcements">Reinforcements Available</label>
      <input
        name="reinforcements"
        type="number"
        step="1"
        max="3"
        value={props.reinforcementsAvailable}
        readOnly
      />
    </div>
  );
}

export default ReinforcementsModal;

import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function RadioButtonIcon(props) {
  return (
    <div className="radio-button-icon">
      <label>
        <input
          type="radio"
          name="test"
          value={props.value}
          checked={props.checked}
        />
        <FontAwesomeIcon
          value={props.value}
          className={props.checked ? 'font-awesome-icon--checked' : 'font-awesome-icon'}
          onClick={() => props.onClick(props.value)}
          icon={props.icon}
        />
      </label>
    </div>
  );
}

export default RadioButtonIcon;

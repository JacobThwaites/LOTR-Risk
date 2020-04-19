import React from "react";

function RadioButtonIcon(props) {
  return (
    <div className='radio-button-icon'>
      <label>
        <input
          type="radio"
          name="test"
          value={props.value}
          checked={props.checked}
        />
        <img alt="alt" src="http://placehold.it/40x60/0bf/fff&text=A" />
      </label>
    </div>
  );
}

export default RadioButtonIcon;

import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

type Props = {
  value: any,
  checked: boolean,
  onClick: Function,
  icon: any,
  id: string
}

export default function RadioButtonIcon(props: Props) {
  return (
    <div className="radio-button-icon" id={props.id}>
      <label className='radio-button-icon--container'>
        <input
          type="radio"
          name="test"
          value={props.value}
          checked={props.checked}
          onChange={() => {}}
        />
        <FontAwesomeIcon
          // value={props.value}
          data-testid={props.id}
          className={props.checked ? 'font-awesome-icon--checked' : 'font-awesome-icon'}
          onClick={() => props.onClick(props.value)}
          icon={props.icon}
        />
      </label>
    </div>
  );
}
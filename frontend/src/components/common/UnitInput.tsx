import React from "react";
import NumberSelector from "./NumberSelector";

type Props = {
  label: string,
  name: string,
  max: number,
  onChange: Function,
  value: number,
  disabled?: boolean
}

function UnitInput(props: Props) {
  return (
    <>
      <label>{props.label}</label>
      <NumberSelector
        name={props.name}
        max={props.max}
        onChange={props.onChange}
        value={props.value}
        disabled={props.disabled}
      />
    </>
  );
}

export default UnitInput;

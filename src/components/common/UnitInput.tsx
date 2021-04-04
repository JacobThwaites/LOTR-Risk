import React from "react";
import NumberSelector from "./NumberSelector";

type Props = {
  label: string,
  name: string,
  max: number,
  onChange: Function,
  value: number
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
      />
    </>
  );
}

export default UnitInput;

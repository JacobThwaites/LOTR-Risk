import React from "react";
import NumberSelector from "./NumberSelector";

type Props = {
  name: string,
  max: number,
  onChange: Function,
  value: number,
  disabled?: boolean,
  displayNumberSelector?: boolean
}

function UnitInput(props: Props) {
  return (
    <NumberSelector
      name={props.name}
      max={props.max}
      onChange={props.onChange}
      value={props.value}
      disabled={props.disabled}
    />
  );
}

export default UnitInput;

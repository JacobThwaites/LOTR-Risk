import React from "react";
import NumberSelector from "./NumberSelector";

function UnitInput(props) {
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

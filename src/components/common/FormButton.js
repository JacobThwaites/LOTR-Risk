import React from "react";
import Button from "@material-ui/core/Button";

function FormButton(props) {
  return (
    <Button
      id={props.id}
      onClick={props.onClick}
      class={props.disabled ? 'button disabled' : 'button'}
      disabled={props.disabled}
    >
      {props.label}
    </Button>
  );
}

export default FormButton;
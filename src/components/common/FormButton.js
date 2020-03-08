import React from "react";
import Button from "@material-ui/core/Button";

function FormButton(props) {
  return (
    <Button
      id={props.id}
      onClick={props.onClick}
      class='button'
    >
      {props.label}
    </Button>
  );
}

export default FormButton;
import React from "react";
import Button from "@material-ui/core/Button";

function FormButton(props) {
  return (
    <Button
      id={props.id}
      // color="primary"
      onClick={props.onClick}
    >
      {props.label}
    </Button>
  );
}

export default FormButton;
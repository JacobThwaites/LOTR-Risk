import React from "react";
import Button from "@material-ui/core/Button";

type Props = {
  id: string,
  onClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void,
  disabled: boolean,
  label: string
}

export default function FormButton(props: Props) {
  return (
    <>
      <Button
        id={props.id}
        onClick={props.onClick}
        className={props.disabled ? 'button disabled' : 'button'}
        disabled={props.disabled}
        // label={props.label}
      >
        {props.label}
      </Button>
    </>
  );
}
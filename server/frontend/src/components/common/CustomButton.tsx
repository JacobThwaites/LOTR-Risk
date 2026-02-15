import React from "react";

type Props = {
    id?: string
    label: any,
    onClick: any,
    disabled?: boolean,
    title?: string
}

export default function CustomButton(props: Props): JSX.Element {
    return (
        <button disabled={props.disabled} id={props.id} data-testid={props.id} className='custom-button' onClick={props.onClick} title={props.title}>
            {props.label}
        </button>
    )
}
import React from "react";

type Props = {
    id?: string
    label: string,
    onClick: any,
    disabled?: boolean
}

export default function CustomButton(props: Props): JSX.Element {
    return (
        <button disabled={props.disabled} id={props.id} className='custom-button' onClick={props.onClick}>
            {props.label}
        </button>
    )
}
import React from "react";
import NumericInput from 'react-numeric-input';

type Props = {
  id?: string,
  name: string,
  min?: number,
  max: number,
  value: number,
  onChange: any,
  autoFocus?: boolean,
  disabled?: boolean
}

export default function NumberSelector(props: Props) {
  return (
    <NumericInput 
      className='number-selector'
      id={props.id}
      data-testid={props.id}
      name={props.name}
      min={props.min || 1} 
      max={props.max} 
      value={props.value}
      onChange={props.onChange}
      autoFocus={props.autoFocus}
      disabled={props.disabled}
      strict
    />
  );
}
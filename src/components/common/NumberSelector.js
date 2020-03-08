import React from "react";
import NumericInput from 'react-numeric-input';

function NumberSelector(props) {
  return (
    <NumericInput 
      className='number-selector'
      id={props.id}
      name={props.name}
      min='1' 
      max={props.max} 
      value={props.value}
      onChange={props.onChange}
    />
  );
}

export default NumberSelector;

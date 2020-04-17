import React from "react";
import FormButton from "./common/FormButton";

function NameSelector({ onChangeName, playerName, onSubmit }) {
  return (
    <div className='name-selector'>
      <label className='name-selector--label'>Choose Name: </label>
      <input className='name-selector--input' onChange={onChangeName} value={playerName}/>
      <FormButton 
        onClick={onSubmit}
        label='Submit'
        id='name-selector--button'
      />
    </div>
  );
}

export default NameSelector;

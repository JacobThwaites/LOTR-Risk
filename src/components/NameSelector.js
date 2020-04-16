import React from "react";
import FormButton from "./common/FormButton";

function NameSelector({ onChangeName, playerName, onSubmit }) {
  return (
    <div className='name-selector'>
      <input onChange={onChangeName} value={playerName}/>
      <FormButton 
        onClick={onSubmit}
        label='Submit'
      />
    </div>
  );
}

export default NameSelector;

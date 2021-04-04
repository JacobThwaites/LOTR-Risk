import React from "react";
import FormButton from "./common/FormButton";

type Props = {
  playerName: string,
  onSubmit: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void,
  onChangeName: any
}

export default function NameSelector({ onChangeName, playerName, onSubmit }: Props) {
  return (
    <div className='name-selector' data-cy='name-selector'>
      <label className='name-selector--label'>Choose Name: </label>
      <input className='name-selector--input' data-cy='name-selector--input' autoFocus onChange={onChangeName} value={playerName} maxLength={15}/>
      <FormButton 
        onClick={onSubmit}
        label='Submit'
        id='name-selector--button'
        disabled={false}
      />
    </div>
  );
}
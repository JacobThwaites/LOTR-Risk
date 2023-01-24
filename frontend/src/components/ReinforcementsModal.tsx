import React from "react";

type Props = {
  reinforcementsAvailable: number
}

export default function ReinforcementsModal(props: Props) {
  return (
    <div className='reinforcements'>
      <label htmlFor='reinforcements'>Reinforcements Available</label>
      <input
        name='reinforcements'
        data-cy='reinforcements'
        type='number'
        step='1'
        max='3'
        value={props.reinforcementsAvailable}
        readOnly
      />
    </div>
  );
}
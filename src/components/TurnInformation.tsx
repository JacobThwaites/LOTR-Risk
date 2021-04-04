import React from 'react';
import TurnsRemaining from './TurnsRemaining';
import CurrentPlayer from './CurrentPlayer';

type Props = {
  turnsRemaining: number,
  playerName: string
}

export default function TurnInformation(props: Props) {
  return (
    <div className='turn-information'>
      <TurnsRemaining turns={props.turnsRemaining} />
      <CurrentPlayer playerName={props.playerName} />
    </div>
  );
}
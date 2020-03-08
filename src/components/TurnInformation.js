import React from 'react';
import TurnsRemaining from './TurnsRemaining';
import CurrentPlayer from './CurrentPlayer';

function TurnInformation(props) {
  return (
    <div className='turn-information'>
      <TurnsRemaining turns={props.turnsRemaining} />
      <CurrentPlayer playerName={props.playerName} />
    </div>
  );
}

export default TurnInformation;

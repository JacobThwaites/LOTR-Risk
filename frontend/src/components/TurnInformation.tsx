import React from 'react';
import TurnsRemaining from './TurnsRemaining';
import CurrentPlayer from './CurrentPlayer';
import { Colour } from '../gameLogic/Enums/Colours';

type Props = {
  turnsRemaining: number,
  playerName: string,
  userColour: Colour | undefined,
  isOnlineGame: boolean
}

export default function TurnInformation(props: Props) {
  return (
    <div className='turn-information'>
      <TurnsRemaining turns={props.turnsRemaining} />
      {props.isOnlineGame && 
        <div>
          You are the <b className={`turn-information--colour-${props.userColour}`}>{props.userColour}</b> player
        </div>
      }
      <CurrentPlayer playerName={props.playerName} />
    </div>
  );
}
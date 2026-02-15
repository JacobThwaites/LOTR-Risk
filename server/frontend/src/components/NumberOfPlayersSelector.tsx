import React from 'react';
import NumberSelector from './common/NumberSelector';
import CustomButton from './common/CustomButton';

type Props = {
    numberOfPlayers: number,
    onChange: any,
    onSubmit: any
}

export default function NumberOfPlayersSelector(props: Props) {
    return (
        <div id='number-of-players' data-testid='number-of-players'>
            <label id='number-of-players--header'>Select number of players:</label>
            <NumberSelector 
                autoFocus
                id='number-of-players--selector'
                max={4}
                min={2}
                name='numberOfPlayers'
                value={props.numberOfPlayers}
                onChange={props.onChange}
            />
            <CustomButton 
                id='number-of-players--button'
                label='Submit'
                onClick={props.onSubmit}
                disabled={!props.numberOfPlayers}
            />
        </div>
    ); 
}
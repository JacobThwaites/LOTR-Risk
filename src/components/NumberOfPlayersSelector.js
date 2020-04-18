import React from 'react';
import NumberSelector from './common/NumberSelector';
import FormButton from './common/FormButton';

function NumberOfPlayersSelector(props) {
    return (
        <div id='number-of-players'>
            <label id='number-of-players--header'>Select number of players:</label>
            <NumberSelector 
                id='number-of-players--selector'
                max={4}
                min={2}
                name='numberOfPlayers'
                value={props.numberOfPlayers}
                onChange={props.onChange}
            />
            <FormButton 
                id='number-of-players--button'
                className='button'
                label='Submit'
                onClick={props.onSubmit}
                disabled={!props.numberOfPlayers}
            />
        </div>
    ); 
}

export default NumberOfPlayersSelector;
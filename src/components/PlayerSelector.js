import React from 'react';
import NumberSelector from './common/NumberSelector';
import FormButton from './common/FormButton';

function PlayerSelector(props) {
    return (
        <div>
            <h1>Select number of players:</h1>
            <NumberSelector 
                max={4}
                min={2}
                name='numberOfPlayers'
                value={props.numberOfPlayers}
                onChange={props.onChange}
            />
            <FormButton 
                id='number-of-players-button'
                label='Submit'
                onClick={props.onSubmit}
                disabled={!props.numberOfPlayers}
            />
        </div>
    ); 
}

export default PlayerSelector;
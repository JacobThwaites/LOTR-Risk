import '@testing-library/jest-dom'
import React from 'react';
import { render,  screen } from '@testing-library/react'
import TurnsRemaining from './TurnsRemaining';


it('renders TurnsRemaining information', async () => {
    const turns = 3;
    render(<TurnsRemaining turns={turns}/>);

    const element = await screen.findByTestId('turns-remaining');
    expect(element).toHaveTextContent('Turns Remaining: 3');
});

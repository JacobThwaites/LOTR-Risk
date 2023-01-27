import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom'
import React from 'react';
import renderer from 'react-test-renderer';
import Risk from './Risk';


it('renders Risk correctly', () => {
    const component = renderer.create(
        <Risk />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});

it('handles game setup', () => {
    const { getByText } = render(<Risk />);

    const gameTypeButton = screen.getByRole('button')
    fireEvent.click(gameTypeButton);

    const numPlayersHeader = getByText('Select number of players:');
    expect(numPlayersHeader).toBeInTheDocument();

    const numPlayersButton = getByText('Submit');
    fireEvent.click(numPlayersButton);

    const playerNameHeader = getByText('Choose Name:');
    expect(playerNameHeader).toBeInTheDocument();

    const playerNameButton = getByText('Submit');
    fireEvent.click(playerNameButton);
});

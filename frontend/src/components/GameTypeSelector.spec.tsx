import '@testing-library/jest-dom'
import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react'
import GameTypeSelector from './GameTypeSelector';


it('renders GameSetup correctly', async () => {
    const selectGameType = () => {};
    const gameType = 'online';
    const onSubmitGameType = () => {};

    const { container } = render(
        <GameTypeSelector 
            selectGameType={selectGameType}
            gameType={gameType}
            onSubmitGameType={onSubmitGameType}
        />
    );
    expect(container).toMatchSnapshot();
});

it('can change selected game type', async () => {
    let gameType = 'online';
    const selectGameType = jest.fn((type: string) => {gameType = type});
    const onSubmitGameType = jest.fn(() => {});

    render(
        <GameTypeSelector 
            selectGameType={selectGameType}
            gameType={gameType}
            onSubmitGameType={onSubmitGameType}
        />
    );

    const localGameTypeButton = await screen.findByTestId('game-type-selector--option_local');
    fireEvent.click(localGameTypeButton);
    expect(selectGameType).toHaveBeenCalledTimes(1);
    expect(gameType).toEqual('local');
});

it('can submit the selected game type', async () => {
    let gameType = 'online';
    const selectGameType = jest.fn(() => {});
    const onSubmitGameType = jest.fn(() => {});

    render(
        <GameTypeSelector 
            selectGameType={selectGameType}
            gameType={gameType}
            onSubmitGameType={onSubmitGameType}
        />
    );

    const submitButton = await screen.findByTestId('game-type-selector--button');
    fireEvent.click(submitButton);
    expect(onSubmitGameType).toHaveBeenCalledTimes(1);
});
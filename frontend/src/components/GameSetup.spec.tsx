import '@testing-library/jest-dom'
import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react'
import GameSetup from './GameSetup';

it('renders GameSetup correctly', async () => {
    const shouldDisplayChooseGameType = true;
    const numberOfPlayers = 2;
    const onSubmitGameType = (gameType: string) => {};
    const onChangeNumberOfPlayers = (number: number, b: any, a: { name: string; }) => {};
    const onSubmitNumberOfPlayers = () => {};
    const shouldDisplayNumberOfPlayersSelector = false;

    const { container } = render(
        <GameSetup 
            shouldDisplayChooseGameType={shouldDisplayChooseGameType}
            numberOfPlayers={numberOfPlayers}
            onSubmitGameType={onSubmitGameType}
            onChangeNumberOfPlayers={onChangeNumberOfPlayers}
            onSubmitNumberOfPlayers={onSubmitNumberOfPlayers}
            shouldDisplayNumberOfPlayersSelector={shouldDisplayNumberOfPlayersSelector}
        />
    );
    expect(container).toMatchSnapshot();
});

it('can change selected game type', async () => {
    const shouldDisplayChooseGameType = true;
    const numberOfPlayers = 2;
    const onSubmitGameType = (gameType: string) => {};
    const onChangeNumberOfPlayers = (number: number, b: any, a: { name: string; }) => {};
    const onSubmitNumberOfPlayers = () => {};
    const shouldDisplayNumberOfPlayersSelector = false;

    const { container } = render(
        <GameSetup 
            shouldDisplayChooseGameType={shouldDisplayChooseGameType}
            numberOfPlayers={numberOfPlayers}
            onSubmitGameType={onSubmitGameType}
            onChangeNumberOfPlayers={onChangeNumberOfPlayers}
            onSubmitNumberOfPlayers={onSubmitNumberOfPlayers}
            shouldDisplayNumberOfPlayersSelector={shouldDisplayNumberOfPlayersSelector}
        />
    );
    expect(container).toMatchSnapshot();
});

it('displays NumberOfPlayersSelector after game type is submitted', async () => {
    let shouldDisplayChooseGameType = true;
    const numberOfPlayers = 2;
    const onSubmitGameType = jest.fn((gameType: string) => {shouldDisplayChooseGameType = false});
    const onChangeNumberOfPlayers = jest.fn((number: number, b: any, a: { name: string; }) => {});
    const onSubmitNumberOfPlayers = jest.fn(() => {});
    const shouldDisplayNumberOfPlayersSelector = false;

    const { rerender } = render(
        <GameSetup 
            shouldDisplayChooseGameType={shouldDisplayChooseGameType}
            numberOfPlayers={numberOfPlayers}
            onSubmitGameType={onSubmitGameType}
            onChangeNumberOfPlayers={onChangeNumberOfPlayers}
            onSubmitNumberOfPlayers={onSubmitNumberOfPlayers}
            shouldDisplayNumberOfPlayersSelector={shouldDisplayNumberOfPlayersSelector}
        />
    );

    const submitButton = await screen.findByTestId('game-type-selector--button');
    fireEvent.click(submitButton);
    expect(onSubmitGameType).toHaveBeenCalledTimes(1);

    rerender(
        <GameSetup 
            shouldDisplayChooseGameType={shouldDisplayChooseGameType}
            numberOfPlayers={numberOfPlayers}
            onSubmitGameType={onSubmitGameType}
            onChangeNumberOfPlayers={onChangeNumberOfPlayers}
            onSubmitNumberOfPlayers={onSubmitNumberOfPlayers}
            shouldDisplayNumberOfPlayersSelector={shouldDisplayNumberOfPlayersSelector}
        />
    );

    const numberOfPlayersSelector = screen.findByTestId('number-of-players');
    expect(numberOfPlayersSelector).toBeTruthy();
});

it('can update and submit number of players', async () => {
    let shouldDisplayChooseGameType = true;
    let numberOfPlayers = 2;
    const onSubmitGameType = jest.fn((gameType: string) => {shouldDisplayChooseGameType = false});
    const onChangeNumberOfPlayers = jest.fn((number: number, b: any, a: { name: string; }) => {numberOfPlayers = number});
    const onSubmitNumberOfPlayers = jest.fn(() => {});
    const shouldDisplayNumberOfPlayersSelector = false;

    const { rerender } = render(
        <GameSetup 
            shouldDisplayChooseGameType={shouldDisplayChooseGameType}
            numberOfPlayers={numberOfPlayers}
            onSubmitGameType={onSubmitGameType}
            onChangeNumberOfPlayers={onChangeNumberOfPlayers}
            onSubmitNumberOfPlayers={onSubmitNumberOfPlayers}
            shouldDisplayNumberOfPlayersSelector={shouldDisplayNumberOfPlayersSelector}
        />
    );

    const submitButton = await screen.findByTestId('game-type-selector--button');
    fireEvent.click(submitButton);
    expect(shouldDisplayChooseGameType).toBeFalsy();

    rerender(
        <GameSetup 
            shouldDisplayChooseGameType={shouldDisplayChooseGameType}
            numberOfPlayers={numberOfPlayers}
            onSubmitGameType={onSubmitGameType}
            onChangeNumberOfPlayers={onChangeNumberOfPlayers}
            onSubmitNumberOfPlayers={onSubmitNumberOfPlayers}
            shouldDisplayNumberOfPlayersSelector={shouldDisplayNumberOfPlayersSelector}
        />
    );

    const numberOfPlayersSelector = await screen.findByTestId('number-of-players--selector');
    fireEvent.change(numberOfPlayersSelector, { target: { value: 3} });
    expect(numberOfPlayers).toEqual(3);
    
    const submitNumberOfPlayersButton = await screen.findByTestId('number-of-players--button');
    fireEvent.click(submitNumberOfPlayersButton);
    expect(onSubmitNumberOfPlayers).toHaveBeenCalledTimes(1);
});

import '@testing-library/jest-dom'
import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react'
import { TerritoryCard as TerritoryCardModel } from "../gameLogic/Models/TerritoryCard";
import TerritoryCard from './TerritoryCard';
import { Symbol } from '../gameLogic/Enums/Symbols';


it('renders TerritoryCard correctly', async () => {
    const card = new TerritoryCardModel(Symbol.ARCHER);
    render(
        <TerritoryCard card={card} index={1} isSelected={false} onClick={() => {}}/>
    );
    const archerText = await screen.findAllByText('Archer');
    expect(archerText).toHaveLength(1);
});

it('can be selected', async () => {
    const card = new TerritoryCardModel(Symbol.ARCHER);
    let isSelected = false
    const onClickMock = jest.fn(() => (isSelected = !isSelected));

    const { container, rerender } = render(
        <TerritoryCard card={card} index={1} isSelected={isSelected} onClick={onClickMock}/>
    );

    let unselectedCards = container.getElementsByClassName('territory-cards--card');
    expect(unselectedCards).toHaveLength(1);

    let selectedCards = container.getElementsByClassName('territory-cards--card selected');
    expect(selectedCards).toHaveLength(0);

    fireEvent.click(unselectedCards[0]);

    expect(onClickMock).toHaveBeenCalled();

    rerender(<TerritoryCard card={card} index={1} isSelected={isSelected} onClick={onClickMock}/>);

    selectedCards = await container.getElementsByClassName('territory-cards--card selected');
    expect(selectedCards).toHaveLength(1);
});
import '@testing-library/jest-dom'
import React from 'react';
import { render, screen } from '@testing-library/react'
import TerritoryCardsDialog from './TerritoryCardsDialog';
import { TerritoryCard } from '../gameLogic/Models/TerritoryCard';
import { Symbol } from '../gameLogic/Enums/Symbols';


it('renders TerritoryCardsDialog correctly', () => {
    const onClose = () => {};
    const sendTradeTerritoryCardsMessage = () => {};
    const cards: TerritoryCard[] = [new TerritoryCard(Symbol.ARCHER), new TerritoryCard(Symbol.ARCHER)];

    const { container } = render(<TerritoryCardsDialog onClose={onClose} cards={cards} sendTradeTerritoryCardsMessage={sendTradeTerritoryCardsMessage}/>);
    expect(container).toMatchSnapshot();

    // expect(container.getElementsByClassName('territory-cards--card').length).toBe(2);
});

// it('marks a card as selected ', () => {
//     const onClose = () => {};
//     const sendTradeTerritoryCardsMessage = () => {};
//     const cards: TerritoryCard[] = [];

//     const { container } = render(<TerritoryCardsDialog onClose={onClose} cards={cards} sendTradeTerritoryCardsMessage={sendTradeTerritoryCardsMessage}/>);
//     // const component = renderer.create(
//     //     <TerritoryCardsDialog onClose={onClose} cards={cards} sendTradeTerritoryCardsMessage={sendTradeTerritoryCardsMessage}/>
//     // );
//     console.log(container);
    
//     // let tree = component.toJSON();
//     expect(container).toMatchSnapshot();
// });
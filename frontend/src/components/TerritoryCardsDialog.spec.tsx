import '@testing-library/jest-dom'
import React from 'react';
import renderer from 'react-test-renderer';
import { render } from '@testing-library/react'
import TerritoryCardsDialog from './TerritoryCardsDialog';
import { TerritoryCard } from '../gameLogic/Models/TerritoryCard';


it('renders TerritoryCardsDialog correctly', () => {
    const onClose = () => {};
    const sendTradeTerritoryCardsMessage = () => {};
    const cards: TerritoryCard[] = [];

    const { container } = render(<TerritoryCardsDialog onClose={onClose} cards={cards} sendTradeTerritoryCardsMessage={sendTradeTerritoryCardsMessage}/>);
    // const component = renderer.create(
    //     <TerritoryCardsDialog onClose={onClose} cards={cards} sendTradeTerritoryCardsMessage={sendTradeTerritoryCardsMessage}/>
    // );
    console.log(container);
    
    // let tree = component.toJSON();
    expect(container).toMatchSnapshot();
});


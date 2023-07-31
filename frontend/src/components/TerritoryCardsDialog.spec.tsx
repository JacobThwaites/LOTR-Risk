import '@testing-library/jest-dom'
import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react'
import TerritoryCardsDialog from './TerritoryCardsDialog';
import { TerritoryCard } from '../gameLogic/Models/TerritoryCard';
import { Symbol } from '../gameLogic/Enums/Symbols';


it('renders TerritoryCardsDialog correctly', async () => {
    const onClose = () => {};
    const sendTradeTerritoryCardsMessage = () => {};
    const cards: TerritoryCard[] = [new TerritoryCard(Symbol.ARCHER), new TerritoryCard(Symbol.ARCHER)];

    const { container } = render(<TerritoryCardsDialog onClose={onClose} cards={cards} sendTradeTerritoryCardsMessage={sendTradeTerritoryCardsMessage}/>);
    expect(container).toMatchSnapshot();

    const cardComponents = await screen.findAllByTestId('territory-cards--card');
    expect(cardComponents).toHaveLength(2);
});

it('can select and deselect a card on click event', async () => {
    const onClose = () => {};
    const sendTradeTerritoryCardsMessage = () => {};
    const cards: TerritoryCard[] = [new TerritoryCard(Symbol.ARCHER)];

    render(<TerritoryCardsDialog onClose={onClose} cards={cards} sendTradeTerritoryCardsMessage={sendTradeTerritoryCardsMessage}/>);

    let cardComponents = await screen.findAllByTestId('territory-cards--card');
    fireEvent.click(cardComponents[0]);

    const selectedCards = await screen.findAllByTestId('territory-cards--card selected');
    expect(selectedCards).toHaveLength(1);

    fireEvent.click(selectedCards[0]);

    cardComponents = await screen.findAllByTestId('territory-cards--card');
    expect(cardComponents[0]).not.toHaveClass('territory-cards--card selected');
});

it('only allows selecting cards if combination is valid', async () => {
    const onClose = () => {};
    const sendTradeTerritoryCardsMessage = () => {};
    const cards: TerritoryCard[] = [new TerritoryCard(Symbol.ARCHER), new TerritoryCard(Symbol.ARCHER), new TerritoryCard(Symbol.CAVALRY)];

    render(<TerritoryCardsDialog onClose={onClose} cards={cards} sendTradeTerritoryCardsMessage={sendTradeTerritoryCardsMessage}/>);

    const archerCards = await screen.findAllByText('Archer');
    expect(archerCards).toHaveLength(2);

    for (const card of archerCards) {
        fireEvent.click(card);
    }

    const selectedCards = await screen.findAllByTestId('territory-cards--card selected');
    expect(selectedCards).toHaveLength(2);

    let cavalryCard = await screen.findByText('Cavalry');
    fireEvent.click(cavalryCard);

    cavalryCard = await screen.findByText('Cavalry');
    expect(cavalryCard).not.toHaveClass('territory-cards--card selected');
});

it('enables Exchange Cards button if 3 valid cards are selected', async () => {
    const onClose = () => {};
    const sendTradeTerritoryCardsMessage = () => {};
    const cards: TerritoryCard[] = [new TerritoryCard(Symbol.ARCHER), new TerritoryCard(Symbol.ARCHER), new TerritoryCard(Symbol.ARCHER)];

    render(<TerritoryCardsDialog onClose={onClose} cards={cards} sendTradeTerritoryCardsMessage={sendTradeTerritoryCardsMessage}/>);

    let exchangeCardsButton = await screen.findByText('Exchange Cards');
    expect(exchangeCardsButton).toBeDisabled();
    
    const archerCards = await screen.findAllByText('Archer');

    for (const card of archerCards) {
        fireEvent.click(card);
    }

    exchangeCardsButton = await screen.findByText('Exchange Cards');
    expect(exchangeCardsButton).toBeEnabled();
});
import '@testing-library/jest-dom'
import React from 'react';
import { render } from '@testing-library/react'
import TerritoryCardsButton from './TerritoryCardsButton';

it('renders TerritoryCardsButton correctly', async () => {
    const numCards = 2;
    const { container } = render(
        <TerritoryCardsButton 
            onClick={() => {}}
            numCards={numCards}
        />
    );
    expect(container).toMatchSnapshot();

    const numCardsDiv = container.getElementsByClassName('show-territory-cards-button--num-cards')[0];
    expect(numCardsDiv).toHaveTextContent(`${numCards}`);
});
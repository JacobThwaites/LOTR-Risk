import '@testing-library/jest-dom'
import { render } from '@testing-library/react'
import React from 'react';
import CombatInputs from './CombatInputs';

it('renders CombatInputs correctly', async () => {
    const maxAttackingDice = 3;
    let attackingDice = 2;
    const setAttackingDice = jest.fn((input) => (attackingDice = input));
    const areInputsDisabled = false;

    const { container } = render(
        <CombatInputs 
            maxAttackingDice={maxAttackingDice}
            attackingDice={attackingDice}
            setAttackingDice={setAttackingDice}
            areInputsDisabled={areInputsDisabled}
        />
    );

    expect(container).toMatchSnapshot();
});

import '@testing-library/jest-dom'
import { render } from '@testing-library/react'
import React from 'react';
import CombatInput from './CombatInput';

it('renders CombatInput correctly', async () => {
    const maxAttackingDice = 3;
    let attackingDice = 2;
    const setAttackingDice = jest.fn((input) => (attackingDice = input));
    const areInputsDisabled = false;

    const { container } = render(
        <CombatInput
            maxAttackingDice={maxAttackingDice}
            attackingDice={attackingDice}
            setAttackingDice={setAttackingDice}
            areInputsDisabled={areInputsDisabled}
        />
    );

    expect(container).toMatchSnapshot();
});

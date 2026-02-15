import '@testing-library/jest-dom'
import React from 'react';
import { render } from '@testing-library/react'
import UnitMoveHandler from './UnitMoveHandler';
import { AreaName } from '../gameLogic/Enums/AreaNames';

it('renders UnitMoveHandler correctly', async () => {
    const areaToMoveUnits = AreaName.ANDRAST;
    const unitsToMove =  1;
    const onMoveUnits = () => {};
    const setUnitsToMove = () => {};
    const isInputDisabled = false;
    const label = 'label';

    const { container } = render(
        <UnitMoveHandler 
            areaToMoveUnits={areaToMoveUnits} 
            unitsToMove={unitsToMove} 
            onMoveUnits={onMoveUnits}
            setUnitsToMove={setUnitsToMove}
            isInputDisabled={isInputDisabled}
            label={label}
        />
    );

    expect(container).toMatchSnapshot();
});
import '@testing-library/jest-dom'
import React from 'react';
import { render } from '@testing-library/react'
import MapArea from './MapArea';
import { AreaName } from '../gameLogic/Enums/AreaNames';

it('renders MapArea correctly', async () => {
    const { container } = render(
        <MapArea 
            className={'asdf'}
            areaName={AreaName.ANDRAST}
            onClick={() => {}}
            isRendered={true}
        />
    );
    expect(container).toMatchSnapshot();
});

it('renders circle with area units after isRendered prop is true', async () => {
    let isRendered = false;

    const { container, rerender } = render(
        <MapArea 
            className={'asdf'}
            areaName={AreaName.ANDRAST}
            onClick={() => {}}
            isRendered={isRendered}
        />
    );

    let areaUnits = container.getElementsByClassName('areaUnits');
    expect(areaUnits).toHaveLength(0);

    isRendered = true;

    rerender(
        <MapArea 
            className={'asdf'}
            areaName={AreaName.ANDRAST}
            onClick={() => {}}
            isRendered={isRendered}
        />
    );

    areaUnits = container.getElementsByClassName('areaUnits');
    expect(areaUnits).toHaveLength(1);
});

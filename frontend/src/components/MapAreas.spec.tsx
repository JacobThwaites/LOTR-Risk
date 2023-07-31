import '@testing-library/jest-dom'
import React from 'react';
import { render } from '@testing-library/react'
import { AreaName } from '../gameLogic/Enums/AreaNames';
import MapAreas from './MapAreas';
import areaDetails from './svgPaths/AreaDetails';

it('renders MapAreas correctly', async () => {
    const generateAreaClassName = (areaName: AreaName) => '';
    const onClick = (areaName: AreaName) => {};
    const isAreaClickable = (areaName: AreaName) => true;
    const isRendered = true;

    const { container } = render(
        <MapAreas
            generateAreaClassName={generateAreaClassName}
            onClick={onClick}
            isAreaClickable={isAreaClickable}
            isRendered={isRendered}
        />
    );

    expect(container).toMatchSnapshot();
});

it('renders a MapArea component for each area', async () => {
    const generateAreaClassName = (areaName: AreaName) => '';
    const onClick = (areaName: AreaName) => {};
    const isAreaClickable = (areaName: AreaName) => true;
    const isRendered = true;

    const { container } = render(
        <MapAreas
            generateAreaClassName={generateAreaClassName}
            onClick={onClick}
            isAreaClickable={isAreaClickable}
            isRendered={isRendered}
        />
    );
    
    const areas = container.getElementsByClassName('area');
    expect(areas).toHaveLength(Object.keys(areaDetails).length);
});

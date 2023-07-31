import '@testing-library/jest-dom'
import React from 'react';
import renderer from 'react-test-renderer';
import { render } from '@testing-library/react'
import RegionBonusInfo from './RegionBonusInfo';


it('renders RegionBonusInfo correctly', () => {
    const component = renderer.create(
        <RegionBonusInfo />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});

it('show info for all regions', () => {
    const { container } = render(<RegionBonusInfo />)
    expect(container.getElementsByClassName('region-bonus-info--region').length).toBe(9);
});

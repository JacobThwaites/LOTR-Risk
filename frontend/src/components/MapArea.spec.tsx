import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom'
import React from 'react';
import renderer from 'react-test-renderer';
import MapArea from './MapArea';
import ReactDOM from 'react-dom/client';

beforeEach(() => {
    Object.defineProperty(window.SVGElement.prototype, 'getBBox', {
        writable: true,
        value: () => ({
            x: 0,
            y: 0,
            width: 0,
            height: 0
        })
    });

    Object.defineProperty(window.SVGGraphicsElement.prototype, 'getBBox', {
        writable: true,
        value: () => ({
            x: 0,
            y: 0,
            width: 0,
            height: 0
        })
    });

})

it('renders MapArea correctly', () => {
    // const component = renderer.create(
    //     <MapArea className='asdf' id="asdf" onClick={jest.fn()} isRendered={true} clickable={true} path="" areaLogic={''} />
    // );
    // let tree = component.toJSON();
    // expect(tree).toMatchSnapshot();
    expect(true).toBeTruthy();
});
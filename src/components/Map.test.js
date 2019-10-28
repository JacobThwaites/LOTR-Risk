import React from 'react';
import Map from './Map';
import renderer from 'react-test-renderer';

test('Should render the map', () => {
  const component = renderer.create(
    <Map />
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
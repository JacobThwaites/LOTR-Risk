import React from 'react';
import MapArea from './MapArea';
import renderer from 'react-test-renderer';

test('should render an SVG path', () => {
  const props = {
      className: 'test',
      id: 1,
      path: 'test',
      onClick: () => {},
  }  
  const component = renderer.create(
    <MapArea {...props}/>
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

it('should change colour when clicked', );
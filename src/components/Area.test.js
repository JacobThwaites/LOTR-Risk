import React from 'react';
import Area from './Area';
import renderer from 'react-test-renderer';

test('should render an SVG path', () => {
  const props = {
      className: 'test',
      id: 1,
      path: 'test',
      onClick: () => {},
  }  
  const component = renderer.create(
    <Area {...props}/>
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
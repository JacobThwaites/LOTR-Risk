import React from "react";
import CircleGenerator from '../utils/CircleGenerator';
import "../sass/main.scss";

type Props = {
  className: string,
  id: string,
  path: string,
  onClick: any,
  areaLogic: any,
  isRendered: boolean,
  clickable: boolean
}

export default function MapArea(props: Props) {
  const circleGenerator = new CircleGenerator(props);  
  return (
    <>
      <path
        className={'area ' + props.className}
        data-cy={props.clickable ? 'area-clickable' : 'area'}
        id={props.id}
        d={props.path}
        onClick={props.onClick}
        />
      {props.isRendered &&
        circleGenerator.addCircleToMap(props.id, props.areaLogic)
      }
    </>
  );
}
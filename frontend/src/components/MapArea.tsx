import React from "react";
import Circle from './common/Circle';
import "../sass/main.scss";
import { AreaType } from "../gameLogic/Models/AreaType";

type Props = {
  className: string,
  id: string,
  path: string,
  centroid: {x: number, y: number}
  onClick: any,
  areaLogic: AreaType,
  isRendered: boolean,
  clickable: boolean
}

export default function MapArea(props: Props) {
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
        <Circle 
          centroid={props.centroid} 
          colour={props.areaLogic.getPlayer()!.getColour()}
          units={props.areaLogic.getUnits()}
        />
      }
    </>
  );
}
import React from "react";
import Circle from './common/Circle';
import areaDetails from "./svgPaths/AreaDetails";
import { AreaName } from "../gameLogic/Enums/AreaNames";

type Props = {
  className: string,
  areaName: string,
  onClick: any,
  isRendered: boolean,
  clickable: boolean
}

export default function MapArea(props: Props) {
  const areaDetail = areaDetails[props.areaName as AreaName];

  return (
    <>
      <path
        className={'area ' + props.className}
        data-cy={props.clickable ? 'area-clickable' : 'area'}
        id={props.areaName}
        d={areaDetail.path}
        onClick={props.onClick}
        />
      {props.isRendered &&
        <Circle 
          centroid={areaDetail.centroid} 
          colour={areaDetail.colour!}
          units={areaDetail.units}
        />
      }
    </>
  );
}
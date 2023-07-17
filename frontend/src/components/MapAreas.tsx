import React from "react";
import MapArea from "./MapArea";
import areaDetails from './svgPaths/AreaDetails';
import { AreaType } from "../gameLogic/Models/AreaType";

type Props = {
  generateAreaClassName: (areaInfo: any) => string,
  onClick: (area: AreaType) => void,
  isAreaClickable: (area: AreaType) => boolean,
  isRendered: boolean
}

const MapAreas: Function = (props: Props): JSX.Element[] => {
  const areas = Object.entries(areaDetails).map(
    ([areaName, areaInfo]) => (
      <MapArea 
        className={props.generateAreaClassName(areaInfo)}
        areaName={areaName}
        key={areaName}
        onClick={() => props.onClick(areaInfo.area)}
        clickable={props.isAreaClickable(areaInfo.area)}
        areaLogic={areaInfo.area}
        isRendered={props.isRendered}
      />
    )
  );
  
  return areas;
};

export default MapAreas;
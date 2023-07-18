import React from "react";
import MapArea from "./MapArea";
import areaDetails from './svgPaths/AreaDetails';
import { AreaName } from "../gameLogic/Enums/AreaNames";

type Props = {
  generateAreaClassName: (areaName: AreaName) => string,
  onClick: (areaName: AreaName) => void,
  isAreaClickable: (areaName: AreaName) => boolean,
  isRendered: boolean
}

const MapAreas: Function = (props: Props): JSX.Element[] => {
  const areas = Object.entries(areaDetails).map(
    ([areaName, areaInfo]) => (
      <MapArea 
        className={props.generateAreaClassName(areaName as AreaName)}
        areaName={areaName}
        onClick={() => props.onClick(areaName as AreaName)}
        clickable={props.isAreaClickable(areaName as AreaName)}
        isRendered={props.isRendered}
      />
    )
  );
  
  return areas;
};

export default MapAreas;
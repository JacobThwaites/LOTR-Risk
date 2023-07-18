import React, { useEffect, useState } from "react";
import MapAreas from "./MapAreas";
import Mountains from "./svgPaths/Mountains";
import Bridges from "./svgPaths/Bridges";
import Islands from "./svgPaths/Islands";
import Strongholds from "./svgPaths/Strongholds";
import { Player } from "../gameLogic/Models/Player";
import AreaSelectValidator from "../utils/AreaSelectValidator";
import { Colour } from "../gameLogic/Enums/Colours";
import { AreaName } from "../gameLogic/Enums/AreaNames";
import areaDetails from "./svgPaths/AreaDetails";

type Props = {
  attackingArea: AreaName | null,
  defendingArea: AreaName | null,
  troopTransferStart: AreaName | null,
  troopTransferEnd: AreaName | null,
  attackingDice: number,
  currentPlayer: Player,
  onAreaSelect: any,
  isUsersTurn: boolean,
  isCombatPhase: boolean,
  userColour: Colour
}

export default function Map(props: Props): JSX.Element {
  const [isRendered, setIsRendered] = useState(false);
  const areaSelectValidator = new AreaSelectValidator(
    props.isUsersTurn, 
    props.isCombatPhase, 
    props.attackingArea, 
    props.troopTransferStart, 
    props.currentPlayer,
    props.userColour
  );

  useEffect(() => {
    setIsRendered(true);
  }, []);

  function onAreaSelect(areaName: AreaName): void {
    if (isAreaClickable(areaName as AreaName)) {
      props.onAreaSelect(areaName as AreaName);
    }
  }

  function isAreaClickable(areaName: AreaName): boolean {
    if (!props.isUsersTurn || !isRendered) {
      return false;
    } else {
      return areaSelectValidator.isAreaClickable(areaName as AreaName);
    }
  }

  function generateAreaClassName(areaName: AreaName): string {
    const areaDetail = areaDetails[areaName];

    let className;
    if (areaName === props.attackingArea || areaName === props.troopTransferStart) {
      className = "attacker";
    } else if (areaName === props.defendingArea || areaName === props.troopTransferEnd) {
      className = "defender";
    } else {
      className = areaDetail.region;
    }

    if (isAreaClickable(areaName)) {
      className = `${className} clickable`;
    }

    return className;
  }

  return (
    <svg
      id="map"
      version="1.1"
      viewBox="0 0 1360 2000"
      xmlns="http://www.w3.org/2000/svg"
      fill="blue"
    >
      <g stroke="#000" strokeWidth="1px">
        <Mountains />
        <MapAreas
          onClick={onAreaSelect}
          isRendered={isRendered}
          isAreaClickable={isAreaClickable}
          generateAreaClassName={generateAreaClassName}
        />
        <Islands />
        <Strongholds />
        <Bridges />
      </g>
    </svg>
  );
}
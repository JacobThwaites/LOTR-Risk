import React, { useEffect, useState } from "react";
import MapAreas from "./MapAreas";
import Mountains from "./svgPaths/Mountains";
import Bridges from "./svgPaths/Bridges";
import Islands from "./svgPaths/Islands";
import Strongholds from "./svgPaths/Strongholds";
import { AreaType } from "../gameLogic/Models/AreaType";
import { Player } from "../gameLogic/Models/Player";
import AreaSelectValidator from "../utils/AreaSelectValidator";
import { Colour } from "../gameLogic/Enums/Colours";

type Props = {
  attackingArea: AreaType | null,
  defendingArea: AreaType | null,
  troopTransferStart: AreaType | null,
  troopTransferEnd: AreaType | null,
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

  function onAreaSelect(area: AreaType): void {
    if (isAreaClickable(area)) {
      props.onAreaSelect(area);
    }
  }

  function isAreaClickable(area: AreaType): boolean {
    if (!props.isUsersTurn || !isRendered) {
      return false;
    } else {
      return areaSelectValidator.isAreaClickable(area);
    }
  }

  function generateAreaClassName(a: any): string {
    let className;
    if (a.area === props.attackingArea || a.area === props.troopTransferStart) {
      className = "attacker";
    } else if (a.area === props.defendingArea || a.area === props.troopTransferEnd) {
      className = "defender";
    } else {
      className = a.region;
    }

    if (isAreaClickable(a.area)) {
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
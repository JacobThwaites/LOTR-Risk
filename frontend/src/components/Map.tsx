import React, { useEffect, useState } from "react";
import MapAreas from "./MapAreas";
import Mountains from "./svgPaths/Mountains";
import Bridges from "./svgPaths/Bridges";
import Islands from "./svgPaths/Islands";
import Strongholds from "./svgPaths/Strongholds";
import { AreaType } from "../gameLogic/Models/AreaType"; 
import { Player } from "../gameLogic/Models/Player";
import { areAreasConnected } from "../utils/areAreasConnected";

type Props = {
  attackingArea: any,
  defendingArea: any,
  attackingDice: number,
  currentPlayer: Player,
  onAreaSelect: any
}

export default function Map(props: Props) {
  const [isRendered, setIsRendered] = useState(false);

  useEffect(() => {
    setIsRendered(true);
  }, []);

  function onAreaSelect(area: AreaType) {
    if (isAreaClickable(area)) {
      props.onAreaSelect(area);
    }
  }

  function isAreaClickable(area: AreaType) {
    if (isAttackingAreaSelected(area)) {
      return isAttackingAreaClickable(area);
    } else {
      return isDefendingAreaClickable(area);
    }
  }

  function isAttackingAreaSelected(area: AreaType) {
    return (
      props.attackingArea === null || props.attackingArea === area
    );
  }

  function isAttackingAreaClickable(area: AreaType) {
    if (!isRendered) {
      return false;
    }

    return props.currentPlayer.ownsArea(area);
  }

  function isDefendingAreaClickable(area: AreaType) {
    if (!isRendered || !props.attackingArea) {
      return false;
    }

    const defendingPlayer = area.getPlayer();
    return (
      (areAreasConnected(props.attackingArea, area) && props.currentPlayer !== defendingPlayer) ||
      props.attackingArea.area === area
    );
  }

  function generateAreaClassName(a: any) {
    let className;
    if (a.area === props.attackingArea) {
      className = "attacker";
    } else if (a.area === props.defendingArea) {
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
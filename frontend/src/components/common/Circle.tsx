import React from "react";
import SvgCircle from '../svgPaths/SvgCircle';
import { Colour } from "../../gameLogic/Enums/Colours";

type Coordinates = {
  x: number, 
  y: number
}

type Props = {
  centroid: Coordinates, 
  colour: Colour,
  units: number
}

export default function Circle(props: Props) {
  return (
    <SvgCircle 
      coordinates={props.centroid}
      color={props.colour}
      areaUnits={props.units}
    />
  );
}
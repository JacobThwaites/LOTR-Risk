import React from "react";
import "../sass/main.scss";


function Area(props) {
  return (
    <path
      className={'area ' + props.className}
      id={props.id}
      d={props.path}
      onClick={props.onClick}
    />
  );
};

export default Area;

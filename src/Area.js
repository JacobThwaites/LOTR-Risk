import React from "react";
import "./Area.scss";

function Area(props) {
  return (
    <path
      className={props.className}
      id={props.id}
      d={props.path}
      onClick={props.onClick}
    />
  );
};

export default Area;

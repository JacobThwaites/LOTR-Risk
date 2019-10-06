import React from "react";
import './Area.css'; 

const Area = props => {
  return (
    <a className={props.className} id={props.id} alt="mithlond">
      <path d={props.path} />
    </a>
  );
};

export default Area;

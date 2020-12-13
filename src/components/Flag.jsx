import React from "react";

const Flag = (props) => {
  return (
    <img
      style={{ height: props.height, width: props.width, margin: props.setMargin }}
      src={props.url}
      alt="flag-img"
    />
  );
};

export default Flag;

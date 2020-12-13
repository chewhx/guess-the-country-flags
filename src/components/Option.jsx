
import React from "react";

const Option = (props) => {
  return (
    <button
    type="button"
    id={props.id}
    onClick={props.onClick}
    className="btn btn-info btn-block"
    >
    {props.text}
    </button>
  );
};

export default Option;

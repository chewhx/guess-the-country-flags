
import React from "react";

const Option = (props) => {
  return (
    <button
    type="button"
    id={props.id}
    onClick={props.onClick}
    className="btn btn-danger"
    >
    {props.text}
    </button>
  );
};

export default Option;

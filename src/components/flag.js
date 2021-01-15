import React from "react";

const Flag = (props) => {
  return (
    <>
    <img
      className="mb-3"
      src={props.flag}
      alt="flag-img"
    />
    </>
  );
};

export default Flag;

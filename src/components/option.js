
import React from "react";

const Options = (props) => {

  //sub-component for option button
  const Option = (props) => {
    return (
      <button
      type="radio"
      id={props.id}
      checked={false}
      onClick={() => props.check(props.id)}
      className="btn btn-info btn-block btn-lg mb-3"
    >{props.children}</button>
    )
  }

  // capture props passed
  const options = props.q.options
  const check = props.check



  return (
    <>
    {options.map((op, i) => (
      <Option key={i} id={i} check={check}>{op}</Option>
    ))}
    </>
  );
};

export default Options;

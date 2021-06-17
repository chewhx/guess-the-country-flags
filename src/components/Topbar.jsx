import React from "react";
import { NavLink } from "react-router-dom";

const Topbar = () => {
  return (
    <div className="d-block d-md-none bg-white rounded sticky-top py-1">
      <p className="text-center h5">
        <strong>
          <NavLink to="/">GUESS THE FLAG</NavLink>
        </strong>
      </p>
    </div>
  );
};

export default Topbar;

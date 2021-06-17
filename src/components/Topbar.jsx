import React from "react";
import { Image } from "react-bootstrap";
import { NavLink } from "react-router-dom";

const Topbar = () => {
  return (
    <div className="d-block d-md-none bg-white rounded sticky-top py-1">
      <p className="text-center h5">
        <strong>
          <NavLink to="/">
            <Image src="/favicon-16x16.png" />
            &nbsp; GUESS THE FLAG
          </NavLink>
        </strong>
      </p>
    </div>
  );
};

export default Topbar;

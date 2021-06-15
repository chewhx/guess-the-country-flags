import React from "react";
import { Navbar, Nav, Button } from "react-bootstrap";
import { GlobalContext } from "../context/GlobalProvider";
import { Link } from "react-router-dom";

const Tabbar = () => {
  const { resetTheGame, initGameRound } = React.useContext(GlobalContext);
  return (
    <Navbar
      id="tabbar"
      className="d-sm-block d-md-none"
      bg="dark"
      variant="dark"
      style={{
        width: "100%",
        zIndex: "1",
        position: "fixed",
        bottom: 0,
        padding: "1rem 0",
        paddingBottom: "calc(1.5rem + env(safe-area-inset-bottom))",
      }}
    >
      <Nav className="w-100 sd-flex justify-content-around">
        <Nav.Link href="/">Home</Nav.Link>
        <Link to={"/start"}>
          <Button
            className="flex-fill"
            variant="secondary"
            block
            size="lg"
            onClick={() => initGameRound()}
          >
            Start
          </Button>
        </Link>
        <Nav.Link onClick={() => resetTheGame()}>Restart</Nav.Link>
      </Nav>
    </Navbar>
  );
};

export default Tabbar;

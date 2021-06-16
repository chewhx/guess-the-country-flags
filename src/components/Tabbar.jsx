import React from "react";
import { Navbar, Nav, Button, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

const Tabbar = ({ gameMode, setGameMode, stats, remaining, reset }) => {
  return (
    <Navbar
      id="tabbar"
      className="d-sm-block d-md-none shadow-lg"
      bg="white"
      variant="white"
      style={{
        width: "100%",
        zIndex: "1",
        opacity: "96%",
        borderRadius: "20px",
        position: "fixed",
        bottom: 0,
        padding: "1rem 0",
        paddingBottom: "calc(1rem + env(safe-area-inset-bottom))",
        flexDirection: "column",
      }}
    >
      <Nav className="w-100 d-flex justify-content-around">
        <p className="font-weight-bold">
          Score: {stats.correct || 0} / {stats.attempts}
        </p>
        <p className="font-weight-bold">Flags Remaining: {remaining} </p>
      </Nav>
      <Nav className="row w-100 d-flex justify-content-around">
        <Nav.Link className="text-center col-3" href="/">
          <i className="bi bi-house-door-fill"></i>
          <br />
          <small>Home</small>
        </Nav.Link>
        <Button
          variant="link"
          className="nav-link text-center col-3"
          onClick={() => setGameMode(true)}
          disabled={gameMode}
        >
          <i className="bi bi-flag-fill"></i>
          <br />
          <small>Start</small>
        </Button>
        <Button
          variant="link"
          className="nav-link text-center col-3"
          onClick={() => reset()}
        >
          <i className="bi bi-arrow-clockwise"></i>
          <br />
          <small>Restart</small>
        </Button>
      </Nav>
    </Navbar>
  );
};

export default Tabbar;

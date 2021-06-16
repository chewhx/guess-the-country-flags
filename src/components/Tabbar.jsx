import React from "react";
import { Navbar, Nav, Button, Row } from "react-bootstrap";

const Tabbar = React.forwardRef(
  (
    { gameMode, setGameMode, stats, remaining, reset, hideTab, revealTab },
    ref
  ) => {
    const scrollToTop = () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    };
    return (
      <Navbar
        ref={ref}
        onClick={() => {
          ref.current.style.bottom == "0px" ? hideTab() : revealTab();
        }}
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
          transition: "0.8s",
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
            <span>Home</span>
          </Nav.Link>
          <Button
            variant="link"
            className="nav-link text-center col-3"
            onClick={() => {
              setGameMode(true);
              scrollToTop();
            }}
            disabled={gameMode}
          >
            <i className="bi bi-flag-fill"></i>
            <br />
            <span>Start</span>
          </Button>
          <Button
            variant="link"
            className="nav-link text-center col-3"
            onClick={() => {
              reset();
              scrollToTop();
            }}
            disabled={!gameMode}
          >
            <i className="bi bi-arrow-clockwise"></i>
            <br />
            <span>Restart</span>
          </Button>
        </Nav>
      </Navbar>
    );
  }
);

export default Tabbar;

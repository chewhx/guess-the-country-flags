import React from "react";
import { Navbar, Nav, Container, Button } from "react-bootstrap";

const Navbar_ = ({ setGameMode, gameMode, stats, remaining, reset }) => {
  return (
    <Navbar
      collapseOnSelect
      expand="md"
      bg="light"
      sticky="top"
      variant="light"
      className="mb-4 mx-auto d-none d-md-flex shadow"
      style={{
        borderBottomLeftRadius: "25px",
        borderBottomRightRadius: "25px",
        maxWidth: "1200px",
      }}
    >
      <Container>
        <Navbar.Brand href="/">
          <h2 className="font-weight-bolder">GUESS THE FLAG</h2>
        </Navbar.Brand>
        <Nav
          // className="d-flex justify-content-evenly"
          style={{ flexDirection: "row" }}
        >
          <h5 className="ml-5">
            <strong>
              Score: {stats.correct || 0} / {stats.attempts || 0}
            </strong>
          </h5>
          <h5 className="ml-5">
            <strong>Flags remaining: {remaining || 0}</strong>
          </h5>
        </Nav>
        <Nav style={{ fontSize: "1.5rem" }}>
          <Button
            variant="link"
            size="lg"
            className="nav-link text-center ml-3"
            onClick={() => {
              setGameMode(true);
            }}
            disabled={gameMode}
          >
            <i className="bi bi-flag-fill"></i>
            <br />
            <strong>Start</strong>
          </Button>
          <Button
            size="lg"
            variant="link"
            className="nav-link text-center  ml-3"
            onClick={() => reset()}
            disabled={!gameMode}
          >
            <i className="bi bi-arrow-clockwise"></i>
            <br />
            <strong>Restart</strong>
          </Button>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default Navbar_;

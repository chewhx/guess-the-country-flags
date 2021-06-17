import React from "react";
import { Navbar, Nav, Container, Button, Image } from "react-bootstrap";
import { useHistory, useLocation } from "react-router";

const Navbar_ = ({
  setGameMode,
  gameMode,
  stats,
  remaining,
  reset,
  setShow,
}) => {
  const history = useHistory();
  const { pathname } = useLocation();

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
          <h3 className="font-weight-bolder">
            <Image src="/favicon-32x32.png" />
            &nbsp;GUESS THE FLAG
          </h3>
        </Navbar.Brand>
        <p className="text-info h5">
          <strong>
            Score: {stats.correct || 0} / {stats.attempts || 0}
          </strong>
        </p>
        <p className="text-info h5">
          <strong>Flags remaining: {remaining || 0}</strong>
        </p>
        <Nav style={{ fontSize: "1.5rem" }}>
          <Button
            size="lg"
            variant="link"
            className="text-center"
            disabled={pathname === "/scoreboard"}
            onClick={() => {
              setGameMode(true);
              reset();
            }}
          >
            {gameMode ? (
              <>
                <i className="bi bi-arrow-clockwise"></i>
                <br />
                <strong>Restart</strong>
              </>
            ) : (
              <>
                <i className="bi bi-flag-fill"></i>
                <br />
                <strong>Start</strong>
              </>
            )}
          </Button>
          {pathname === "/scoreboard" ? (
            <Button
              size="lg"
              variant="link"
              className="text-center"
              onClick={() => {
                history.goBack();
              }}
            >
              <i className="bi bi-chevron-left"></i>
              <br />
              <strong>Back</strong>
            </Button>
          ) : (
            <Button
              size="lg"
              variant="link"
              className="text-center"
              onClick={() => {
                history.push("/scoreboard");
              }}
            >
              <i className="bi bi-suit-spade-fill"></i>
              <br />
              <strong>Scores</strong>
            </Button>
          )}
          <Button
            size="lg"
            variant="link"
            className="text-center"
            onClick={() => setShow(true)}
            disabled={!gameMode}
          >
            <i className="bi bi-cloud-arrow-up-fill"></i>
            <br />
            <strong>Submit</strong>
          </Button>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default Navbar_;

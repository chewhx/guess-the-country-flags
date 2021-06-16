import React from "react";
import { Navbar, Nav, Container } from "react-bootstrap";

const Navbar_ = () => {
  return (
    <Navbar
      collapseOnSelect
      expand="lg"
      bg="light"
      sticky="top"
      variant="light"
      className="mb-4 d-none d-md-flex shadow"
      style={{
        borderBottomLeftRadius: "25px",
        borderBottomRightRadius: "25px",
      }}
    >
      <Container>
        <Navbar.Brand href="/">
          <h1>GUESS THE FLAG</h1>
        </Navbar.Brand>
        <Nav>
          <Nav.Link className="btn btn-primary btn-lg m-3">Start</Nav.Link>
          <Nav.Link className="btn btn-primary btn-lg m-3">Restart</Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default Navbar_;

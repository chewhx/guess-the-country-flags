import React, { useContext } from "react";
import { Navbar, Nav } from "react-bootstrap";
import { GlobalContext } from "../context/GlobalProvider";

const Header = () => {
  const { resetTheGame } = useContext(GlobalContext);
  return (
    <Navbar
      collapseOnSelect
      expand="lg"
      bg="light"
      variant="light"
      className="mb-4 d-none d-md-flex"
    >
      <Navbar.Brand href="/">GUESS THE FLAG</Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link onClick={() => resetTheGame()}>Restart</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Header;

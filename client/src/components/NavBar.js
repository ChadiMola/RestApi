import React from "react";
import { Navbar, Nav, NavDropdown, Form, FormControl, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <Navbar bg="light" expand="lg">
        <Link to="/users">
      <Navbar.Brand className="px-4">RestApi</Navbar.Brand>
      </Link>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link as={Link} to="/newusers">Create User</Nav.Link>
          <Nav.Link as={Link} to="/users">User List</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
    
  );
};

export default NavBar;

import React from "react";
import { NavLink } from "react-router-dom";
import { NavDropdown, Navbar, Nav } from "react-bootstrap";
import AppLogo from "../../assets/logo.png";

function AppBar({ user }) {
  const upperCase = (string) => {
    if (string == null) return;
    return string.charAt(0).toUpperCase() + string.slice(1);
  };
  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Navbar.Brand href="/">
        <img
          src={AppLogo}
          width="30"
          height="30"
          className="d-inline-block align-top"
          alt="React Bootstrap logo"
        />
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <NavLink className="nav-link" to="/" style={{ color: "#fff" }}>
            Home
          </NavLink>

          <NavLink className="nav-link" to="/add-org">
            Add Organization
          </NavLink>
        </Nav>
      </Navbar.Collapse>
      {user && (
        <Navbar.Collapse className="justify-content-end">
          <Navbar.Text>Hi, {upperCase(user.email)}</Navbar.Text>
          <Nav.Link href="/logout" className="logoutButton">
            Logout
          </Nav.Link>
        </Navbar.Collapse>
      )}
    </Navbar>
  );
}

export default AppBar;

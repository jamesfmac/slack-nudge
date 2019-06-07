import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { LinkContainer } from "react-router-bootstrap";

import { faCommentDots } from "@fortawesome/free-regular-svg-icons";

class Header extends React.Component {
  render() {
    return (
      <Navbar bg="light" variant="light">
        <LinkContainer exact to="/">
          <Navbar.Brand href="#home">NUDGELY</Navbar.Brand>
        </LinkContainer>
        <Nav className="mr-auto">
          <LinkContainer exact to="/">
            <Nav.Link>Broadcast</Nav.Link>
          </LinkContainer>
          <LinkContainer to="/outbox">
            <Nav.Link>Outbox</Nav.Link>
          </LinkContainer>
          <LinkContainer to="/templates">
            <Nav.Link>Templates</Nav.Link>
          </LinkContainer>
        </Nav>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
          <Nav className="justify-content-end">
            <NavDropdown title={this.props.user.email} id="basic-nav-dropdown">
              <NavDropdown.Item
                href="https://www.markdownguide.org/cheat-sheet"
                target="_blank"
              >
                MD Cheat Sheet
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item onSelect={this.props.logout()}>
                Log Out
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

export default Header;

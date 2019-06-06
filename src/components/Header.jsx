import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faCommentDots } from "@fortawesome/free-regular-svg-icons";

class Header extends React.Component {
  render() {
    return (
      <Navbar bg="light" variant="light">
        <Navbar.Brand href="#home">NUDGELY</Navbar.Brand>
        <Nav className="mr-auto">
          <Nav.Link href="#broadcast">
            Broadcast <FontAwesomeIcon icon={faCommentDots} />
          </Nav.Link>
          <Nav.Link href="#features">Outbox</Nav.Link>
          <Nav.Link href="#pricing">Templates</Nav.Link>
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

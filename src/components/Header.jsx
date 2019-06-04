import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";

class Header extends React.Component {
  render() {
    return (
      <Navbar bg="light" variant="light">
        <Navbar.Brand href="#home">
          <img
            style={{ marginRight: 5 }}
            src="/img/stratejos-head.svg"
            width="50"
            height="30"
            
            className="d-inline-block align-top"
            alt="React Bootstrap logo"
          />{" "}
          Slack Nudge
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
          <Nav className="justify-content-end">
            <NavDropdown title={this.props.user.email} id="basic-nav-dropdown">
              <NavDropdown.Item
                href="https://www.markdownguide.org/getting-started/"
                target="_blank"
              >
                Getting Started
              </NavDropdown.Item>
              <NavDropdown.Item
                href="https://www.markdownguide.org/cheat-sheet"
                target="_blank"
              >
                Cheat Sheet
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item
               onSelect = {this.props.logout()}
              >
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

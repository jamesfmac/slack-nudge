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
            src="/img/markdown.png"
            width="50"
            height="30"
            marginRight="5"
            margin-right="20"
            className="d-inline-block align-top"
            alt="React Bootstrap logo"
          />{" "}
          Slack Nudge
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
          <Nav className="justify-content-end">
            <NavDropdown title="Message Guides" id="basic-nav-dropdown">
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
              <NavDropdown.Item
                href="https://www.markdownguide.org/basic-syntax"
                target="_blank"
              >
                Basic Syntax
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item
                href="https://github.github.com/gfm/#what-is-github-flavored-markdown-"
                target="_blank"
              >
                Github Flavoured MD
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

export default Header;

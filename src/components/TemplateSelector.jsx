import React, { Component } from "react";
import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from "react-bootstrap/Dropdown";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLayerGroup } from "@fortawesome/free-solid-svg-icons";

class TemplateSelector extends React.Component {
  render() {
    return (
      <Row>
        <Col>
          <Dropdown onMouseDown={e => e.preventDefault()}>
            <Dropdown.Toggle variant="outline-info" id="dropdown-basic">
              <FontAwesomeIcon icon={faLayerGroup} /> Apply Template
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item href="#/action-1">
                Need help connecting Jira?
              </Dropdown.Item>
              <Dropdown.Item href="#/action-2">Trial expiring</Dropdown.Item>
              <Dropdown.Item href="#/action-3">Trial over</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Col>
      </Row>
    );
  }
}

export default TemplateSelector;

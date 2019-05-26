import React from "react";
import { Form, Collapse, Row, Col } from "react-bootstrap";

import {
  faCaretSquareUp,
  faCaretSquareDown
} from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class Config extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showConfig: true
    };
  }

  toggleConfig = () => {
    this.setState({
      showConfig: !this.state.showConfig
    });
  };

  render() {
    let showConfig = this.state.showConfig;

    return (
      <Form>
        <Form.Group>
          <div className="text-muted">
            <span
              onClick={this.toggleConfig}
              aria-controls="confi-collapsed"
              aria-expanded={showConfig}
            >
              Msg settings{" "}
              <FontAwesomeIcon
                icon={showConfig ? faCaretSquareUp : faCaretSquareDown}
              />
            </span>
          </div>
        </Form.Group>
        <Collapse in={this.state.showConfig}>
          <Row>
            <Col>
              <Form.Group controlId="adminEmail">
                <Form.Label>Stratejos Admin</Form.Label>
                <Form.Control type="email" placeholder="Username" />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="adminPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" />
              </Form.Group>
            </Col>
          </Row>
        </Collapse>
      </Form>
    );
  }
}

export default Config; 
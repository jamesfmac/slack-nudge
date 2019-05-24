import React from "react";
import styled from "styled-components";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Collapse from "react-bootstrap/Collapse";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPaperPlane,
  faCaretSquareDown,
  faCaretSquareUp,
  faCommentDots
} from "@fortawesome/free-regular-svg-icons";
import { faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";

const url = "https://api.slack.com/block-kit";

const Heading = styled.h3`
  width: 100%;
  text-align: center;
  font-weight: 300;
  margin-top: 20px;
`;

class MessageForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showConfig: false,
      attachButton: true,
      recipients: "",
      msgBody: "",
      btnLabel: "",
      btnURL: ""
    };

    this.handleConfigChange = this.handleConfigChange.bind(this);
    this.handleChange = this.handleChange.bind(this);

    this.handleSend = this.handleSend.bind(this);
  }

  handleButtonChange() {
    this.setState({
      attachButton: !this.state.attachButton
    });
  }

  handleConfigChange() {
    this.setState({
      showConfig: !this.state.showConfig
    });
  }

  handleChange(e) {
    this.setState({ [e.target.id]: e.target.value });
  }

  handleSend() {}

  render() {
    const showConfig = this.state.showConfig;
    const attachButton = this.state.attachButton;
    return (
      <Form>
        <Row>
          <Heading>
            NEW MESSAGE <FontAwesomeIcon icon={faCommentDots} />
          </Heading>
        </Row>
        <Form.Group>
          <div className="text-muted">
            <span
              onClick={() => this.handleConfigChange()}
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
        <Form.Group controlId="recipients">
          <Form.Label>Recipient</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            onChange={this.handleChange}
            value={this.state.recipients}
          />
          <Form.Text className="text-muted">
            Must be a registered stratejos user
          </Form.Text>
        </Form.Group>
        <Form.Group controlId="msgBody">
          <Form.Label>Message body</Form.Label>
          <Form.Control
            as="textarea"
            rows="5"
            onChange={this.handleChange}
            value={this.state.msgBody}
          />
          <Form.Text className="text-muted">
            Supports markdown or text. Refer to{" "}
            <a href={url} target="_blank" rel="noopener noreferrer">
              {" "}
              Slack Block Kit
            </a>
          </Form.Text>
        </Form.Group>
        <Collapse in={this.state.attachButton}>
          <Row>
            <Col md={{ span: 4 }}>
              <Form.Group controlId="btnLabel">
                <Form.Label>Label</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Click!"
                  onChange={this.handleChange}
                  value={this.state.btnLabel}
                />
                <Form.Text className="text-muted">
                  {" "}
                  Supports markdown + emoji
                </Form.Text>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="btnURL">
                <Form.Label>URL</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="https://app.stratejos.com/"
                  onChange={this.handleChange}
                  value={this.state.btnURL}
                />
              </Form.Group>
            </Col>
          </Row>
        </Collapse>
        <Form.Group>
          <div style={{ marginBottom: "10px", textAlign: "center" }}>
            <span
              onClick={() => this.handleButtonChange()}
              style={{
                cursor: " pointer"
              }}
            >
              <FontAwesomeIcon icon={attachButton ? faMinus : faPlus} />{" "}
              {attachButton ? "Remove button" : "Add Button"}
            </span>
          </div>
        </Form.Group>

        <Form.Group className="pull-right">
          <Button variant="primary" type="submit">
            <FontAwesomeIcon icon={faPaperPlane} /> Send
          </Button>
        </Form.Group>
      </Form>
    );
  }
}
export default MessageForm;

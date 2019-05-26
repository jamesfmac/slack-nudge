import React from "react";

import Form from "react-bootstrap/Form";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from "react-bootstrap/Dropdown";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Collapse from "react-bootstrap/Collapse";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faMinus, faRedo } from "@fortawesome/free-solid-svg-icons";
import {
  faPaperPlane,
  faCommentDots
} from "@fortawesome/free-regular-svg-icons";


import { Heading } from "./styled";
import TemplateSelector from  "./TemplateSelector"



import submitMessage from "../utils/submitMessage";

class MessageForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      submissionPending: false,
      formTouched: true,
      attachButton: true,
      recipients: "jamesm@stratejos.ai",
      msgText: "Hey",
      msgBody:
        "Hey Jason,\n\n It looks like you might have had trouble connecting Jira? Once connected I can help you:\n\n    :fire: Get scheduled custom messages\n    :fire: Create and update issues from Slack\n    :fire: Unfurl Jira URL's in Slack\n\n Connecting is easy, just click below to get started.",
      btnLabel: ":zap: Connect Jira",
      btnURL:
        "https://app.stratejos.com/#/organisation/jira-integration-instructions",
      supportBody: "Need support? Email my friendly creators hello@stratejos.ai"
    };
  }

  handleButtonChange() {
    this.setState({
      attachButton: !this.state.attachButton,
      btnLabel: "",
      btnURL: ""
    });
  }

  handleChange = e => {
    this.setState({
      formTouched: true,
      [e.target.id]: e.target.value
    });
  };

  resetForm = e => {
    this.setState({
      submissionPending: false,
      formTouched: false,
      attachButton: true,
      recipients: "",
      msgText: "",
      msgBody: "",
      btnLabel: "",
      btnURL: "",
      supportBody: ""
    });
  };

  handleError = error => {
    this.setState({
      submissionPending: false
    });
    this.props.showError(`Failed. Message not sent`);
  };

  handleSuccess = e => {
    this.props.showSuccess(`Sucess! Message delivered`);
    this.resetForm();
    window.scroll({ top: 0, left: 0, behavior: "smooth" });
  };

  handleSend = e => {
    e.preventDefault();
    this.props.showInfo("Message submitted...");
    this.setState({
      submissionPending: true
    });

    submitMessage(
      this.handleError,
      this.handleSuccess,
      this.state.recipients,
      this.state.msgText,
      this.state.msgBody,
      this.state.supportBody,
      this.state.attachButton
        ? { label: this.state.btnLabel, url: this.state.btnURL }
        : null
    );
  };

  render() {
    const attachButton = this.state.attachButton;
    const url = "https://api.slack.com/block-kit";
    return (
      <Form>
        <Row>
          <Heading>
            NEW MESSAGE <FontAwesomeIcon icon={faCommentDots} />
          </Heading>
        </Row>
        <TemplateSelector />
       

        <Form.Group controlId="recipients">
          <Form.Label>Recipient</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            onChange={this.handleChange}
            value={this.state.recipients}
            readOnly={this.state.submissionPending}
          />
          <Form.Text className="text-muted">
            Must be a registered stratejos user
          </Form.Text>
        </Form.Group>
        <Form.Group controlId="msgText">
          <Form.Label>Text</Form.Label>
          <Form.Control
            type="text"
            placeholder="Hi :wave:"
            onChange={this.handleChange}
            value={this.state.msgText}
            readOnly={this.state.submissionPending}
          />
          <Form.Text className="text-muted">
            {" "}
            Supports markdown + emoji
          </Form.Text>
        </Form.Group>
        <Form.Group controlId="msgBody">
          <Form.Label>Body</Form.Label>
          <Form.Control
            as="textarea"
            rows="5"
            onChange={this.handleChange}
            value={this.state.msgBody}
            readOnly={this.state.submissionPending}
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
                  value={this.state.ms}
                  readOnly={this.state.submissionPending}
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
                  readOnly={this.state.submissionPending}
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
        <Form.Group controlId="supportBody">
          <Form.Label>Support text</Form.Label>
          <Form.Control
            type="text"
            placeholder="email me@info.com for support"
            onChange={this.handleChange}
            value={this.state.supportBody}
            readOnly={this.state.submissionPending}
          />
          <Form.Text className="text-muted">
            Supports markdown or text. Refer to{" "}
            <a href={url} target="_blank" rel="noopener noreferrer">
              {" "}
              Slack Block Kit
            </a>
          </Form.Text>
        </Form.Group>
        {this.state.formTouched ? (
          <span
            className="text-muted"
            onClick={this.resetForm}
            style={{
              cursor: " pointer",
              marginRight: "10px",
              fontSize: "80%"
            }}
          >
            <FontAwesomeIcon icon={faRedo} /> Clear fields
          </span>
        ) : null}
        <Form.Group className="float-right">
          <ButtonGroup>
            <Button
              variant="primary"
              type="submit"
              onClick={this.handleSend}
              onMouseDown={e => e.preventDefault()}
              disabled={this.state.submissionPending}
            >
              <FontAwesomeIcon icon={faPaperPlane} /> Send
            </Button>
            <DropdownButton
              as={ButtonGroup}
              id="bg-nested-dropdown"
              title=""
              style={{ borderLeft: `1px solid #004ad3` }}
              disabled={this.state.submissionPending}
            >
              <Dropdown.Item eventKey="1">Send test</Dropdown.Item>
              <Dropdown.Item eventKey="2">Save as template</Dropdown.Item>
            </DropdownButton>
          </ButtonGroup>
        </Form.Group>
      </Form>
    );
  }
}

export default MessageForm;

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

import TemplateSelector from "./TemplateSelector";

import submitMessage from "../utils/submitMessage";
import { StyledGroup } from "./Styled";
import { FormGroup } from "react-bootstrap";

class MessageForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      submissionPending: false,
      formTouched: false,
      attachButton: true,
      recipients: "",
      msgText: "",
      msgBody: "",
      btnLabel: "",
      btnURL: "",
      supportBody: ""
    };
  }

  handleApplyTemplate = formState => {
    this.setState({
      ...formState
    });
  };

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

        <Form.Group>
          <Form.Row>
            <Col md={{ span: 3, offset: 0 }}>
              <TemplateSelector applyTemplate={this.handleApplyTemplate} />
            </Col>
          </Form.Row>
        </Form.Group>
        <StyledGroup>
          <Form.Group controlId="recipients">
            <Form.Row>
              <Col md={{ span: 3 }}>
                <Form.Label>Recipients</Form.Label>
                <Form.Text className="text-muted">
                  Must be existing users
                </Form.Text>
              </Col>
              <Col>
                <Form.Control
                  type="email"
                  placeholder="user@domain.com"
                  onChange={this.handleChange}
                  value={this.state.recipients}
                  readOnly={this.state.submissionPending}
                />
              </Col>
            </Form.Row>
          </Form.Group>

          <Form.Group controlId="msgText">
            <Form.Row>
              <Col md={{ span: 3 }}>
                <Form.Label>Notification text</Form.Label>
                <Form.Text className="text-muted">
                  {" "}
                  Displayed in Slack alerts.
                </Form.Text>
              </Col>
              <Col>
                <Form.Control
                  type="text"
                  placeholder="Hi I'm here to..."
                  onChange={this.handleChange}
                  value={this.state.msgText}
                  readOnly={this.state.submissionPending}
                />
              </Col>
            </Form.Row>
          </Form.Group>

          <Form.Group as={Form.Row} controlId="msgBody">
            <Col md={{ span: 3 }}>
              <Form.Label>Message body</Form.Label>
              <Form.Text className="text-muted">
                {" "}
                The body uses Slack style markdown. See{" "}
                <a href={url} target="_blank" rel="noopener noreferrer">
                  {" "}
                  Slack Block Kit
                </a>{" "}
                for more.
              </Form.Text>
            </Col>
            <Col>
              <Form.Control
                as="textarea"
                rows="10"
                placeholder="Your main message.."
                onChange={this.handleChange}
                value={this.state.msgBody}
                readOnly={this.state.submissionPending}
              />
              <Form.Text className="text-muted" />
            </Col>
          </Form.Group>
          <Row>
            <Col md={{ span: 3 }}>
              <div>
                <span>Button </span>{" "}
              </div>
              {attachButton ? (
                <div
                  onClick={() => this.handleButtonChange()}
                  style={{
                    cursor: " pointer",
                    fontSize: "75%",
                    color: "red",
                    marginTop: "10px"
                  }}
                >
                  Disable
                </div>
              ) : (
                <div
                  onClick={() => this.handleButtonChange()}
                  style={{
                    cursor: " pointer",
                    fontSize: "75%",
                    marginTop: "10px"
                  }}
                >
                  Enable
                </div>
              )}
            </Col>
            <Col>
              <Row>
                <Col md={{ span: 4 }}>
                  <Form.Group controlId="btnLabel">
                    <Form.Label
                      style={
                        !this.state.attachButton ? { color: "grey" } : null
                      }
                    >
                      Button label
                    </Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Action"
                      onChange={this.handleChange}
                      value={this.state.ms}
                      readOnly={
                        this.state.submissionPending | !this.state.attachButton
                      }
                    />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group controlId="btnURL">
                    <Form.Label
                      style={
                        !this.state.attachButton ? { color: "grey" } : null
                      }
                    >
                      Button URL
                    </Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="https://myapp.com"
                      onChange={this.handleChange}
                      value={this.state.btnURL}
                      readOnly={
                        this.state.submissionPending | !this.state.attachButton
                      }
                    />
                  </Form.Group>
                </Col>
              </Row>
            </Col>
          </Row>
          <Form.Group controlId="supportBody">
            <Row>
              <Col md={{ span: 3 }}>
                <Form.Label>Support text</Form.Label>
              </Col>
              <Col>
                <Form.Control
                  type="text"
                  placeholder="How can they contact you?"
                  onChange={this.handleChange}
                  value={this.state.supportBody}
                  readOnly={this.state.submissionPending}
                />
              </Col>
            </Row>
          </Form.Group>

          <Form.Group>
            <Row>
              <Col md={{ span: 3, offset: 3 }}>
                {this.state.formTouched ? (
                  <span
                    className="text-muted"
                    onClick={this.resetForm}
                    style={{
                      cursor: " pointer",
                      marginRight: "10px",
                      fontSize: "80%",
                      display: "inline"
                    }}
                  >
                    <FontAwesomeIcon icon={faRedo} /> Reset
                  </span>
                ) : null}
              </Col>

              <Col>
                <ButtonGroup className="float-right">
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
              </Col>
            </Row>
          </Form.Group>
        </StyledGroup>
      </Form>
    );
  }
}

export default MessageForm;

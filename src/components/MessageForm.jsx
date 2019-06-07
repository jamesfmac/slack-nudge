import React from "react";

import {
  Form,
  ButtonGroup,
  DropdownButton,
  Dropdown,
  Button,
  Row,
  Col
} from "react-bootstrap";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRedo } from "@fortawesome/free-solid-svg-icons";
import {
  faPaperPlane,
  faCommentDots
} from "@fortawesome/free-regular-svg-icons";

import TemplateSelector from "./TemplateSelector";
import { StyledGroup, Heading } from "./Styled.jsx";
import { saveMessageResponse } from "../utils/saveMessage";
import submitMessage from "../utils/submitMessage";


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
    this.baseState = this.state;
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

  resetForm = () => {
    this.setState(this.baseState);
  };

  handleError = (messageID, error) => {
    this.setState({
      submissionPending: false
    });
    saveMessageResponse(messageID, error.response);
    this.props.showError(`Failed. Message not sent`);
  };

  handleSuccess = (messageID, response, isTest) => {
    saveMessageResponse(messageID, response, isTest);
    if (isTest) {
      this.props.showSuccess(`Sucess! Test  sent`);
      this.setState({
        submissionPending: false
      });
    } else {
      this.props.showSuccess(`Sucess! Message delivered`);
      this.resetForm();
    }
  };

  handleSend = e => {
    let sendTo = null;
    let isTest = e.target.title === 'Send Test'? true:false
    if (isTest) {
      this.props.showInfo("Sending test...");
      sendTo = this.props.user.email;
    } else {
      this.props.showInfo("Sending message...");
      sendTo = this.state.recipients;
    }
    this.setState({
      submissionPending: true
    });

    submitMessage(
      this.props.user.email,
      this.handleError,
      this.handleSuccess,
      sendTo,
      this.state.msgText,
      this.state.msgBody,
      this.state.supportBody,
      this.state.attachButton
        ? { label: this.state.btnLabel, url: this.state.btnURL }
        : null,
      isTest
    );
  };


  render() {
    const attachButton = this.state.attachButton;
    const url = "https://api.slack.com/block-kit";
    return (
      <Row>
        <Col md={{ span: 3 }}>
          <Row>
            <Col>
              <Heading>
                Broadcast <FontAwesomeIcon icon={faCommentDots} />
              </Heading>
            </Col>
          </Row>
          <Row>
            <Col>
              <TemplateSelector applyTemplate={this.handleApplyTemplate} />
            </Col>
          </Row>
        </Col>
        <Col md={{ span: 9 }}>
          <Form>
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
                  <Form.Label> Button </Form.Label>

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
                          value={this.state.btnLabel}
                          readOnly={
                            this.state.submissionPending |
                            !this.state.attachButton
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
                            this.state.submissionPending |
                            !this.state.attachButton
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
                        <Dropdown.Item
                          eventKey="1"
                          title = 'Send Test'
                          onMouseDown={e => e.preventDefault()}
                          onClick={this.handleSend}
                        >
                          Send test Slack
                        </Dropdown.Item>
                        <Dropdown.Item eventKey="2">
                          Save as template
                        </Dropdown.Item>
                      </DropdownButton>
                    </ButtonGroup>
                  </Col>
                </Row>
              </Form.Group>
            </StyledGroup>
          </Form>
        </Col>
      </Row>
    );
  }
}

export default MessageForm;

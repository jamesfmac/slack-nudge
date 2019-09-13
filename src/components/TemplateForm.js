import React from "react";

import {
  Form,
  ButtonGroup,
  Table,
  Button,
  Row,
  Col,
  InputGroup,
  FormControl
} from "react-bootstrap";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRedo } from "@fortawesome/free-solid-svg-icons";

import { StyledGroup, Heading } from "./Styled";
import { saveMessageResponse } from "../utils/saveMessage";
import TemplateSideBar from "./TemplateSideBar";
import { saveTemplate } from "../utils/saveTemplate";

import "react-multi-email/style.css";

class MessageForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      submissionPending: false,
      formTouched: false,
      attachButton: true,
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
    isTest
      ? this.props.showSuccess(`Sucess! Test  sent`)
      : this.props.showSuccess(`Sucess! Message delivered`);

    this.setState({
      submissionPending: false,
      recipients: ""
    });
  };
  handleSave = e => {
    e.preventDefault();
    console.log("handle save called");
    saveTemplate("6ZrZfUL3Ls0i77yl6CkE", {
      attachButton: this.state.attachButton,
      msgText: this.state.msgText,
      msgBody: this.state.msgBody,
      btnURL: this.state.btnURL,
      supportBody: this.state.supportBody
    });
  };

  render() {
    const attachButton = this.state.attachButton;
    const url = "https://api.slack.com/block-kit";

    return (
      <Row>
        <Col md={{ span: 3 }}>
          <Row>
            <Col>
              <Heading>Templates</Heading>
            </Col>
          </Row>
          <Row>
            <TemplateSideBar />
          </Row>
        </Col>
        <Col md={{ span: 9 }}>
          <Form>
            <StyledGroup>
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
                        onMouseDown={e => e.preventDefault()}
                        disabled={this.state.submissionPending}
                        onClick={this.handleSave}
                      >
                        Save changes
                      </Button>
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

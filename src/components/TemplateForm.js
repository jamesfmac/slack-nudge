import React from "react";

import {
  Nav,
  Navbar,
  Form,
  ButtonGroup,
  Button,
  Row,
  Col,
  InputGroup,
  FormControl
} from "react-bootstrap";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";

import { StyledForm, StyledHeader } from "./Styled";
import { saveMessageResponse } from "../utils/saveMessage";
import { db } from "../utils/firebase";
import { updateTemplate } from "../utils/templates";
import Skeleton from "react-loading-skeleton";
import { withRouter } from "react-router";

import "react-multi-email/style.css";
import Header from "./Header";

class TemplateForm extends React.Component {
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
      supportBody: "",
      templateName: ""
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

  handleError = (messageID, error) => {
    this.setState({
      submissionPending: false
    });
    saveMessageResponse(messageID, error.response);
    this.props.showError(`Failed. Message not sent`);
  };

  handleSuccess = docRef => {
    this.props.history.push("/templates");
  };

  handleSave = e => {
    e.preventDefault();
    console.log("handle save called");
    updateTemplate(this.props.template, this.handleSuccess, {
      attachButton: this.state.attachButton,
      msgText: this.state.msgText,
      msgBody: this.state.msgBody,
      btnURL: this.state.btnURL,
      btnLabel: this.state.btnLabel,
      supportBody: this.state.supportBody
    });
  };

  componentWillMount() {
    db.collection("templates")
      .doc(this.props.template)
      .get()
      .then(doc => {
        if (doc.exists) {
          console.log("Template data:", doc.data());
          const {
            msgText,
            msgBody,
            btnLabel,
            btnURL,
            supportBody
          } = doc.data().content;
          const templateName = doc.data().name;
          this.setState({
            msgText: msgText,
            msgBody: msgBody,
            btnLabel: btnLabel,
            btnURL: btnURL,
            supportBody: supportBody,
            templateName: templateName
          });
        } else {
          console.log("No template found");
        }
      })
      .catch(function(error) {
        console.log("Error getting template: ", error);
      });
  }

  render() {
    const attachButton = this.state.attachButton;
    const url = "https://api.slack.com/block-kit";
    console.log(this.props.history);

    return (
      <Col>
      
        <StyledHeader>
          <Col>
            <ButtonGroup className="float-left">
              <Button
                variant="secondary"
                type="submit"
                onMouseDown={e => e.preventDefault()}
                disabled={this.state.submissionPending}
                onClick={() => this.props.history.push("/templates")}
                //change this to goBack() at some point
              >
                <FontAwesomeIcon icon={faAngleLeft} /> Templates
              </Button>
            </ButtonGroup>
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
                Save and Exit
              </Button>
            </ButtonGroup>
          </Col>
        </StyledHeader>
        <Row>
          <Col md={{ span: 8, offset: 2 }}>
            <Row style={{
              borderBottom: "1px solid grey",
            }}>
              <Col>
                <h1
                  style={{
                    textAlign: "center",
                    marginTop: "10px",
                    marginBottom: "20px",
                    color: '#495057',
                    fontWeight: 400,
                    fontSize: "2rem",


                  }}
                >
                  {this.state.templateName || <Skeleton width={300} />}
                </h1>
              </Col>
            </Row>
            <Form>
              <StyledForm>
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
                              !this.state.attachButton
                                ? { color: "grey" }
                                : null
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
                              !this.state.attachButton
                                ? { color: "grey" }
                                : null
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
              </StyledForm>
            </Form>
          </Col>
        </Row>
      </Col>
    );
  }
}

export default withRouter(TemplateForm);

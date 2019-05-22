import React from "react";
import styled from "styled-components";

import JSONInput from "react-json-editor-ajrm";
import locale from "react-json-editor-ajrm/locale/en";

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
import FormCheckInput from "react-bootstrap/FormCheckInput";

const url = "https://api.slack.com/block-kit";

const Heading = styled.h3`
  width: 100%;
  text-align: center;
  font-weight: 300;
  margin-top: 20px;
`;

const inputStyle = {
  display: `block`,
  width: `100%`,
  padding: `.375rem .75rem`,
  fontSize: ` 1rem`,
  fontWeight: `400`,
  lineHeight: `1.5`,
  color: `#495057`,
  backgroundColor: `#fff`,
  backgroundClip: `padding-box`,
  border: `1px solid #ced4da`,
  borderRadius: `.25rem`,
  transition: `border-color .15s ease-in-out,box-shadow .15s ease-in-out`
};

class MessageForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      advanced: false,
      message: "{'block': {'red': false}"
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSend = this.handleSend.bind(this);
  }
  handleChange(e) {
    this.setState({
      message: e.target.value
    });
  }
  handleSend() {}

  render() {
    const advanced = this.state.advanced;
    return (
      <Form>
        <Row>
          <Heading>
            NEW MESSAGE <FontAwesomeIcon icon={faCommentDots} />
          </Heading>
        </Row>
        <Form.Group controlId="formToEmail">
          <Form.Label>Recipient</Form.Label>
          <Form.Control type="email" placeholder="Enter email" />
          <Form.Text className="text-muted">
            Must be a registered stratejos user
          </Form.Text>
        </Form.Group>
        <Form.Group>
          <Form.Label>Message</Form.Label>
         
            <JSONInput
              id="a_unique_id"
              placeholder={{ blocks: { type: "Section" } }}
              theme="light_mitsuketa_tribute"
              locale={locale}
              waitAfterKeyPress = {2000}
              height="450px"
              width="100%"
              style={{ container: inputStyle }}
            />
           <Form.Text className="text-muted">
            Supports JSON formatted
            <a href={url} target="_blank" rel="noopener noreferrer">
              Slack Block Kit
            </a>
            messages
          </Form.Text>
        </Form.Group>

     
         
      
        <Form.Group>
          <div>
            <span
              onClick={() => this.setState({ advanced: !advanced })}
              aria-controls="example-collapse-text"
              aria-expanded={advanced}
            >
              
              Config  <FontAwesomeIcon
                icon={advanced ? faCaretSquareUp : faCaretSquareDown}
              />
            </span>
          </div>
        </Form.Group>
        <Collapse in={this.state.advanced}>
          <Row>
            <Col>
              <Form.Group controlId="formUserEmail">
                <Form.Label>Stratejos Admin</Form.Label>
                <Form.Control type="email" placeholder="Username" />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="formBasicEmail">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" />
              </Form.Group>
            </Col>
          </Row>
        </Collapse>
        <Form.Group>
          <Button variant="primary" type="submit" className="pull-right">
            <FontAwesomeIcon icon={faPaperPlane} /> Send
          </Button>
        </Form.Group>
      </Form>
    );
  }
}
export default MessageForm;

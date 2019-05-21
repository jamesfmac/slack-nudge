import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Collapse from "react-bootstrap/Collapse";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPaperPlane,
  faEye,
  faEyeSlash,
  faCaretSquareDown,
  faCaretSquareUp
} from "@fortawesome/free-regular-svg-icons";

class MessageForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      advanced: false
    };
  }
  render() {
    const advanced = this.state.advanced;
    return (
      <Form>
        <Form.Group controlId="formToEmail">
          <Form.Label>Recipient</Form.Label>
          <Form.Control type="email" placeholder="Enter email" />
          <Form.Text className="text-muted">
            The email address of a registered stratejos user
          </Form.Text>
        </Form.Group>
        <Form.Group controlId="exampleForm.ControlTextarea1">
          <Form.Label>Message</Form.Label>
          <Form.Control id="editor" as="textarea" rows="10" />
          <Form.Text className="text-muted">
            Must be a valid JSON formatted slack message
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

import React from "react";
import { db } from "../utils/firebase";

import {
  OverlayTrigger,
  Tooltip,
  Form,
  Table,
  Button,
  Row,
  Col,
  InputGroup,
  FormControl,
  FormGroup
} from "react-bootstrap";
import { StyledRow } from "./Styled.js";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faTrashAlt, faClone } from "@fortawesome/free-regular-svg-icons";

class TemplateSideBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      newTemplateName: "",
      templates: []
    };
    this.baseState = this.state;
  }
  handleTemplateCreate = e => {
    e.preventDefault();
    db.collection("templates")
      .add({
        name: this.state.newTemplateName,
        createdAt: Math.round(new Date().getTime() / 1000) //create unix timestamp
      })
      .then(docRef => {
        console.log("Document written with ID: ", docRef.id);
        this.setState({
          newTemplateName: ""
        });
      })
      .catch(error => {
        console.error("Error adding document: ", error);
      });
  };

  handleChange = e => {
    this.setState({
      [e.target.id]: e.target.value
    });
  };

  handleTemplateSelection = e => {};

  componentDidMount() {
    db.collection("templates").onSnapshot(querySnapshot => {
      let templates = [];
      querySnapshot.forEach(doc => {
        const { name, createdAt } = doc.data();
        templates.push({
          doc: doc, // DocumentSnapshot
          createdAt,
          name: name,
          key: doc.id
        });
      });
      this.setState({
        templates: templates
      });
    });
  }

  render() {
    let templateList = this.state.templates
      .sort(function(a, b) {
        if (a.name.toLowerCase() < b.name.toLowerCase()) {
          return -1;
        }
        if (a.name.toLowerCase() > b.name.toLowerCase()) {
          return 1;
        }
        return 0;
      })
      .map(template => {
        return (
          <StyledRow>
            <td>{template.name}</td>
            <td style={{ textAlign: "right" }}>
              <span id="template-controls" style= {{display:"none"}}>
                <OverlayTrigger key = {`trigger-copy-${template.id}`} placement='bottom' overlay={
                  <Tooltip id = {`tooltip-copy-${template.id}`}>
                    Copy
                  </Tooltip>
                }
                >
                <FontAwesomeIcon icon={faClone} />
                </OverlayTrigger>
                {" "}
                <OverlayTrigger key= {`trigger-delte${template.id}`} placement= 'bottom' overlay= {
                  <Tooltip key = {`tooltip-delete-${template.id}`}>
                    Delete
                  </Tooltip>
                }
                >
                <FontAwesomeIcon icon={faTrashAlt} />
                </OverlayTrigger>
              </span>
            </td>
          </StyledRow>
        );
      });
    return (
      <Col>
        <Row>
          <Col>
            <Form>
              <FormGroup controlId="newTemplateName">
                <InputGroup className="mb-3">
                  <FormControl
                    placeholder="New"
                    aria-label="New template"
                    value={this.state.newTemplateName}
                    onChange={this.handleChange}
                  />
                  <InputGroup.Append>
                    <Button
                      variant="outline-secondary"
                      onClick={this.handleTemplateCreate}
                      onMouseDown={e => e.preventDefault()}
                    >
                      Create
                    </Button>
                  </InputGroup.Append>
                </InputGroup>
              </FormGroup>
            </Form>
          </Col>
        </Row>
        <Row>
          <Table hover borderless>
            <tbody>{templateList}</tbody>
          </Table>
        </Row>
      </Col>
    );
  }
}

export default TemplateSideBar;

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
    this.handleTemplateDelete = this.handleTemplateDelete.bind(this);
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

  handleTemplateDelete = e => {
    console.log(e.currentTarget.id);
    db.collection("templates")
      .doc(e.currentTarget.id)
      .delete()
      .then( ()=> {
        console.log("Document successfully deleted!");
      })
      .catch(error => {
        console.error("Error removing document: ", error);
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
              <span id="template-controls" style={{ display: "none" }}>
                <OverlayTrigger
                  key={`trigger-copy-${template.key}`}
                  placement="bottom"
                  overlay={
                    <Tooltip id={`tooltip-copy-${template.key}`}>Copy</Tooltip>
                  }
                >
                  <FontAwesomeIcon icon={faClone} />
                </OverlayTrigger>{" "}
                <OverlayTrigger
                  key={`trigger-delete-${template.key}`}
                  placement="bottom"
                  overlay={
                    <Tooltip key={`tooltip-delete-${template.key}`}>
                      Delete
                    </Tooltip>
                  }
                >
                  <span onClick={this.handleTemplateDelete} id={template.key}>
                    <FontAwesomeIcon icon={faTrashAlt} value={template.key} />
                  </span>
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
                    placeholder="Name"
                    aria-label="name of new template"
                    value={this.state.newTemplateName}
                    onChange={this.handleChange}
                    onKeyPress={(e) => { e.key === 'Enter' && e.preventDefault(); }}
                  />
                  <InputGroup.Append>
                    <Button
                      type="button"
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

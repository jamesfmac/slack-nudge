import React from "react";
import { db } from "../utils/firebase";
import {createTemplate} from "../utils/templates"
import { Link } from "react-router-dom";


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


import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faTrashAlt} from "@fortawesome/free-regular-svg-icons";

class TemplateTable extends React.Component {
  constructor(props) {
    super(props);
    this.unsubscribe = null
    this.state = {
      newTemplateName: "",
      templates: []
    };
    this.baseState = this.state;
    this.handleTemplateDelete = this.handleTemplateDelete.bind(this);
  }

  handleTemplateCreate = e => {
    e.preventDefault();
    createTemplate(this.state.newTemplateName, this.handleCreateResponse)
  };

  handleCreateResponse = (error,templateID)=>{
    if(error){

    }
    else{
  
      this.props.history.push(`templates/edit/${templateID}`)

    }

  }
  onCollectionUpdate = (querySnapshot) => {
    let templates = [];
    querySnapshot.forEach(doc => {
      const { name, createdAt } = doc.data();
      templates.push({
        doc: doc, // DocumentSnapshot
        createdAt,
        name: name,
        key: doc.id,
      
      });
    });
    this.setState({
      templates: templates
    });
  }


  handleTemplateDelete = e => {

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
    this.unsubscribe = 
    db.collection("templates").onSnapshot(this.onCollectionUpdate);
  }

  compon(){
    this.unsubscribe()
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
          <tr key = {template.key}>
            <td><Link to={`/templates/edit/${template.key}`}>{template.name}</Link></td>
            <td style={{ textAlign: "right" }}>
              <span id="template-controls" >
                <OverlayTrigger
                  key={`trigger-delete-${template.key}`}
                  placement="bottom"
                  overlay={
                    <Tooltip key={`tooltip-delete-${template.key}`}>
                      No going back!
                    </Tooltip>
                  }
                >
                  
                  <Button variant="outline-danger" size = "sm" onClick={this.handleTemplateDelete} id={template.key}>
                    <FontAwesomeIcon icon={faTrashAlt} value={template.key} /> Delete
                  </Button>
                  
                </OverlayTrigger>
              </span>
            </td>
          </tr>
        );
      });
    return (
      <Col md={{ span: 9}}>
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
                      variant="primary"
                      onClick={this.handleTemplateCreate}
                      onMouseDown={e => e.preventDefault()}
                    >
                      Create Template
                    </Button>
                  </InputGroup.Append>
                </InputGroup>
              </FormGroup>
            </Form>
          </Col>
        </Row>
        <Row>
          <Table striped borderless>
            <thead>
             <tr>
               <th>Name</th>
             </tr>
            </thead>
            <tbody>{templateList}</tbody>
          </Table>
        </Row>
      </Col>
    );
  }
}

export default TemplateTable;

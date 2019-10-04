import React from "react";
import Dropdown from "react-bootstrap/Dropdown";
import { db } from "../utils/firebase";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLayerGroup } from "@fortawesome/free-solid-svg-icons";


class TemplateSelector extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      templates: []
    };
  }

  componentDidMount() {
    db.collection("templates").onSnapshot(querySnapshot => {
      let templates = [];
      querySnapshot.forEach(doc => {
        const { name, content } = doc.data();
        templates.push({
          id:doc.id,
         name,
         content

      }
        );
      });
      this.setState({
        templates: templates
      })
     console.log(templates)
    });
  }

  applyTemplate = id => {

    this.props.applyTemplate(
        
      this.state.templates.find(o => o.id === id).content
    );
  };

  render() {

    let templates = this.state.templates.map(template=>(
      <Dropdown.Item key={template.id} onClick={e => {
     
        this.applyTemplate(template.id);
      }}>
        {template.name}
      </Dropdown.Item>
    )

    )
    return (
      
          <Dropdown onMouseDown={e => e.preventDefault()}>
            <Dropdown.Toggle variant="outline-primary" id="dropdown-basic">
              <FontAwesomeIcon icon={faLayerGroup} /> Apply Template
            </Dropdown.Toggle>

            <Dropdown.Menu>
            {templates}
            </Dropdown.Menu>
          </Dropdown>
     
    );
  }
}

export default TemplateSelector;

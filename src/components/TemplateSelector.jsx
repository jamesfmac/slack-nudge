import React, { Component } from "react";
import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from "react-bootstrap/Dropdown";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLayerGroup } from "@fortawesome/free-solid-svg-icons";

const Templates = [
  {
    templateID: 123,
    templateName: "Need Help Connecting Jira?",
    formState: {
      formTouched: true,
      attachButton: true,
      recipients: "jamesm@stratejos.ai",
      msgText: "Hey",
      msgBody:
        "Hey Jason,\n\n It looks like you might have had trouble connecting Jira? Once connected I can help you:\n\n    :fire: Get scheduled custom messages\n    :fire: Create and update issues from Slack\n    :fire: Unfurl Jira URL's in Slack\n\n Connecting is easy, just click below to get started.",
      btnLabel: ":zap: Connect Jira",
      btnURL:
        "https://app.stratejos.com/#/organisation/jira-integration-instructions",
      supportBody: "Need support? Email my friendly creators hello@stratejos.ai"
    }
  },

  {
    templateID: 124,
    templateName: "Trial Expiring?",
    formState: {
      formTouched: true,
      attachButton: true,
      recipients: "jamesm@stratejos.ai",
      msgText: "Your trial ends soon ",
      msgBody:
        "Hey Jason,\n\n your 14 day trial of my teams plan comes to an end soon. If you are ready to upgrade please click below",
      btnLabel: "View Invoice",
      btnURL:
        "https://app.stratejos.com/#/organisation/jira-integration-instructions",
      supportBody:
        "Need an  extended trial? Email my friendly creators hello@stratejos.ai"
    }
  }
];

class TemplateSelector extends React.Component {
  applyTemplate = id => {
    console.log(id)
    console.log( Templates.find(o => o.templateID === id) )
    this.props.applyTemplate(
        
      Templates.find(o => o.templateID === id).formState
    );
  };

  render() {
    return (
      
          <Dropdown onMouseDown={e => e.preventDefault()}>
            <Dropdown.Toggle variant="outline-primary" id="dropdown-basic">
              <FontAwesomeIcon icon={faLayerGroup} /> Apply Template
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item
               
                onClick={e => {
                  this.applyTemplate(123);
                }}
              >
                Connect Jira?
              </Dropdown.Item>
              <Dropdown.Item
                templateid={124}
                onClick={e => {
                    this.applyTemplate(124);
                }}
              >
                Trial expiring
              </Dropdown.Item>
              <Dropdown.Item href="#/action-3">Trial over</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
     
    );
  }
}

export default TemplateSelector;

import React, { Component } from "react";
import Dropdown from "react-bootstrap/Dropdown";



import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLayerGroup } from "@fortawesome/free-solid-svg-icons";

const Templates = [
  {
    templateID: 123,
    templateName: "Need Help Connecting Jira?",
    formState: {
      formTouched: true,
      attachButton: true,
      
      msgText: "Don't forget to connect Jira",
      msgBody:
        "Hey Jason,\n\n It looks like you might have had trouble connecting Jira? Once connected I can help you:\n\n    :fire: Get scheduled custom messages\n    :fire: Create and update Jira issues from Slack\n    :fire: Unfurl Jira URL's in Slack\n\n Connecting is easy, just click below to get started.",
      btnLabel: ":zap: Connect Jira",
      btnURL:
        "https://app.stratejos.com/#/organisation/jira-integration-instructions",
      supportBody: "Need support? Email my friendly creators hello@stratejos.ai"
    }
  },

  {
    templateID: 124,
    templateName: "Custom messages enabled",
    formState: {
      formTouched: true,
      attachButton: true,
      
      msgText: "You now have access to custom messages :tada:",
      msgBody:
        ":tada: Custom messages have been enabled for your team! :tada:\n\n Create custom scheduled messages to:\n\n:fire: Get a daily update on progress\n:fire: Get weekly highlights on completed issues\n:fire: Get a daily update on bugs raised vs  completed ",
        btnLabel: "Create my message",
      btnURL:
        "https://stratejos.ai/scheduled-messages/new?utm_source=slack&utm_medium=dm",
      supportBody:
        "Have questions? Email my friendly creators hello@stratejos.ai"
    }
  },
  {
    templateID: 125,
    templateName: "Trial Expiring?",
    formState: {
      formTouched: true,
      attachButton: true,
      
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

    let templates = Templates.map(template=>(
      <Dropdown.Item key={template.id} onClick={e => {
        this.applyTemplate(template.templateID);
      }}>
        {template.templateName}
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

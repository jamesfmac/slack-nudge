import axios from "./axios";
import { db } from "./firebase";
import {saveMessageAttempt} from './saveMessage'

const submitMessage = function(
  author,
  handleError,
  handleSuccess,
  recipients,
  msgText,
  msgBody,
  supportBody,
  btn,
  isTest
) {
  let message = {
    type: "section",
    text: {
      type: "mrkdwn",
      text: msgBody
    }
  };

  let help = [
    {
      type: "divider"
    },
    {
      type: "section",
      text: {
        type: "mrkdwn",
        text: supportBody
      }
    }
  ];
  let button = [];
  if (btn) {
    button = [
      {
        type: "section",
        text: {
          type: "plain_text",
          text: " ",
          emoji: true
        }
      },
      {
        type: "actions",
        elements: [
          {
            type: "button",
            text: {
              type: "plain_text",
              text: btn.label,
              emoji: true
            },
            value: "connect Jira",
            url: btn.url
          }
        ]
      },
      {
        type: "section",
        text: {
          type: "plain_text",
          text: " ",
          emoji: true
        }
      }
    ];
  }
  let blocks = [message].concat(button).concat(help);
  let messageID = null

  const setMessageID =function(ID){
    messageID = ID;
  }
 console.log([recipients])
  saveMessageAttempt(author, msgText, blocks, recipients, setMessageID, isTest )
  

  db.collection("config")
    .doc("stratejos")
    .get()
    .then(doc => {
      if (doc.exists) {
        let credentials = doc.data();
        axios
          .post("/messages/ondemand", {
            credentials,
            recipients: recipients,
            message: {
              text: msgText,
              blocks: blocks
            }
          })
          .then(function(response) {
            console.log(response)
            isTest? 
            handleSuccess(messageID, response, isTest =true):
            handleSuccess(messageID, response)
          })
          .catch(function(error) {
            //handles the error response from axios
            handleError(messageID, error)
          });
      } 
    })
    .catch(error => {
      //handles error from getting the doc.
      handleError('Message failed. You are missing permissions')
      console.log(messageID,`Error getting config: ${error}`);
    });
    






};

export default submitMessage;

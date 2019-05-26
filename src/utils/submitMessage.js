import axios from "./axios";
import { db } from "./firebase";

const submitMessage = function(
  handleError,
  handleSuccess,
  recipients,
  msgText,
  msgBody,
  supportBody,
  btn
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

  db.collection("config")
    .doc("stratejos")
    .get()
    .then(doc => {
      if (doc.exists) {
        let credentials = doc.data();
        axios
          .post("/messages/ondemand", {
            credentials,
            recipients: [recipients],
            message: {
              text: msgText,
              blocks: blocks
            }
          })
          .then(function(response) {
            console.log(response);
            handleSuccess()
          })
          .catch(function(error) {
            console.log(error);
            handleError(error)
          });
      } else {
        console.log(`No config found`)
        handleError('Missing organization config');
      }
    })
    .catch(error => {
      console.log(`Error getting config: ${error}`);
    });
};

export default submitMessage;

import { db } from "./firebase";


export const saveMessageAttempt = function(
  author,
  msgText,
  blocks,
  recipients,
  setMessageID,
  isTest
) {

const emails = recipients.map(recpient =>
  recpient.email)

  db.collection("messages")
    .add({
      message: {
        text: msgText,
        blocks: blocks
      },
      recipients: emails,
      test: isTest || false,
      submittedAt: Math.round(new Date().getTime() / 1000), //create unix timestamp
      author: author,
      response: {
        data:"",
        responseTime:"",
        status:""
      }

    })
    .then(function(docRef) {
      console.log("Document written with ID: ", docRef.id);
      setMessageID(docRef.id);
    })
    .catch(function(error) {
      console.error("Error adding document: ", error);
    });
};

export const saveMessageResponse = function(messageID, response) {
  db.collection("messages")
    .doc(messageID)
    .set(
      {
        response: {
          responseTime: Math.round(new Date().getTime() / 1000), // create unix timestamp
          data: response.data,
          status: response.status
        }
      },
      { merge: true }
    )
    .then(function() {
      console.log(`Document ${messageID} set`);
    })
    .catch(function(error) {
      console.error("Error updating document: ", error);
    });
};

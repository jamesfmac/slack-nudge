import { db } from "./firebase";
import firebase from 'firebase';

export const saveMessageAttempt = function(
  author,
  msgText,
  blocks,
  recipients,
  setMessageID,
  isTest
) {
  db.collection("messages")
    .add({
      message: {
        text: msgText,
        blocks: blocks
      },
      recipients: [recipients],
      test: isTest || false,
      submittedAt: new Date().getTime(),
      author: author

    })
    .then(function(docRef) {
      console.log("Document written with ID: ", docRef.id);
      setMessageID(docRef.id)
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
        response:{
        responseTime: new Date().getTime(),
        data: response.data,
        status: response.status
        }
      }
     ,
      { merge: true }
    )
    .then(function() {
      console.log(`Document ${messageID} set`);
    })
    .catch(function(error) {
      console.error("Error updating document: ", error);
    });
};
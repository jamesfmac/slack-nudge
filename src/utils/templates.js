

import { db } from "./firebase";

export const updateTemplate = function(
   templateID, content
  ) {
      console.log(`updating template ${templateID}`)

    db.collection("templates")
    .doc(templateID)
    .set({
           content
      },
      {merge: true}
      )
      .then(function(docRef) {
        console.log(`Template updated: ${templateID}`);
     
      })
      .catch(function(error) {
        console.error("Error updating template: ", error);
      })
  };

export const createTemplate = function (templateName, callback){
    db.collection("templates")
      .add({
        name: templateName,
        content:{
          msgText: "",
            msgBody: "",
            btnLabel: "" ,
            btnURL: "" ,
            supportBody: "",
            attachButton: true,
        },
        createdAt: Math.round(new Date().getTime() / 1000) //create unix timestamp
      })
      .then(docRef => {
        console.log("Document written with ID: ", docRef.id);
        callback(null,docRef.id)
      })
      .catch(error => {
        console.error("Error adding document: ", error);
        callback(error)
      });
  };

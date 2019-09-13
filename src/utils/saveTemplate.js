

import { db } from "./firebase";

export const saveTemplate = function(
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
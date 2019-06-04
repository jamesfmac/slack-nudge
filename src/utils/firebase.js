

import firebase from 'firebase';
import 'firebase/firestore';
console.log(process.env.REACT_APP_FIREBASE_PROJECTID)
  const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_APIKEY ,
    authDomain: process.env.REACT_APP_FIREBASE_AUTHDOMAIN,
    databaseURL: process.env.REACT_APP_FIREBASE_DATABASEURL,
    projectId: process.env.REACT_APP_FIREBASE_PROJECTID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGEBUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGINGSENDERID,
    appId: process.env.REACT_APP_FIREBASE_APPID
  };
  // Initialize Firebase

  export const Firebase = firebase.initializeApp(firebaseConfig) 

  export const db = Firebase.firestore();
  export const provider = new firebase.auth.GoogleAuthProvider();
  export const fireAuth = firebase.auth();



  export default Firebase
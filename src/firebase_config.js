import firebase from "firebase";

  // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyBLOQM9o6UW5_HizqdR0hgd1qu9XQUHHjk",
    authDomain: "todoapp-84746.firebaseapp.com",
    databaseURL: "https://todoapp-84746.firebaseio.com",
    projectId: "todoapp-84746",
    storageBucket: "todoapp-84746.appspot.com",
    messagingSenderId: "962356074858",
    appId: "1:962356074858:web:0e32aa781699f8f5a4ed13"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();

export { db };

import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyCFXWztfaJA1SnC_e3KJnIZmbk35pM5kF8",
  authDomain: "codefury-4b3c7.firebaseapp.com",
  projectId: "codefury-4b3c7",
  storageBucket: "codefury-4b3c7.appspot.com",
  messagingSenderId: "568970523797",
  appId: "1:568970523797:web:14b0ad727b0d9f9035179c",
};

const app = !firebase.apps.length
  ? firebase.initializeApp(firebaseConfig)
  : firebase.app();

const db = app.firestore();

export default db;

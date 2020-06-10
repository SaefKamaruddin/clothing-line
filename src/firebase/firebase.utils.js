import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyAF2-CUGqOjzkXZTIv9LqEHWI-k7aephOY",
  authDomain: "clothing-line-db.firebaseapp.com",
  databaseURL: "https://clothing-line-db.firebaseio.com",
  projectId: "clothing-line-db",
  storageBucket: "clothing-line-db.appspot.com",
  messagingSenderId: "462597905252",
  appId: "1:462597905252:web:f40e0eb03ca9ef48c1b871",
  measurementId: "G-KXC7XR07QX",
};

firebase.initializeApp(config);

export const auth = firebase.auth();

export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;

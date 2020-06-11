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

export const createUserProfileDocument = async (userAuth, additionalData) => {
  // if there is no userAUth exit function
  if (!userAuth) return;

  //this is making a reference to the current user id
  const userRef = firestore.doc(`users/${userAuth.uid}`);

  //.get pulls a snapshot object. in this context to determine if exists is true or false
  const snapShot = await userRef.get();
  console.log(snapShot);

  //if snapshot doesnot exist, ie if user id is not in the db, we will create a new user object
  //from userAuth, for now the info logged is display name , email and the date the acc is create
  //  .set is the create method
  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData,
      });
    } catch (error) {
      console.log("error creating user", error.message);
    }
  }
  return userRef;
};

firebase.initializeApp(config);

export const auth = firebase.auth();

export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;

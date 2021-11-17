import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/auth";
import { getAuth, updateProfile } from "firebase/auth";

const config = JSON.parse(process.env.REACT_APP_FIREBASE_CONFIG);

firebase.initializeApp(config);

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

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

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = async () => auth.signInWithPopup(provider);

export const login = (email, password) =>
  auth.signInWithEmailAndPassword(email, password);

export const logout = () => auth.signOut();

export const register = (name, email, password, afterProfileUpdation) => {
  const displayName = name;
  auth.createUserWithEmailAndPassword(email, password).then(() => {
    createUserProfileDocument(auth.currentUser, {
      displayName,
    })
      .then(() => {
        afterProfileUpdation({
          ...auth.currentUser,
          displayName,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  });
};

export const getCurrentUsername = () => {
  return auth.currentUser && auth.currentUser.displayName;
};

export default firebase;

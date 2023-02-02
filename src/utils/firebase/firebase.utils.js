import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";

import {
  getFireStore,
  doc,
  getDoc,
  setDoc,
  getFirestore,
} from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCjYEzu7IJi9iypzO5IWMhcEvcYLOSpRhQ",
  authDomain: "react-project-6ed03.firebaseapp.com",
  projectId: "react-project-6ed03",
  storageBucket: "react-project-6ed03.appspot.com",
  messagingSenderId: "315217002072",
  appId: "1:315217002072:web:4ee5452eb91c55db29d42d",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();

provider.setCustomParameters({
  prompt: "select_account",
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth) => {
  const userDocRef = doc(db, "users", userAuth.uid);
  console.log(userAuth);

  const userSnapshot = await getDoc(userDocRef);
  console.log(userSnapshot);
  console.log(userSnapshot.exists());

  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const  createdAt  = new Date();

    try {
        await setDoc(userDocRef, {displayName, email, createdAt});
    } catch(error) {
        console.log('error creating user', error.message);
    }
  }

  return userDocRef;
};

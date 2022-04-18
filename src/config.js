import { initializeApp } from 'firebase/app';
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"
const fireBase = {
  apiKey: "AIzaSyAgxswDW9RzrNIwxf0uTCgyIP0a0TH3Rls",
  authDomain: "v-guard-3acbe.firebaseapp.com",
  projectId: "v-guard-3acbe",
  storageBucket: "v-guard-3acbe.appspot.com",
  messagingSenderId: "43458249321",
  appId: "1:43458249321:web:4ed41439bfb56f3928d8f8",
};

const firebaseConfig = initializeApp(fireBase);
const Auth = getAuth(firebaseConfig);
const db = getFirestore();
export { Auth, db };

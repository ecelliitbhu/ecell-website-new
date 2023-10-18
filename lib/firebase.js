import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyDbsm5M2sn-sD0oSlDhTkojTcEnH0el8lU",
  authDomain: "e-cell-iit-bhu-website.firebaseapp.com",
  databaseURL: "https://e-cell-iit-bhu-website-default-rtdb.firebaseio.com",
  projectId: "e-cell-iit-bhu-website",
  storageBucket: "e-cell-iit-bhu-website.appspot.com",
  messagingSenderId: "691224169862",
  appId: "1:691224169862:web:ad2a54774e305ba27c7007",
  measurementId: "G-LM82P1XP52",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);
// Get a reference to the database service
export const firebaseDB = getDatabase(app);
export const firestoreDB = firestore;
export const firebaseconfig=firebaseConfig
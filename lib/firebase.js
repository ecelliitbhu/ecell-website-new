import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
const firebaseConfig = {
  apiKey: "AIzaSyDbsm5M2sn-sD0oSlDhTkojTcEnH0el8lU",
  authDomain: "e-cell-iit-bhu-website.firebaseapp.com",
  databaseURL: "https://e-cell-iit-bhu-website-default-rtdb.firebaseio.com",
  projectId: "e-cell-iit-bhu-website",
  storageBucket: "e-cell-iit-bhu-website.appspot.com",
  messagingSenderId: "691224169862",
  appId: "1:691224169862:web:45f2e39f3dd3f22b7c7007",
  measurementId: "G-8KP83XED63",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Get a reference to the database service
export const firebaseDB = getDatabase(app)

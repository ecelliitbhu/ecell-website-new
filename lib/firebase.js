import { initializeApp, getApps, getApp } from 'firebase/app';
import { getDatabase } from "firebase/database";
const firebaseConfig = {
  apiKey: "AIzaSyCjAmW0cbLgb-HSN8GZ4otW_dOxm1w9Gsk",
  authDomain: "e-cell-iit-bhu.firebaseapp.com",
  databaseURL: "https://e-cell-iit-bhu-default-rtdb.firebaseio.com",
  projectId: "e-cell-iit-bhu",
  storageBucket: "e-cell-iit-bhu.appspot.com",
  messagingSenderId: "656789673480",
  appId: "1:656789673480:web:b1324dba4f17884ab1e3bd",
  measurementId: "G-BGE65NNDEZ"
};

// Initialize Firebase
var app;
getApps().length === 0 ? app=initializeApp(firebaseConfig) : app=getApp();
// Get a reference to the database service
export const firebaseDB = getDatabase(app);
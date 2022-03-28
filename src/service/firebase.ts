
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getDatabase} from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
export const firebaseConfig = {
  apiKey: "AIzaSyBDR0o-9IdWcPfTgDqdqJV36Deas0YXlqQ",
  authDomain: "mydiary-2cfc2.firebaseapp.com",
  databaseURL: "http://mydiary-2cfc2.firebaseio.com",
  projectId: "mydiary-2cfc2",
  storageBucket: "mydiary-2cfc2.appspot.com",
  messagingSenderId: "694169341785",
  appId: "1:694169341785:web:65ec5535822314b6fe8648",
  measurementId: "G-YPFZ652375"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const database = getDatabase(app);

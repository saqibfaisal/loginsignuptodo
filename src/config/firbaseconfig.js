// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBZVn6W14cpASOVFZUIuepSmxh4vXhktPI",
  authDomain: "api-6b2a2.firebaseapp.com",
  projectId: "api-6b2a2",
  storageBucket: "api-6b2a2.appspot.com",
  messagingSenderId: "623582339771",
  appId: "1:623582339771:web:dfd98a35e9637f3926bf9e",
  measurementId: "G-2QJ3MDENZT"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export default app
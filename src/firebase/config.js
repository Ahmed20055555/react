// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBypTK6UhlXp9fzNfLcOawItED5LbBhjVU",
  authDomain: "react2-lesson-813b8.firebaseapp.com",
  projectId: "react2-lesson-813b8",
  storageBucket: "react2-lesson-813b8.firebasestorage.app",
  messagingSenderId: "583885761593",
  appId: "1:583885761593:web:569a7cdc5c3786eca9b1e8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
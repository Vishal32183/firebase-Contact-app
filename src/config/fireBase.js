// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAUFtRWWqkoj-TrnWUbEw6fYK64lOJNJJY",
  authDomain: "vite-contact-c01f9.firebaseapp.com",
  projectId: "vite-contact-c01f9",
  storageBucket: "vite-contact-c01f9.appspot.com",
  messagingSenderId: "213482024554",
  appId: "1:213482024554:web:42d55ea91f316dc98e6413"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
 export const db =getFirestore(app)
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_apiKey,
  authDomain: "store-3b8a7.firebaseapp.com",
  projectId: "store-3b8a7",
  storageBucket: "store-3b8a7.firebasestorage.app",
  messagingSenderId: "1046712801843",
  appId: "1:1046712801843:web:2c28ab9902fa2d4c50a146",
  measurementId: "G-SKVRXBXTFM",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);

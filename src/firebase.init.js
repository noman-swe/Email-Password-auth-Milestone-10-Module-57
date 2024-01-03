// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA3l9s1wxN3iVPnXHokuIGkfHMce48cZbg",
  authDomain: "email-password-auth-e3c85.firebaseapp.com",
  projectId: "email-password-auth-e3c85",
  storageBucket: "email-password-auth-e3c85.appspot.com",
  messagingSenderId: "329365692353",
  appId: "1:329365692353:web:49a4d72fcc2306ab4a1940",
  measurementId: "G-GD4R5E1T5D"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export default app;
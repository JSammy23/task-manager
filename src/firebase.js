// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDw3O8dV0a5CYZCC535XcRTrTN3Qfd-My4",
  authDomain: "task-manager-650f8.firebaseapp.com",
  projectId: "task-manager-650f8",
  storageBucket: "task-manager-650f8.appspot.com",
  messagingSenderId: "1019165004884",
  appId: "1:1019165004884:web:e4b8bd5c2fb03b3af989c1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;
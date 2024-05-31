 // Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCJA1pZQKmr5G1wIOBb0ec7K4pirgECNX8",
    authDomain: "course-app-75cab.firebaseapp.com",
    projectId: "course-app-75cab",
    storageBucket: "course-app-75cab.appspot.com",
    messagingSenderId: "1052486149279",
    appId: "1:1052486149279:web:04627db81f1406af5eeeaa",
  };
  
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  // Initialize Cloud Firestore and get a reference to the service
  export const db = getFirestore(app);
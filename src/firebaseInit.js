// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCj9XZF43-I5R-MgPrdd-xhYSMOwL3b2LA",
  authDomain: "monkeyphotos-6ffb3.firebaseapp.com",
  projectId: "monkeyphotos-6ffb3",
  storageBucket: "monkeyphotos-6ffb3.appspot.com",
  messagingSenderId: "425390000831",
  appId: "1:425390000831:web:7df61fd8f1d79f4df9d40a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA59aWBCAmkVOHwlTZq9BcHI86ciQ1o3sc",
  authDomain: "reactfirebase-abd72.firebaseapp.com",
  projectId: "reactfirebase-abd72",
  storageBucket: "reactfirebase-abd72.firebasestorage.app",
  messagingSenderId: "619272436638",
  appId: "1:619272436638:web:9f90727aba4065e06d748f",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };

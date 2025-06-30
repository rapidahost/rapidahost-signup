// /firebase/config.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyC0PHiq8KuosFDUu9oDbQkBULJfc5TWTBk",
  authDomain: "rapidahost-a8660.firebaseapp.com",
  projectId: "rapidahost-a8660",
  storageBucket: "rapidahost-a8660.appspot.com",
  messagingSenderId: "387960126750",
  appId: "1:387960126750:web:27cd9e3c40c06f6c3298a1"
};

// Initialize Firebase App
const app = initializeApp(firebaseConfig);

// Export Authentication Instance
export const auth = getAuth(app);

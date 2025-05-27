// src/firebase.js
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyCj7rO6gjyGwSeVj1ZJMDDSZx31RtSMff4",
  authDomain: "lenses-quiz.firebaseapp.com",
  databaseURL: "https://lenses-quiz-default-rtdb.firebaseio.com",
  projectId: "lenses-quiz",
  storageBucket: "lenses-quiz.appspot.com",
  messagingSenderId: "940718346699",
  appId: "1:940718346699:web:f5b88d212886e31862e64e",
  measurementId: "G-S9V1ZMR3JG",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getDatabase(app); // ✅ استخدام Realtime DB

export { db };

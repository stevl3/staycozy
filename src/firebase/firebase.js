// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBFyek2VCzbsGx3ANyA92mJS2o8vD9xk6o",
  authDomain: "access-control-system-b1fb1.firebaseapp.com",
  projectId: "access-control-system-b1fb1",
  storageBucket: "access-control-system-b1fb1.firebasestorage.app",
  messagingSenderId: "801521899889",
  appId: "1:801521899889:web:db7160e2d87af67fe73ed0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);

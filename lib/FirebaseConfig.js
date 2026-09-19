// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCQSgAUs466BxxOnaYBPG0vQGLbt8blQEQ",
  authDomain: "darazplay-92585.firebaseapp.com",
  projectId: "darazplay-92585",
  storageBucket: "darazplay-92585.firebasestorage.app",
  messagingSenderId: "5699716851",
  appId: "1:5699716851:web:383eec5769f217c1f2d986"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export default auth;
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAJ8XiVo5E85JAWTssZaAkT2CgAP6SqAvc",
  authDomain: "airfin-6a718.firebaseapp.com",
  projectId: "airfin-6a718",
  storageBucket: "airfin-6a718.firebasestorage.app",
  messagingSenderId: "750170650292",
  appId: "1:750170650292:web:02878ec432cfbc92b309e1",
  measurementId: "G-S93RM5H9HQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
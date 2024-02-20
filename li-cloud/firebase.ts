// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDAddmYxKw-1oWOZg2rkRyxP_SQu_raQYk",
  authDomain: "li-cloud-web-app.firebaseapp.com",
  projectId: "li-cloud-web-app",
  storageBucket: "li-cloud-web-app.appspot.com",
  messagingSenderId: "680634580022",
  appId: "1:680634580022:web:34ef548e860163f918ac97",
  measurementId: "G-GNRG7B36XJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
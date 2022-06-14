// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDISoG3WY02ZnyMIz7coHNoynejfG39OTA",
  authDomain: "next-reels.firebaseapp.com",
  projectId: "next-reels",
  storageBucket: "next-reels.appspot.com",
  messagingSenderId: "150609612898",
  appId: "1:150609612898:web:6689089ef18ed09b2bc13b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const storage = getStorage();
export { auth, storage };
export default app;

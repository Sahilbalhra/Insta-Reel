// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyABtHPrPdKMwqNt41ujK_3o-GQl88KdlCM",
  authDomain: "reels-next-yt-273f7.firebaseapp.com",
  projectId: "reels-next-yt-273f7",
  storageBucket: "reels-next-yt-273f7.appspot.com",
  messagingSenderId: "748556218319",
  appId: "1:748556218319:web:6ae8c9233226d236822cba",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
export { auth };
export default app;

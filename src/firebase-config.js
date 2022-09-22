import firebase from "firebase/compat/app";
import { getFirestore } from "firebase/firestore";


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDH3yDyf45coJgxf0rV2zOsQSdoUV6Yib4",
  authDomain: "house-marketplace-6af85.firebaseapp.com",
  projectId: "house-marketplace-6af85",
  storageBucket: "house-marketplace-6af85.appspot.com",
  messagingSenderId: "429942655289",
  appId: "1:429942655289:web:db07a0cab98dbd900740e8"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
export const db= getFirestore()


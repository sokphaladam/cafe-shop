import { initializeApp, getApps } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyARVL8h6pSf-sfSLIKygAOz0KeLZH8ZKMQ",
  authDomain: "files-98ece.firebaseapp.com",
  projectId: "files-98ece",
  storageBucket: "files-98ece.appspot.com",
  messagingSenderId: "423213190640",
  appId: "1:423213190640:web:14a9d1bc98eeeddcf8a135",
};

let firebase_app =
  getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

export default firebase_app;

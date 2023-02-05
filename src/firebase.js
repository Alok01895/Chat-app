import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDGD2VjS_wY7T75Zx6n_itEKY17PqoWJtk",
  authDomain: "lets-chat-1bb07.firebaseapp.com",
  projectId: "lets-chat-1bb07",
  storageBucket: "lets-chat-1bb07.appspot.com",
  messagingSenderId: "838640660322",
  appId: "1:838640660322:web:abdc348cda53b1eb3d863b"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db=getFirestore()
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider} from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAEWuUC2U7oJ8a4sGskqe7ZEdXl7dVuwS8",
  authDomain: "fir-68245.firebaseapp.com",
  projectId: "fir-68245",
  storageBucket: "fir-68245.appspot.com",
  messagingSenderId: "897903277640",
  appId: "1:897903277640:web:d2068633c121d020fb8a7d"
};

const app = initializeApp(firebaseConfig);
export const AUTH = getAuth(app);
export const STORAGE = getFirestore(app);
export const GoogleAccount = new GoogleAuthProvider();

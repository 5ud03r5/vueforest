import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { collection } from "firebase/firestore";

/* const firebaseConfig = {
  apiKey: "AIzaSyB25Unyl8j60czijd93Hfsu8ztnFxE9rqM",
  authDomain: "vueforest-341ed.firebaseapp.com",
  databaseURL:
    "https://vueforest-341ed-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "vueforest-341ed",
  storageBucket: "vueforest-341ed.appspot.com",
  messagingSenderId: "589818863002",
  appId: "1:589818863002:web:91b9261f273fb48ec66e23",
  measurementId: "G-RZMHDTLSDG",
}; */

const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: import.meta.env.VITE_AUTH_DOMAIN,
  databaseURL: import.meta.env.VITE_DATABASE_URL,
  projectId: import.meta.env.VITE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_APP_ID,
  measurementId: import.meta.env.VITE_MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore(app);
const usersCollection = collection(db, "users");
const postsCollection = collection(db, "posts");
export { auth, db, usersCollection, postsCollection };

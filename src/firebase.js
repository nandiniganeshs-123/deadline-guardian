import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyB31gH1EnBpXp-Vg7U0SkYKZWTCpFRZByI",
  authDomain: "deadline-guardian-d21ae.firebaseapp.com",
  projectId: "deadline-guardian-d21ae",
  storageBucket: "deadline-guardian-d21ae.firebasestorage.app",
  messagingSenderId: "626558397786",
  appId: "1:626558397786:web:74a594a0db7c5bb22a9763",
  measurementId: "G-R9GGMLGSE4",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
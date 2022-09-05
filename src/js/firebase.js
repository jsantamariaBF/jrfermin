import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBr2S9ZQWhyv-kDmKWh7gyJr-MNy-dch9k",
  authDomain: "noteballs-3e6b2.firebaseapp.com",
  projectId: "noteballs-3e6b2",
  storageBucket: "noteballs-3e6b2.appspot.com",
  messagingSenderId: "105965237406",
  appId: "1:105965237406:web:2c0ea050f497db634af78f",
  measurementId: "G-R4P63JMVMT"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const analytics = getAnalytics(app);
const auth = getAuth(app);

export {
    db,
    auth
}
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAUrtj_JX7LHWhpXwkjr7Jut1jkjvI3N0c",
  authDomain: "photofolio-d0c33.firebaseapp.com",
  projectId: "photofolio-d0c33",
  storageBucket: "photofolio-d0c33.appspot.com",
  messagingSenderId: "77670969014",
  appId: "1:77670969014:web:cb54016a738baa45214017"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export{db}
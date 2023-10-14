// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import 'firebase/compat/firestore';
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyChUpUQymC8y8RySMY61dbUlTaxMG4sxn4",
  authDomain: "netflix-clone-ba64d.firebaseapp.com",
  projectId: "netflix-clone-ba64d",
  storageBucket: "netflix-clone-ba64d.appspot.com",
  messagingSenderId: "808359137816",
  appId: "1:808359137816:web:da68ab8d39e477ecf7696d"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const db=getFirestore(firebaseApp);
const auth = getAuth(firebaseApp);
export {auth};
export default db

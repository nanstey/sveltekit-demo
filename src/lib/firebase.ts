// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAONM1c4TW-piaNvuB1j6GCjBdTaRgSwlY",
  authDomain: "sveltekit-demo-6d4b2.firebaseapp.com",
  projectId: "sveltekit-demo-6d4b2",
  storageBucket: "sveltekit-demo-6d4b2.appspot.com",
  messagingSenderId: "704543261733",
  appId: "1:704543261733:web:bb7ebe21c0c5d2a202ebcc",
  measurementId: "G-LY1W7K8HRH"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore();
export const auth = getAuth();
export const storage = getStorage();
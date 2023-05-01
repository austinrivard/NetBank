// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBq_qTESaGqYFv09zyKx2-d2nO28BUh4Xk",
  authDomain: "banking-app-5dba2.firebaseapp.com",
  projectId: "banking-app-5dba2",
  storageBucket: "banking-app-5dba2.appspot.com",
  messagingSenderId: "479300038254",
  appId: "1:479300038254:web:7a646baf442d71dab0007f",
  measurementId: "G-MRQFWNGHFH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export async function getUserToken(fallback) {
  const user = getAuth().currentUser;
  if (!user) fallback();
  const token = await user.getIdToken();
  return token;
}
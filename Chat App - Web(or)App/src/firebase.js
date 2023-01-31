import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

// require('dotenv').config();

console.log(process.env);

const firebaseConfig = {
  apiKey: process.env.REACT_APP_api_Key,
  authDomain: process.env.REACT_APP_auth_Domain,
  projectId: process.env.REACT_APP_project_Id,
  storageBucket: process.env.REACT_APP_storage_Bucket,
  messagingSenderId: process.env.REACT_APP_messaging_SenderId,
  appId: process.env.REACT_APP_app_Id
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore()

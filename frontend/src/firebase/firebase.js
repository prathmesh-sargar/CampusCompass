import { initializeApp } from "firebase/app";
import {getFirestore, collection} from 'firebase/firestore'
import { getStorage } from 'firebase/storage';
// import { getAuth } from 'firebase/auth';
const firebaseConfig = {
  apiKey: "AIzaSyCU3qPlFxzCiAZKBzizaXvEC1lUrUnoUtg",
  authDomain: "project-hub-2c8df.firebaseapp.com",
  projectId: "project-hub-2c8df",
  storageBucket: "project-hub-2c8df.appspot.com",
  messagingSenderId: "776701708158",
  appId: "1:776701708158:web:f06cc10c210a248519d52f"
//   apiKey: "AIzaSyC-A87FZXquxNv2DB_3XomDVqPvXzQXB4A",
//   authDomain: "campuscompass-2a3f2.firebaseapp.com",
//   projectId: "campuscompass-2a3f2",
//   storageBucket: "campuscompass-2a3f2.appspot.com",
//   messagingSenderId: "372954639397",
//   appId: "1:372954639397:web:eb4160914bc8aab99c23cc",
//   measurementId: "G-N8QLQ5XH5X"
};
const app = initializeApp(firebaseConfig);
// const auth = getAuth(app);
export const db = getFirestore(app);
export const moviesRef = collection(db, "movies");
export const reviewsRef = collection(db, "reviews");
export const imageDb = getStorage(app);


export default app;
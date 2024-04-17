// Import the functions you need from the SDKs you need
import { getApp, getApps, initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDx3LGJryKqNHe8vuEgau5-q-W91MnWz6w",
  authDomain: "animasive.firebaseapp.com",
  projectId: "animasive",
  storageBucket: "animasive.appspot.com",
  messagingSenderId: "556343981643",
  appId: "1:556343981643:web:c4308fe54816f58dc3bfce",
  measurementId: "G-SFWCNLG1RK",
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const analytics = getAnalytics(app);
const db = getFirestore();
const auth = getAuth();

export default app;
export { auth, db, analytics };

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import{useState, useEffect} from "react";
import{ref, onValue, getDatabase,set, push} from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAYh8iSKpnSR1iqMWHVamJx9J1Cones_Lc",
  authDomain: "nu-book-79ca9.firebaseapp.com",
  databaseURL: "https://nu-book-79ca9-default-rtdb.firebaseio.com",
  projectId: "nu-book-79ca9",
  storageBucket: "nu-book-79ca9.appspot.com",
  messagingSenderId: "289119586454",
  appId: "1:289119586454:web:8d36ab9b9e2fb3b9645ab7",
  measurementId: "G-W5XDJ29YJB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const firebase = initializeApp(firebaseConfig);
const database = getDatabase(firebase);

export const useData = (path, transform) => {
    const [data, setData] = useState();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState();
  
    useEffect(() => {
      const dbRef = ref(database, path);
      const devMode = !process.env.NODE_ENV || process.env.NODE_ENV === 'development';
      if (devMode) { console.log(`loading ${path}`); }
      return onValue(dbRef, (snapshot) => {
        const val = snapshot.val();
        if (devMode) { console.log(val); }
        setData(transform ? transform(val) : val);
        setLoading(false);
        setError(null);
      }, (error) => {
        setData(null);
        setLoading(false);
        setError(error);
      });
    }, [path, transform]);
  
    return [data, loading, error];
  };

  export const addData = (path, value) =>{
    push(ref(database, path), value);
  }

  export const setData = (path, value) => (
    set(ref(database, path), value)
  );
 

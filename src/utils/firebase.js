import * as firebase from "firebase/app";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAHy4H00RVd8qFOEcSmSP_BToX54kVspI8",
  authDomain: "devevents.firebaseapp.com",
  databaseURL: "https://devevents.firebaseio.com",
  projectId: "devevents",
  storageBucket: "devevents.appspot.com",
  messagingSenderId: "145499959755",
  appId: "1:145499959755:web:8e02b50290d36848db064e",
  measurementId: "G-2N705HVZ67"
};

firebase.initializeApp(firebaseConfig);

export { firebase };

import firebase from 'firebase/app'
import "firebase/auth"
import 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyBM9m4bdzyygTUe9xRjJsOWaV-KXAXrf40",
    authDomain: "classiquebags-a072e.firebaseapp.com",
    projectId: "classiquebags-a072e",
    storageBucket: "classiquebags-a072e.appspot.com",
    messagingSenderId: "770043207019",
    appId: "1:770043207019:web:3e0f81ca683f6bf8a1802e",
    measurementId: "G-1BYGFSFNJC"
  };


firebase.initializeApp(firebaseConfig)
export default firebase

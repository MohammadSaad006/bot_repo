// firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyA0T6tiBBK_-X7G4uZaZaPi71b20WKejvo",
    authDomain: "exp151-37ce3.firebaseapp.com",
    projectId: "exp151-37ce3",
    storageBucket: "exp151-37ce3.appspot.com",
    messagingSenderId: "81866930521",
    appId: "1:81866930521:web:df591dcdd1117a64107448"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
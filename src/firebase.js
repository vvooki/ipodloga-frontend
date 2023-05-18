// Import the functions you need from the SDKs you need
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyD-s1J7ONiLcLFbLAkDUfBjKm48I1pROGk',
  authDomain: 'ipodloga.firebaseapp.com',
  databaseURL:
    'https://ipodloga-default-rtdb.europe-west1.firebasedatabase.app',
  projectId: 'ipodloga',
  storageBucket: 'ipodloga.appspot.com',
  messagingSenderId: '693330200585',
  appId: '1:693330200585:web:e556246607270ca745d0d8',
};

let app = '';
// Initialize Firebase
if (!firebase.apps.length) {
  app = firebase.initializeApp(firebaseConfig);
}

const auth = firebase.auth();
const db = getFirestore(app);
export { auth, db };

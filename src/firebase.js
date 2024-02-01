// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';

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

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);

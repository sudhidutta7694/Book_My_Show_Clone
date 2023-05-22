import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

// Initialize Firebase app
const firebaseConfig = {
    apiKey: "AIzaSyBMngDjuBc3wVzXpVvBXWS8oG1G_nw7SJM",
    authDomain: "book-my-show-clone-80092.firebaseapp.com",
    projectId: "book-my-show-clone-80092",
    storageBucket: "book-my-show-clone-80092.appspot.com",
    messagingSenderId: "495438649584",
    appId: "1:495438649584:web:846e1474aefa818b69ca35",
    measurementId: "G-SZNETQVS2J"
};

// Initialize your Firebase app
const firebaseApp = initializeApp(firebaseConfig);

// Get Firestore instance
const db = getFirestore(firebaseApp);

// Get Auth instance
const auth = getAuth(firebaseApp);

export { db, auth };


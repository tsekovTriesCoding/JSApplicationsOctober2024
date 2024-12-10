// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getAuth, setPersistence, browserLocalPersistence } from 'firebase/auth';
import { getDatabase } from 'firebase/database';
import page from '../lib/page.js';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries


// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDry7uaE7ZYEVzoKfVRpPdB-W-_u2-N-UQ",
    authDomain: "rent-a-cat-softuni-fightera.firebaseapp.com",
    projectId: "rent-a-cat-softuni-fightera",
    storageBucket: "rent-a-cat-softuni-fightera.firebasestorage.app",
    messagingSenderId: "997177236922",
    appId: "1:997177236922:web:7926f44a2ce913da89d183"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const database = getDatabase(app);

setPersistence(auth, browserLocalPersistence)
    .then(() => {
        // Refresh current page when persistance is loaded, a little bit hacky :)
        page.redirect(location.pathname);
    })
    .catch(err => {
        console.log('Persistance error');
    })

export default app;

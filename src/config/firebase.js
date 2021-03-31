import firebase from 'firebase';

var config = {
    apiKey: "AIzaSyBuayIgEL2hGGNA2pu-0b6l1H9Ssx0fs88",
    authDomain: "agendaled-c6618.firebaseapp.com",
    databaseURL: "https://agendaled-c6618.firebaseio.com",
    projectId: "agendaled-c6618",
    storageBucket: "agendaled-c6618.appspot.com",
    messagingSenderId: "425449349314",
    appId: "1:425449349314:web:f3aecd56303ffee4ec9b5b",
    measurementId: "G-PXPGSMSQ6X"
};

// Initialize Firebase
export const firebaseImpl = firebase.initializeApp(config);
export const firebaseAuth = firebaseImpl.auth();
export const firebaseRDB = firebaseImpl.firestore();
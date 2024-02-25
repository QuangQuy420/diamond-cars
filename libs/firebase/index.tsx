// Import the functions you need from the SDKs you need
import firebase from 'firebase/compat/app';
import { getStorage } from "@firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDx1APywkRSBzjYxnjULR0xw2yYFYFETk4",
    authDomain: "diamond-cars-9422f.firebaseapp.com",
    projectId: "diamond-cars-9422f",
    storageBucket: "diamond-cars-9422f.appspot.com",
    messagingSenderId: "684208518078",
    appId: "1:684208518078:web:c8c0cb4cfa1b34c4937fef",
    measurementId: "G-S2KHHBG6T2"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
export const uploadImage = getStorage(app);
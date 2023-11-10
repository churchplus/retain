import firebase from 'firebase'
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
var firebaseConfig = {
    apiKey: "AIzaSyBgHPpVv9qNKZvWUJh7CMVwLbF3uSZ0imo",
    authDomain: "wisdominterconnect-c26e8.firebaseapp.com",
    projectId: "wisdominterconnect-c26e8",
    storageBucket: "wisdominterconnect-c26e8.appspot.com",
    messagingSenderId: "196151770342",
    appId: "1:196151770342:web:20dd11f2d46396a14c8f27",
    measurementId: "G-7GH3NYHZBL"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

export default firebase;
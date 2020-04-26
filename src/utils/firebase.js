import firebase from 'firebase/app';
import 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyCcDdaJEZktnkWGwE8fDSD7WKBIlT619yI",
    authDomain: "athletedb-cb8c9.firebaseapp.com",
    databaseURL: "https://athletedb-cb8c9.firebaseio.com",
    projectId: "athletedb-cb8c9",
    storageBucket: "athletedb-cb8c9.appspot.com",
    messagingSenderId: "215186823320",
    appId: "1:215186823320:web:5d30b9c9fa8a9984add8ed"
};



firebase.initializeApp(firebaseConfig);

const storage = firebase.storage();
const storageRef = storage.ref();

export {
    storage, storageRef, firebase as default
};
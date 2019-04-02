import * as firebase from "firebase";

var config = {
  apiKey: "AIzaSyCVrar1N_ZHzOUvWBIfVMimMO8C1qI2X3A",
  authDomain: "gestionalemonteore.firebaseapp.com",
  databaseURL: "https://gestionalemonteore.firebaseio.com",
  projectId: "gestionalemonteore",
  storageBucket: "gestionalemonteore.appspot.com",
  messagingSenderId: "1026994144816"
};

firebase.initializeApp(config);

const database = firebase.database();
const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

export {firebase, googleAuthProvider ,database as default}






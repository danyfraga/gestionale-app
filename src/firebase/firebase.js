import * as firebase from "firebase";


// DB TESTING

var config = {
  apiKey: "AIzaSyDFWHBuAOOfL60tf1GDBvn9vMkieexUBlk",
  authDomain: "gestionalemonteore-test-83123.firebaseapp.com",
  databaseURL: "https://gestionalemonteore-test-83123.firebaseio.com",
  projectId: "gestionalemonteore-test-83123",
  storageBucket: "gestionalemonteore-test-83123.appspot.com",
  messagingSenderId: "676454879677",
};

//DB PRODUZIONE

// var config = {
//   apiKey: "AIzaSyCVrar1N_ZHzOUvWBIfVMimMO8C1qI2X3A",
//   authDomain: "gestionalemonteore.firebaseapp.com",
//   databaseURL: "https://gestionalemonteore.firebaseio.com",
//   projectId: "gestionalemonteore",
//   storageBucket: "gestionalemonteore.appspot.com",
//   messagingSenderId: "1026994144816"
// };

firebase.initializeApp(config);

const database = firebase.database();
const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

export {firebase, googleAuthProvider ,database as default}






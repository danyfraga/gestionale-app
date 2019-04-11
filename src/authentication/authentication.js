import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import AppRouter, {history} from "../routers/AppRouter";
import store from "../store/configureStore";
import { firebase } from "../firebase/firebase";
import { login, logout } from "../actions/auth";
import { getUserInfo, startGetAllUsers } from "../actions/user";
import { Alert } from 'reactstrap';

let usersEmailId = ["pippo@gmail.com", "paperino@gmail.com", "daniele.fragale@edu.itspiemonte.it"];

const jsxApp = (
    <Provider store={store}>
        <AppRouter store={store}/>
    </Provider>
);

export let authentication = () => {
    console.log("auth")
    firebase.auth().onAuthStateChanged((user) => {
        if(!user) {
            store.dispatch(logout());
            history.push("/")
        }
        else {
            firebase.database().ref("usersEmailId").once("value", snapshot => {
                if(!snapshot.exists()) {
                    firebase.database().ref("usersEmailId").set(usersEmailId);
                }
                let emailExist = false;
                snapshot.forEach((snapshotChild) => {
                    if (user.email === snapshotChild.val()) emailExist = true;
                });
                if(emailExist) {
                    //Controllo se è già presente un utente, se è non esiste aggiungi userData 
                    firebase.database().ref(`users/${user.uid}`).once("value", snapshot => {  
                        let defaultUserData = {
                            nameAndSurname: user.displayName.toUpperCase(),
                            email: user.email,
                            isAdmin: false
                        }
                        var userData;
                        if (!snapshot.exists()){
                            firebase.database().ref(`users/${user.uid}/userData`).set(defaultUserData);
                            userData = defaultUserData;
                        }
                        else {
                            userData = snapshot.val().userData;
                        }
                        store.dispatch(login(user.uid));
                        store.dispatch(getUserInfo(userData));
                        store.dispatch(startGetAllUsers());
                        console.log("ssss")
                        ReactDOM.render(jsxApp, document.getElementById("app"));

                        if((history.location.pathname === "/")) {
                            history.push("/dashboard");
                        }           
                    });
                }
                else {
                    ReactDOM.render(<Alert color="danger">Non sei abilitato</Alert>, document.getElementById("errorAuth"));
                }
            });
        }
    });
} 


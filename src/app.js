import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import AppRouter, {history} from "./routers/AppRouter";
import store from "./store/configureStore";
import "react-dates/lib/css/_datepicker.css";
import { firebase } from "./firebase/firebase";
import "./styles/styles.scss";
import { library } from '@fortawesome/fontawesome-svg-core';
import { faArrowLeft, faSignOutAlt, faTimesCircle, faPlusCircle, faInfoCircle, faAngleDown, faAngleUp, faTrashAlt, faEdit } from '@fortawesome/free-solid-svg-icons';
import { login, logout } from "./actions/auth";
import { getUserInfo, startGetAllUsers } from "./actions/user";
import LoadingPage from "./components/LoadingPage";
import { startSetOption } from "./actions/typeWorkingOptions";
import { startSetOptionActivity } from "./actions/typeActivityOption";
import { startSetUserEmailList } from "./actions/userEmailList";
import { startSetActivity } from "./actions/activities"

library.add(faArrowLeft);
library.add(faSignOutAlt);
library.add(faTimesCircle);
library.add(faPlusCircle);
library.add(faInfoCircle);
library.add(faAngleDown);
library.add(faAngleUp);
library.add(faTrashAlt);
library.add(faEdit);

const jsxApp = (
    <Provider store={store}>
        <AppRouter store={store}/>
    </Provider>
);
let hasRenderedUser = false;

const  renderApp = () => {
    if(!hasRenderedUser) {
        ReactDOM.render(jsxApp, document.getElementById("app"));
        hasRenderedUser = true;
    }
}

ReactDOM.render(<LoadingPage />, document.getElementById("app"));

firebase.database().ref("typeWorkingOptions").once("value", snapshot => {
    if(!snapshot.exists()) {
        firebase.database().ref(`typeWorkingOptions/${"Development"}`).set({"title":"Development", "description":"Default option"});
    }
    else {
        store.dispatch(startSetOption());
    }
});

firebase.database().ref("typeActivityOptions").once("value", snapshot => {
    if(!snapshot.exists()) {
        firebase.database().ref(`typeActivityOptions/${"Working"}`).set({"title":"Working", "description": "Default option", "hasTypeWork":true});
        firebase.database().ref(`typeActivityOptions/${"Holiday"}`).set({"title":"Holiday", "description": "Default option", "hasTypeWork":false});
        firebase.database().ref(`typeActivityOptions/${"Permit"}`).set({"title":"Permit", "description": "Default option", "hasTypeWork":false});
    }
    else {
        store.dispatch(startSetOptionActivity());
    }
});
store.dispatch(startSetUserEmailList());


    firebase.auth().onAuthStateChanged((user) => {
        if(!user) {
            store.dispatch(logout());
            renderApp();
            history.push("/");
        }
        else {
            firebase.database().ref("usersEmailId").once("value", snapshot => {
                if(!snapshot.exists()) {
                    let email = "daniele.fragale@edu.itspiemonte.it";
                    firebase.database().ref(`usersEmailId`).push(email);
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
                        store.dispatch(startSetActivity(user.uid));
                        store.dispatch(getUserInfo(userData));
                        store.dispatch(startGetAllUsers());
                        renderApp();
    
                        if((history.location.pathname === "/")) {
                            history.push("/dashboard");
                        }           
                    });
                }
                else {
                    localStorage.clear();
                    history.push("/?error=Not Authorized");
                }
            });
        }
    });


   
    







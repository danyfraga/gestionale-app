import React from "react";
import ReactDOM from "react-dom";
// Libreria che permette il collegamento tra react e redux
import { Provider } from "react-redux";
import AppRouter, {history} from "./routers/AppRouter";
import store from "./store/configureStore";
import { login, logout } from "./actions/auth"
import "react-dates/lib/css/_datepicker.css";
import { firebase } from "./firebase/firebase";
import LoadingPage from "./components/LoadingPage"
import { startSetActivity } from "./actions/activities";
import "./styles/styles.scss";
import { library } from '@fortawesome/fontawesome-svg-core';
import { faArrowLeft, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { getUserInfo, setUserInfo, startGetAllUsers } from "./actions/user"

library.add(faArrowLeft)
library.add(faSignOutAlt)

//const store = store;

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

firebase.auth().onAuthStateChanged((user) => {
    if(user) {
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

            renderApp();
            if((history.location.pathname === "/")) {
                history.push("/dashboard");
            }
            // else {
            //     history.push("/admin/dashboard")
            // }            
        });
    }
    else {
        store.dispatch(logout());
        renderApp();
        history.push("/")
    }
});
















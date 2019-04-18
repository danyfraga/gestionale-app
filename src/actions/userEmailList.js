import database from "../firebase/firebase";

export const setUserEmailList = (emailList) => {
    return {
        type: "SET_USER_EMAIL_LIST",
        emailList
    }
}

export const startSetUserEmailList = () => {
    return (dispatch) => {
        return database.ref(`usersEmailId`).once("value").then((snapshot) => {
            var listEmail = [];
            snapshot.forEach((childSnapshot) => {
                listEmail.push(childSnapshot.val())
            });
            dispatch(setUserEmailList(listEmail));
        });
    }   
}

export const addUserEmail = (email) => {
    return {
        type: "ADD_USER_EMAIL",
        email
    }
}

export const startAddUserEmail = (email) => {
    return (dispatch) => {
        return database.ref(`usersEmailId`).push(email).then(() => {
            dispatch(addUserEmail(email));
        });
    };
}

export const removeUserEmail = (email) => {
    return {
        type: "REMOVE_USER_EMAIL",
        email
    }
}

export const startRemoveUserEmail = (email) => {
    return (dispatch) => {
        return database.ref(`usersEmailId`).once("value").then((snapshot) => {
            snapshot.forEach((childSnapshot) => {
                var emailChildSnapshot = childSnapshot.val();
                var key = childSnapshot.key
                if(emailChildSnapshot === email) {
                    database.ref(`usersEmailId/${key}`).remove().then(() => {
                        dispatch(removeUserEmail(email));
                    })
                }
            });
        });
    }
}
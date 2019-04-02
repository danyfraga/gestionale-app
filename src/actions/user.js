import database from "../firebase/firebase";

//USER

export const setUserInfo = (userData = {}) => {
    return {
        type: "SET_USER_INFO",
        userData
    }
};

export const getUserInfo = (userData) => {
    return {
    type: "GET_USER_INFO",
    userData
}}

export const startGetUserInfo = (userId) => {
    return (dispatch) => {
        return database.ref(`users/${userId}/userData`).once("value").then((snapshot) => {
            let userData = snapshot.val();
            dispatch(getUserInfo(userData))
        });
    }
}

// USERS

export const getAllUsers = (allUsers) => ({
    type: "GET_ALL_USERS",
    allUsers
})

export const startGetAllUsers = () => {
    return (dispatch) => {
        return database.ref(`users`).once("value").then((snapshot) => {
            var users = [];
            var IDsArray = Object.keys(snapshot.val());
            var count = 0;
            snapshot.forEach((childSnapshot) => {
                users.push({
                    userId: IDsArray[count],
                    ...childSnapshot.val().userData
                });
                count++;
            })
            dispatch(getAllUsers(users))
        });
    };
}
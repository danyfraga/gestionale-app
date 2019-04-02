
const defaultUserInfo = {
    userId: "",
    nameAndSurname: "",
    email: "",
    isAdmin: false
}

export const userReducer = (state = defaultUserInfo, action) => {
    switch(action.type) {
        case "SET_USER_INFO":
            return {
                ...state,
                nameAndSurname: action.nameAndSurname,
                email: action.email,
                isAdmin: false
            };
        case "GET_USER_INFO":
            return action.userData;
        default:
            return state;
    }
}

let defaultUsersArray = [];

export const usersReducer = (state = defaultUsersArray, action) => {
    switch(action.type) {
        case "GET_ALL_USERS":
            return action.allUsers;
        default: 
            return state;
    }
}


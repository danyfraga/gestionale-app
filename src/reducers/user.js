
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
                isAdmin: false,
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
        case "REMOVE_USER":
            return state.filter((user) => {
                return user.email !== action.userEmail
            });
        case "EDIT_IS_ADMIN_USER":
            let newState = state.map((user) => {
                if(user.userId === action.updates.userId) {
                    return {
                        ...user,
                        ...action.updates
                    }
                }
                return user;  
            });
            return newState;
        default: 
            return state;
    }
}


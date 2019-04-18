
const defaulEmailList = [];

export const userEmailListReducer = (state = defaulEmailList, action) => {
    switch(action.type) {
        case "SET_USER_EMAIL_LIST":
            return action.emailList;
        case "ADD_USER_EMAIL":
            return [
                ...state,
                action.email
            ];
        case "REMOVE_USER_EMAIL":
            return state.filter((currentEmail) => {
                return action.email !== currentEmail
            })
        default:
            return state;
    }
};






import database from "../firebase/firebase";

export const setOptions = (options) => {
    return {
        type: "SET_OPTIONS_ACTIVITY",
        options
    }   
};

export const startSetOptionActivity = () => {
    return (dispatch) => {
        database.ref(`typeActivityOptions`).once("value").then((snapshot) => {
        const options = Object.values(snapshot.val());
        dispatch(setOptions(options));
        });  
    }
};
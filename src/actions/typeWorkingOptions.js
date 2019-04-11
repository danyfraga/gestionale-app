import database from "../firebase/firebase";

export const addOption = (option) => ({
    type: "ADD_OPTION",
    option
});

export const startAddOption = (option) => {
    return (dispatch) => {
        return database.ref(`typeWorkingOptions/${(option.title).replace(" ", "")}`).set(option).then(() => {
            dispatch(addOption(option));
        });
    };
};

export const removeOption = (optionIndex) => ({
    type: "REMOVE_OPTION",
    optionIndex
});

export const startRemoveOption = (optionIndex) => {
    return (dispatch) => {
        return database.ref(`typeWorkingOptions/${optionIndex.replace(" ", "")}`).remove().then(() => {
            dispatch(removeOption(optionIndex));
        });
    };
};

export const setOptions = (options) => {
    return {
        type: "SET_OPTIONS",
        options
    }   
};

export const startSetOption = () => {
    return (dispatch) => {
        database.ref(`typeWorkingOptions`).once("value").then((snapshot) => {
        const options = snapshot.val();
        dispatch(setOptions(options));
        });  
    }
};

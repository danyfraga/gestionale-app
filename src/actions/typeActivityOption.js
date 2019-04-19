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

export const addOptionActivity = (typeActivity) => ({
    type: "ADD_OPTION_ACTIVITY",
    typeActivity
});

export const startAddOptionActivity = (typeActivity) => {
    return (dispatch) => {
        return database.ref(`typeActivityOptions/${(typeActivity.title).replace(" ", "")}`).set(typeActivity).then(() => {
            dispatch(addOptionActivity(typeActivity));
        });
    };
};

export const removeOptionActivity = (typeActivityIndex) => ({
    type: "REMOVE_OPTION_ACTIVITY",
    typeActivityIndex
});

export const startRemoveOptionActivity = (typeActivityIndex) => {
    return (dispatch) => {
        return database.ref(`typeActivityOptions/${typeActivityIndex.replace(" ", "")}`).remove().then(() => {
            dispatch(removeOptionActivity(typeActivityIndex));
        });
    };
};

export const editHasTypeWork = (updates) => ({
    type: "EDIT_HAS_TYPE_WORK",
    updates
});

export const startEditHasTypeWork = (updates) => {
    return (dispatch) => {
        let hasTypeWork = { hasTypeWork: updates.hasTypeWork }
        return database.ref(`typeActivityOptions/${updates.title}`).update(hasTypeWork).then(() => {
            dispatch(startSetOptionActivity())
        })
    };
};



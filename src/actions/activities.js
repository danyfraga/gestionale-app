import database from "../firebase/firebase";

export const addActivity = (activity) => ({
    type: "ADD_ACTIVITY",
    activity
});

export const startAddActivity = (activityData) => {
    return (dispatch, getState) => {
        let uid = getState().auth.uid
        const {
            typeWorking = "",
            typeActivity = "working",
            createdAt = 0,
            hours = 0,
        } = activityData;
        const activity = { typeWorking, typeActivity, createdAt, hours };
        return database.ref(`users/${uid}/activities`).push(activity).then((ref) => {
            dispatch(addActivity({
                idActivity: ref.key,
                ...activity
            }));
        });
    };
};

export const removeActivity = (idActivity) => ({
    type: "REMOVE_ACTIVITY",
    idActivity
});

export const startRemoveActivity = (idActivity, idUser) => {
    return (dispatch, getState) => {
        let uid = idUser ? idUser : getState().auth.uid
        return database.ref(`users/${uid}/activities/${idActivity}`).remove().then(() => {
            dispatch(removeActivity(idActivity));
        });
    };
};

export const editActivity = (idActivity, updates) => ({
    type: "EDIT_ACTIVITY",
    idActivity,
    updates
});

export const startEditActivity = (idActivity, idUser, updates) => {
    return (dispatch, getState) => {
        let uid = idUser ? idUser : getState().auth.uid;
        return database.ref(`users/${uid}/activities/${idActivity}`).update(updates).then(() => {
            dispatch(editActivity(idActivity, updates));
        });
    };
};

export const setActivity = (activities) => {
    return {
        type: "SET_ACTIVITY",
        activities
    }   
};

export const startSetActivity = (uid) => {
    return (dispatch) => {
        database.ref(`users/${uid}/activities`).once("value").then((snapshot) => {
        const activities = [];
            snapshot.forEach((childSnapshot) => {
                activities.push({
                    idActivity: childSnapshot.key,
                    ...childSnapshot.val()
                });
            });
            dispatch(setActivity(activities));
        });  
    }
};


export const startRemoveActivitiesGroup = (activitiesGroup, idUser) => {
    return (dispatch, getState) => {
        let uid = getState().auth.uid
        return activitiesGroup.forEach((idActivity ) => {
            database.ref(`users/${uid}/activities/${idActivity}`).remove().then(() => {
                dispatch(removeActivity({idActivity}));
            });
        }) 
    }
};






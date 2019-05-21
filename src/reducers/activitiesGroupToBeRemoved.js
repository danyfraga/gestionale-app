const activitiesGroupToBeRemovedReducerDefault = [];

export const activitiesGroupToBeRemovedReducer = (state = activitiesGroupToBeRemovedReducerDefault, action) => {
    switch(action.type) {   
        case "ADD_ID_ACTIVITY_IN_GROUP":
            return [...state, action.idActivity];
        case "REMOVE_ID_ACTIVITY_FROM_GROUP":
            return state.filter((idActivity) => {
                return idActivity !== action.idActivity
            });
        case "ADD_ALL_ACTIVITIES_IN_GROUP":
            let newState = action.idsActivities
            return newState;
        case "SET_ACTIVITIES_GROUP_TO_BE_REMOVED":
            return [];
        default:
            return state;
    }
};

export const addIdActivityInGroup = (idActivity) => {
    return {
        type: "ADD_ID_ACTIVITY_IN_GROUP",
        idActivity
    }
}

export const addAllActivitiesInGroup = (idsActivities) => {
    return {
        type: "ADD_ALL_ACTIVITIES_IN_GROUP",
        idsActivities
    }
} 

export const removeIdActivityFromGroup = (idActivity ) => {
    return {
        type: "REMOVE_ID_ACTIVITY_FROM_GROUP",
        idActivity
    }
}

export const setActivitiesGroupToBeRemoved = () => {
    return {
        type: "SET_ACTIVITIES_GROUP_TO_BE_REMOVED"
    }
}
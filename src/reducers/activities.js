
const defaultActivities = [];

export const activitiesReducer = (state = defaultActivities, action) => {
    switch(action.type) {
        case "ADD_ACTIVITY":
            return [
                ...state,
                action.activity
            ];
        case "REMOVE_ACTIVITY":
            return state.filter(({ idActivity }) => {
                return idActivity !== action.idActivity
            })
        case "EDIT_ACTIVITY":
            return state.map((activity) => {
                if(activity.idActivity === action.idActivity) {
                    return  {   
                                ...activity,
                                ...action.updates
                            }
                }
                else {
                    return activity
                }
            });
        case "SET_ACTIVITY":
            return action.activities;
        default:
            return state;
    }
};







const defaultTypeActivityOptions = [];

export const typeActivityOptionsReducer = (state = defaultTypeActivityOptions, action) => {
    switch(action.type) {
        case "ADD_OPTION_ACTIVITY":
            return [
                ...state,
                action.typeActivity
            ];
        case "REMOVE_OPTION_ACTIVITY":
            return state.filter(({ key }) => {
                return key !== action.typeActivityIndex
            });
        case "EDIT_HAS_TYPE_WORK":
            return state.map((option) => {
                if(option.key === action.updates.key) {
                    return {
                        ...option,
                        ...action.updates
                    }
                }
            });
        case "SET_OPTIONS_ACTIVITY":
            return action.options;
        default:
            return state;
    }
};
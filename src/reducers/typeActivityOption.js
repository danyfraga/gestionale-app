
const defaultTypeActivityOptions = [];

export const typeActivityOptionsReducer = (state = defaultTypeActivityOptions, action) => {
    switch(action.type) {
        case "ADD_OPTION_ACTIVITY":
            return [
                ...state,
                action.typeActivity
            ];
        case "REMOVE_OPTION_ACTIVITY":
            return state.filter(({ title }) => {
                return title !== action.typeActivityIndex
            });
        case "EDIT_HAS_TYPE_WORK":
        console.log(action)
        console.log(state)
            return state.map((option) => {
                console.log(option)
                if(option.title === action.updates.title) {
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
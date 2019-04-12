
const defaultTypeWorkingOptions = [];

export const typeActivityOptionsReducer = (state = defaultTypeWorkingOptions, action) => {
    switch(action.type) {
        case "SET_OPTIONS_ACTIVITY":
            return action.options;
        default:
            return state;
    }
};
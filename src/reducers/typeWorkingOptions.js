
const defaultTypeWorkingOptions = [];

export const typeWorkingOptionsReducer = (state = defaultTypeWorkingOptions, action) => {
    switch(action.type) {
        case "ADD_OPTION":
            return [
                ...state,
                action.option
            ];
        case "REMOVE_OPTION":
            return state.filter(({ title }) => {
                return title !== action.optionIndex
            });
        case "SET_OPTIONS":
            return action.options;
        default:
            return state;
    }
};

const defaultTypeWorkingOptions = [];

export const typeWorkingOptionsReducer = (state = defaultTypeWorkingOptions, action) => {
    switch(action.type) {
        case "ADD_OPTION":
            let newOption = action.option;
            let tmpState = {...state};
            tmpState[newOption.title] = newOption;
            return tmpState;
        case "REMOVE_OPTION":
            let newState = {...state}
            let keyToDelete = action.optionIndex;
            delete newState[keyToDelete];
            return newState;
        case "SET_OPTIONS":
            return action.options;
        default:
            return state;
    }
};
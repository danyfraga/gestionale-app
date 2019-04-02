import moment from "moment";

const defaultFilters = {
    sortByTypeWorking: "all",
    sortByActivity: "all",
    startDate: moment().startOf("month"),
    endDate: moment().endOf("month"),
    switchChecked: false
}

const filtersReducer = (state = defaultFilters, action) => {
    switch(action.type) {
        case "SORT_BY_TYPE_WORKING":
            return {
                    ...state,
                    sortByTypeWorking: action.typeWorking
                };
        case "SORT_BY_ACTIVITY":
                return {
                    ...state,
                    sortByActivity: action.typeActivity
                };
        case "SET_START_DATE":
            return {
                ...state,
                startDate: action.startDate
            }
        case "SET_END_DATE":
            return {
                ...state,
                endDate: action.endDate
            }
        case "SWITCH_CHECKED":
            return {
                ...state,
                switchChecked: action.switchChecked
            }
        default:
            return state;
    }
}

export default filtersReducer;
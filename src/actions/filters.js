
export const sortByTypeWorking = (typeWorking) => ({
    type: "SORT_BY_TYPE_WORKING",
    typeWorking
});

export const sortByActivity = (typeActivity) => ({
    type: "SORT_BY_ACTIVITY",
    typeActivity
});

export const setStartDate = (startDate) => ({
    type: "SET_START_DATE",
    startDate
}); 

export const setEndDate = (endDate) => ({
    type: "SET_END_DATE",
    endDate
});

export const switchCheck = (switchChecked) => ({
    type: "SWITCH_CHECKED",
    switchChecked
});



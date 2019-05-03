import moment from "moment"

const getVisibleActivities = (activities, { sortByTypeWorking, sortByActivity, startDate, endDate }) => {
    return activities.filter((activity) => {
        if((sortByActivity === activity.typeActivity || sortByActivity === "all") && (sortByTypeWorking === activity.typeWorking || sortByTypeWorking === "all")){
            const createdAtMoment = moment(activity.createdAt);
            const startDateMatch = startDate ? startDate.isSameOrBefore(createdAtMoment, "day"): true
            const endDateMatch = endDate ? endDate.isSameOrAfter(createdAtMoment, "day"): true
            return startDateMatch && endDateMatch;
        }
    }).sort((a, b) => {
        return a.createdAt < b.createdAt ? 1 : -1;
    })
}

export default getVisibleActivities;
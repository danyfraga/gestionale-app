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

export const generateOptionTypeActivities = () => {
    const typeActivities = ["working", "permit", "holiday"];
    return typeActivities;
}

export const generateOptionTypeWorking = () => {
    const typeWorking = ["option 1", "option 2", "option 3"];
    return typeWorking;
}

export default getVisibleActivities;
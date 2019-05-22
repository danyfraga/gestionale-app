import React from "react";
import ActivitiesList from "../components/ActivitiesList";
import ActivitiesFilters from "../components/ActivitiesFilters";
import { connect } from "react-redux";
import { startSetActivity } from "../actions/activities";
import watch from "redux-watch";
import store from "../store/configureStore";
import UserItemHeader from "../components/UserItemHeader";
import ButtonsActivities from "../components/ButtonsActivities";
import ActivitySummary from "../components/ActivitySummary";

let watchState = watch(store.getState);

class UserItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            switchChecked: this.props.filters.switchChecked,
            typeWorking: this.props.filters.sortByTypeWorking,
            typeActivity: this.props.filters.sortByActivity,
            userId: "" 
         };
        this.unsubscribe = store.subscribe(watchState((currentVal) => {
            this.setState({activities: currentVal.activities});
        })); 
    }
    
    componentWillMount() {
        let userId = (this.props.location.pathname).split("/")[2];
        this.setState({userId})
        this.props.startSetActivity(userId);
    }

    componentWillUnmount(){
        this.unsubscribe();
    }

    render() {
        let userId = (this.props.location.pathname).split("/")[2];
        return (
            <div className="content-container">
                <UserItemHeader userId={userId}/>
                <ActivitiesFilters/>
                <ActivitiesList fromAdmin={true} userId={userId}/>
                <ButtonsActivities fromAdmin={true} userId={userId}/>
                <ActivitySummary fromAdmin={true}/>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        filters: state.filters,
        users: state.allUsers,
        activities: state.activities
    };
 };
 
 const mapDispatchToProp = (dispatch) => {
    return {
        switchCheck: (switchChecked) => dispatch(switchCheck(switchChecked)),
        sortByActivity: (typeActivity) => dispatch(sortByActivity(typeActivity)),
        sortByTypeWorking: (typeWorking) => dispatch(sortByTypeWorking(typeWorking)),
        startSetActivity: (uid) => dispatch(startSetActivity(uid))
    };
};

 export default connect(mapStateToProps, mapDispatchToProp)(UserItem);

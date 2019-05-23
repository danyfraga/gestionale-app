import React from "react";
import ActivityForm from "../components/ActivityForm"
import { startEditActivity } from "../actions/activities";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import  { sortByTypeWorking, sortByActivity } from "../actions/filters";

const queryString = require('query-string');

class EditActivity extends React.Component {
    constructor(props) {
        super(props);
        const parsed = queryString.parse(location.search);
        let linkPath = (parsed.userID === this.props.auth.uid) && !this.props.location.state.fromAdmin ? "/dashboard" : `/user/${parsed.userID}`;
        let activityLinkPath = this.props.location.state.fromAdmin ? this.props.location.pathname : this.props.activityLinkPath;

        this.state = {
            userId: parsed.userID,
            modalShow: false,
            linkPath,
            activityLinkPath
        };
        console.log(activityLinkPath)
    }

    onSubmit = (activity) => {
        this.props.startEditActivity(this.props.activityLinkPath, this.state.userId, activity);
        this.props.history.push(this.state.linkPath);
    }

    onClickReturn = () => {
        this.props.sortByTypeWorking("all");
        this.props.sortByActivity("all"); 
    }
    
    render () {
        return (
            <div className="content-container">
                <div className="row row__createActivity-header">
                    <Link to={this.state.linkPath}><FontAwesomeIcon icon="arrow-left" className="arrowLeft" size="2x" onClick={this.onClickReturn}/></Link>
                    <h1 className="createActivity__title">Edit Activity</h1>
                </div>
                <ActivityForm 
                    activity={this.props.activity}
                    onSubmit={this.onSubmit}
                    linkPath={this.state.linkPath}
                    activityLinkPath={this.state.activityLinkPath}
                    userId={this.state.userId}
                />
            </div>
        ); 
    }
}

const mapStateToProps = (state, props) => {
    return {
        auth: state.auth,
        activityLinkPath: props.match.params.id,
        activity: state.activities.find((activity) => activity.idActivity === props.match.params.id),
        allUsers: state.allUsers
    }
};

const mapDispatchToProps = (dispatch) => ({
    startEditActivity: (idActivity, userId, updates) => dispatch(startEditActivity(idActivity, userId, updates)),
    sortByTypeWorking: (typeWorking) => dispatch(sortByTypeWorking(typeWorking)),
    sortByActivity: (typeActivity) => dispatch(sortByActivity(typeActivity)),
});

export default connect(mapStateToProps, mapDispatchToProps)(EditActivity);
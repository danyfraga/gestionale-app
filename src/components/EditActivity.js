import React from "react";
import ActivityForm from "../components/ActivityForm"
import { startEditActivity } from "../actions/activities";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import  { sortByTypeWorking, sortByActivity } from "../actions/filters";

class EditActivity extends React.Component {

    constructor(props) {
        super(props);
        let linkPath = this.props.location.state.fromAdmin ? `/user/${this.props.location.state.userId}` : "/dashboard";

        this.state = {
            userId: this.props.location.state.userId,
            modalShow: false,
            linkPath
        };
    }

    onSubmit = (activity) => {
        this.props.startEditActivity(this.props.activity.idActivity, this.state.userId, activity);
        this.props.history.push(this.state.linkPath);
    }

    onClickReturn = () => {
        this.props.sortByTypeWorking("all");
        this.props.sortByActivity("all"); 
    }
    
    render () {
        console.log(this.props.activity)
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
                    activityLinkPath={this.props.activityLinkPath}
                    userId={this.state.userId}
                />
            </div>
        ); 
    }
 
}

const mapStateToProps = (state, props) => {
    let prova = state.activities.map((activity) => {
        console.log(activity.idActivity, props.match.params.id)
        if(activity.idActivity === props.match.params.id){
            return activity
        }
    })
    console.log(prova)
    return {
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
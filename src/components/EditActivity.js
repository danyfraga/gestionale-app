import React from "react"
import ActivityForm from "../components/ActivityForm"
import { startEditActivity } from "../actions/activities";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

class EditActivity extends React.Component {

    constructor(props) {
        super(props);

        let linkPath = this.props.location.state.fromAdmin ? `/user/${this.props.location.state.userId}` : "/dashboard";

        this.state = {
            modalShow: false,
            linkPath
        }
    }

    onSubmit = (activity) => {
        this.props.startEditActivity(this.props.activity.idActivity, activity);
        this.props.history.push(this.state.linkPath);
    }

    render () {
        return (
            <div className="content-container">
                <div className="row row__createActivity-header">
                    <Link to={this.state.linkPath}><FontAwesomeIcon icon="arrow-left" className="arrowLeft" size="2x"/></Link>
                    <h1 className="createActivity__title">Edit Activity</h1>
                </div>
                <ActivityForm 
                    activity={this.props.activity}
                    onSubmit={this.onSubmit}
                    linkPath={this.state.linkPath}
                />
            </div>
        ) 
    }
 
}

const mapStateToProps = (state, props) => {
    return {
        activity: state.activities.find((activity) => activity.idActivity === props.match.params.id)
    }
};

const mapDispatchToProps = (dispatch) => ({
    startEditActivity: (idActivity, updates) => {
        dispatch(startEditActivity(idActivity, updates))
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(EditActivity);
import React from "react";
import { connect } from "react-redux";
import ActivityForm from "./ActivityForm";
import { startAddActivity } from "../actions/activities";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export class CreateActivity extends React.Component {
    
    onSubmit = (activity) => {
        this.props.startAddActivity(activity);
        this.props.history.push("/");
    }
    
    render() {
        return (
            <div className="content-container">
                <div className="row row__createActivity-header">
                    <Link to="/dashboard"><FontAwesomeIcon icon="arrow-left" className="arrowLeft" size="2x"/></Link>
                    <h1 className="createActivity__title">Create Activity</h1>
                </div>
                <ActivityForm onSubmit={this.onSubmit}/>
            </div>
        )}
}

const mapDispatchToProp = (dispatch) => ({
    startAddActivity: (activity) => dispatch(startAddActivity(activity)),
});

export default connect(undefined, mapDispatchToProp)(CreateActivity)


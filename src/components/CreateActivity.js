import React from "react";
import { connect } from "react-redux";
import ActivityForm from "./ActivityForm";
import { startAddActivity } from "../actions/activities";
import { Link } from "react-router-dom";
import moment from "moment";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export class CreateActivity extends React.Component {
    constructor(props) {
        super(props);
        
        let typeWorkInActivity = [];
        var defaultTypeActivityOption = [];
        this.props.typeActivityOptions.map((typeActivityOption, index) => {
            if(index === 0) defaultTypeActivityOption.push(typeActivityOption.title);
            return typeWorkInActivity[typeActivityOption.title] = typeActivityOption.hasTypeWork ? (this.props.typeWorkingOptions.map((typeWorkingOption) => {
                    return typeWorkingOption;
            })) : ([{ title : "-", description : "-" }]);
        });

        let typeActivity = defaultTypeActivityOption[0];
        let typesOfWorkOptions = typeWorkInActivity[typeActivity];
        let typeWorking = typesOfWorkOptions[0].title;
        
        this.state = {
            typeActivity,
            typeWorking,
            createdAt: moment(),
            hours: "",
        }
    }
    
    onSubmit = (activity) => {
        this.props.startAddActivity(activity);
        this.props.history.push("/");
    }
    
    render() {
        let activity = {
            typeActivity: this.state.typeActivity,
            typeWorking: this.state.typeWorking,
            createdAt: this.state.createdAt,
            hours: this.state.hours
        }

        return (
            <div className="content-container">
                <div className="row row__createActivity-header">
                    <Link to="/dashboard"><FontAwesomeIcon icon="arrow-left" className="arrowLeft" size="2x" onClick={this.onClick}/></Link>
                    <h1 className="createActivity__title">Create Activity</h1>
                </div>
                <ActivityForm 
                    onSubmit={this.onSubmit} 
                    activity={activity}
                />
            </div>
        )}
}

const mapStateToProps = (state) => {
    return({
        typeWorkingOptions: state.typeWorkingOptions,
        typeActivityOptions: state.typeActivityOptions,
        filters: state.filters
    })
}

const mapDispatchToProp = (dispatch) => ({
    startAddActivity: (activity) => dispatch(startAddActivity(activity)),
});

export default connect(mapStateToProps, mapDispatchToProp)(CreateActivity)


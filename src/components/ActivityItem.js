import React from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import { connect } from "react-redux";
import {addIdActivityInGroup, removeIdActivityFromGroup, setActivitiesGroupToBeRemoved} from "../actions/activitiesGroupToBeRemoved";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class ActivityItem extends React.Component  {
    constructor (props) {
        super(props);
        this.state = {
            idActivity: props.idActivity,
            fromAdmin: this.props.fromAdmin,
            userId: this.props.userId,
            removeItem: this.props.isChecked ? this.props.isChecked : false,
            switchChecked: this.props.switchChecked
        };
    }

    componentDidUpdate = (prevProps) => {
        if(this.props.isChecked !== prevProps.isChecked) {
            this.setState({removeItem: this.props.isChecked});
        }
    }

    onChangeState = () => {
        if(!this.state.removeItem){
            this.setState({removeItem: true});
            this.props.addIdActivityInGroup(this.state.idActivity);
        }
        else {
            this.setState({removeItem: false});
            this.props.removeIdActivityFromGroup(this.state.idActivity);
        }
    }

    startRemoveGroup = () => {
        this.setState({modalDeleteShow: true}, this.handleShow);
    } 

    render () {
        let linkStyle = {textDecoration: 'none'};
        let pathname = !this.props.fromAdmin ? `/edit/${this.props.idActivity}` : `/user/${this.state.userId}/edit/${this.props.idActivity}`;
        return (
            <div className="list-item">
                <div className="show-for-desktop col-1">
                    <input 
                        type="checkbox" 
                        onChange={this.onChangeState} 
                        className="checkbox-item" 
                        value={this.state.removeItem} 
                        checked={this.state.removeItem}
                    />
                </div>
                <div className="show-for-desktop col-2">
                        <span className="list-item__sub-title">{moment(this.props.createdAt).format("DD/MM/YYYY")}</span>
                    </div>
                    <div className="show-for-desktop text-center col-6">
                        {
                            <div>
                                <span className="span__typeActivity">{(this.props.typeActivity).charAt(0).toUpperCase() + (this.props.typeActivity).slice(1)}</span>
                                <span className="span__typeWorking">{this.props.typeWorking !== "-" ? " - " : ""}{this.props.typeWorking !== "-" ? (this.props.typeWorking).charAt(0).toUpperCase() + (this.props.typeWorking).slice(1) : ""}</span>
                            </div>
                        }
                    </div>
                    <div className="show-for-desktop col-2 text-right">
                        <h3 className="list-item__data">{this.props.hours}</h3>
                    </div>
                 <Link 
                    className="col-1 text-right" 
                    style={linkStyle} 
                    to={{
                        pathname,
                        state: {
                            fromAdmin: this.state.fromAdmin,
                            userId: this.state.userId,
                            idActivity: this.state.idActivity
                        }
                    }}>
                    <FontAwesomeIcon icon="edit" className="edit-style" size="2x"/>
                </Link>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        switchChecked: state.filters.switchChecked
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        addIdActivityInGroup: (idActivity) => dispatch(addIdActivityInGroup(idActivity)),
        removeIdActivityFromGroup: (idActivity) => dispatch(removeIdActivityFromGroup(idActivity)),
        setActivitiesGroupToBeRemoved: () => dispatch(setActivitiesGroupToBeRemoved())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ActivityItem);
    






import React from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import { Tooltip } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { connect } from "react-redux";

class ActivityItem extends React.Component  {
    constructor (props) {
        super(props);

        this.state = {
            fromAdmin: this.props.fromAdmin,
            userId: this.props.userId
        }
    }

    render () {
        return (
            <Link 
                className="list-item d-flex justify-content-between" 
                style={{ textDecoration: 'none' }} 
                to={{
                    pathname:`/edit/${this.props.idActivity}`,
                    state: {
                        fromAdmin: this.state.fromAdmin,
                        userId: this.state.userId
                    }
                }}>
                <div className="show-for-desktop col-3">
                    <span className="list-item__sub-title">{moment(this.props.createdAt).format("DD/MM/YYYY")}</span>
                </div>
                <div className="show-for-desktop col-6 text-center">
                    {
                        <div>
                            <span className="span__typeActivity">{(this.props.typeActivity).charAt(0).toUpperCase() + (this.props.typeActivity).slice(1)}</span>
                            <span className="span__typeWorking">{this.props.typeWorking !== "-" ? " - " : ""}{this.props.typeWorking !== "-" ? (this.props.typeWorking).charAt(0).toUpperCase() + (this.props.typeWorking).slice(1) : ""}</span>
                        </div>
                    }
                </div>
                <div className="show-for-desktop col-3 text-right">
                    <h3 className="list-item__data">{this.props.hours}</h3>
                </div>
            </Link>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        typeWorkingOptions: state.typeWorkingOptions
    }
}

export default connect(mapStateToProps)(ActivityItem);
    






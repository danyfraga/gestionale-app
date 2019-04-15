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
            tooltipOpen: false
        }
    }
    
    toggle = () => {
        this.setState({
            tooltipOpen: !this.state.tooltipOpen
        });
    }

    render () {
        let thisProps = this.props;

        let currentOption = thisProps.typeWorkingOptions.filter((option) => {
            if(option.title === thisProps.typeWorking) return option.description
        });

        return (
            <Link className="list-item d-flex justify-content-between" style={{ textDecoration: 'none' }} to={`/edit/${this.props.idActivity}`}>
                <div className="show-for-desktop col-3">
                    <span className="list-item__sub-title">{moment(this.props.createdAt).format("DD/MM/YYYY")}</span>
                </div>
                <div className="show-for-desktop col-6 text-center">
                    {
                        <div>
                            <span className="span__typeActivity">{(this.props.typeActivity).charAt(0).toUpperCase() + (this.props.typeActivity).slice(1)}</span>
                            <span className="span__typeWorking">{this.props.typeWorking !== "-" ? " - " : ""}{this.props.typeWorking !== "-" ? (this.props.typeWorking).charAt(0).toUpperCase() + (this.props.typeWorking).slice(1) : ""}</span>
                            <FontAwesomeIcon id={this.props.idActivity} icon="info-circle" className="infoCircle infoButton" size="1x" className=""/>
                            <Tooltip 
                                placement="right" 
                                isOpen={this.state.tooltipOpen} 
                                target={this.props.idActivity} 
                                toggle={this.toggle} 
                                className="label__tooltip"
                            >
                                {currentOption[0].description}
                            </Tooltip>
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
    






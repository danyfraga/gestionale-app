import React from "react";
import { Link } from "react-router-dom";
import moment from "moment";


class ActivityItem extends React.Component  {
    constructor (props) {
        super(props)
    }

    render () {
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

export default (ActivityItem);
    






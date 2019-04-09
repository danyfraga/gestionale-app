import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

class DashboardHeader extends React.Component {
    constructor(props) {
        super(props);
    }

    render(){
        return (
            <div className="row d-flex justify-content-left">
                <h1 className="dashboard-header__title">{(this.props.user.nameAndSurname).toUpperCase()}</h1>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.user,
    }
}

export default connect(mapStateToProps)(DashboardHeader)
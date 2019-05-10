import React from "react";
import { connect } from "react-redux";

class DashboardHeader extends React.Component {
    constructor(props) {
        super(props);
    }

    render(){
        let nameAndSurname = (this.props.user.nameAndSurname).toUpperCase();

        return (
            <div className="row d-flex justify-content-left">
                <h1 className="dashboard-header__title">{nameAndSurname}</h1>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.user,
    };
}

export default connect(mapStateToProps)(DashboardHeader)
import React from "react";
import { connect } from "react-redux";
import { startLogout } from "../actions/auth";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from "react-router-dom";
import  { switchCheck } from "../actions/filters";

export class Header extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
            switchChecked: this.props.filters.switchChecked
        }
    }
    
    onClick = () => {
        this.setState({ switchChecked: false });
        this.props.switchCheck(this.state.switchChecked)
    }

    startLogout = () => {
        this.props.startLogout();
    }

    render() {
        return (
            <div> 
                <header className="header">
                    <div className="content-container">
                        <div className="row header__content">
                            <div className="col-9">
                                <Link to="/dashboard" style={{ textDecoration: 'none' }} onClick={this.onClick}><h1 className="header__title">MGMTNet</h1></Link>
                            </div>
                            {
                                this.props.user.isAdmin ? (
                                    <div className="row">
                                    <div className="col-6 text-center">
                                        <Link to="/users" className="navItemLink" onClick={this.onClick}>USERS</Link>
                                    </div>
                                    <div className="col-6 text-center">
                                        <Link to="/settings" className="navItemLink" onClick={this.onClick}>SETTINGS</Link>
                                    </div>
                                    </div>
                                ) : (
                                    false
                                )
                            } 
                            <div className="col-1 text-center">
                                <FontAwesomeIcon icon="sign-out-alt" className="logout_icon" size="2x" onClick={this.startLogout} style={{ margin: "0" }}/>
                            </div>                           
                        </div>  
                    </div>
                </header>
            </div>
         )
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.user,
        filters: state.filters
    }
}

const mapDispatchToProps = (dispatch) => ({
    startLogout: () => dispatch(startLogout()),
    switchCheck: (switchChecked) => dispatch(switchCheck(switchChecked))
})

export default connect(mapStateToProps, mapDispatchToProps)(Header);


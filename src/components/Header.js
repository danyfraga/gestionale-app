import React from "react";
import { connect } from "react-redux";
import { startLogout } from "../actions/auth"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


const Header = ({ startLogout }) => (
    <header className="header">
    <div className="content-container">
        <div className="header__content">
            <h1 className="header__title">MGMTNet</h1> 
            <FontAwesomeIcon icon="sign-out-alt" className="logout_icon" size="2x" onClick={startLogout} style={{ margin: "0" }}/>
        </div>  
    </div>
    </header>
);

const mapDispatchToProps = (dispatch) => ({
    startLogout: () => dispatch(startLogout())
})

export default connect(undefined, mapDispatchToProps)(Header);

// mieigmentnet
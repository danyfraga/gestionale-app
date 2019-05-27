import React from "react";
import { connect } from "react-redux";
import { Route, Redirect } from "react-router-dom";
import Header from "../components/Header"

export const AdminRoute = ({ 
    isAuthenticated,
    isAdmin, 
    component: Component,
    path,
    ...rest
}) => {
    return (
        <Route {...rest} component={(props) => (
            isAuthenticated && isAdmin ? (
                <div>
                    <Header/>
                    <Component {...props}/>
                </div>
            ) : (
                <Redirect to="/"/>
            )
        )}/>        
    )
};

const mapStateToProps = (state) => {
    return {
        isAuthenticated: !!state.auth.uid,
        isAdmin: !!state.user.isAdmin
    }
};

export default connect(mapStateToProps)(AdminRoute);


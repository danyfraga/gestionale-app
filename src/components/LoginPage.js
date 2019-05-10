import React from "react";
import { connect } from "react-redux";
import { startLogin } from "../actions/auth";
import { Alert } from 'reactstrap';
import store from "../store/configureStore";
import watch from "redux-watch";
import {history} from "../routers/AppRouter";

let watchCustomer = watch(store.getState);
const queryString = require('query-string');

class LoginPage extends React.Component {
    constructor(props) {
        super(props);

        const parsed = queryString.parse(location.search);

        this.state = {
            error: parsed.error
        };

        this.unsubscribe = store.subscribe(watchCustomer((currentVal) => {
            history.push("/");
        })); 
    }

    onClick = () => {
        this.props.startLogin();
        history.push("/");
    }

    componentWillUnmount() {
        this.unsubscribe();
    }

    render() {
        return(
            <div className="box-layout">
                <div className="box-layout__box">
                    <h1 className="box-layout__title">MGMTNet</h1>
                    <p>Manage your activities</p>
                    <button className="button" onClick={this.onClick}>Login with Google</button>
                    <div id="errorAuth" hidden={this.state.error ? false : true} className="error-message">
                        <Alert color="danger">
                            {this.state.error}
                        </Alert>
                    </div>
                </div>
            </div>
        );
    }    
};

const mapDispatchToProps = (dispatch) => ({
    startLogin: () => dispatch(startLogin())
});

export default connect(undefined, mapDispatchToProps)(LoginPage);
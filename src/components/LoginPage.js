import React from "react";
import { connect } from "react-redux";
import { startLogin } from "../actions/auth";
import { Alert } from 'reactstrap';
import store from "../store/configureStore";
import watch from "redux-watch";

let watchCustomer = watch(store.getState);

class LoginPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            error: this.props.location.search ? false : true
        }

        this.unsubscribe = store.subscribe(watchCustomer((currentVal) => {
            // this.setState({ error: currentVal.error });
         })); 
    }

    onClick = () => {
        this.props.startLogin();
    }

    componentWillUnmount() {
        this.unsubscribe();
        this.setState({ error: false})
        console.log(this.state.error)
    }

    render() {
        return(
            <div className="box-layout">
                <div className="box-layout__box">
                    <h1 className="box-layout__title">MGMTNet</h1>
                    <p>Manage your activities</p>
                    <button className="button" onClick={this.onClick}>Login with Google</button>
                    <div id="errorAuth" hidden={this.state.error}>
                    <Alert color="danger">
                        Error! Your account is not enabled to log in
                    </Alert>
                    </div>
                </div>
            </div>
        )
    }    
};

const mapDispatchToProps = (dispatch) => ({
    startLogin: () => dispatch(startLogin())
});

export default connect(undefined, mapDispatchToProps)(LoginPage);
import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import watch from "redux-watch";
import store from "../store/configureStore";

let watchState = watch(store.getState);

class UserItemHeader extends React.Component {
    constructor(props) {
        super(props);
     
        this.state = {
            allUsers: store.getState().allUsers,
            currentUserId: this.props.userId
        };

        this.unsubscribe =  store.subscribe(watchState((currentVal) => {
            this.setState({allUsers: currentVal.allUsers});
        }));
        
    }
    componentWillUnmount(){
        this.unsubscribe();
    }

    render() {
        let user = (this.state.allUsers).filter((user) => {
            return user.userId === this.state.currentUserId;
        })[0];
        if(!user) return <div>No User</div>;
        let nameAndSurnameCurrentUser = user.nameAndSurname;
        let emailCurrentUser = user.email;
    
        return (
            <div>
                <div className="row row__createActivity-header">
                    <Link to="/users"><FontAwesomeIcon icon="arrow-left" className="arrowLeft" size="2x"/></Link>
                    <div className="col-11 pl-0">
                        <h1 className="createActivity__title">{nameAndSurnameCurrentUser}</h1>
                    </div>             
                </div>
                <div className="row row__createActivity-header">
                    <div className="col-9">
                        <h2 className="email_title">{emailCurrentUser}</h2>
                    </div> 
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        allUsers: state.allUsers,
        user: state.user
    };
};

export default connect(mapStateToProps)(UserItemHeader);
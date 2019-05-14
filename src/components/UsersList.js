import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import watch from "redux-watch";
import store from "../store/configureStore";
import UserItemList from "./UserItemList";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

let watchState = watch(store.getState);

class UsersList extends React.Component {
    constructor(props) {
        super(props);

        store.subscribe(watchState((currentVal) => {
        }));
    }

    render() {
        let thisProps = this.props;
        let borderBottomList = thisProps.users.length > 5 ? { borderBottom: "#cacccd 1px solid" } : { borderBottom: "none" }
        let usersList = thisProps.users.map((user) => {
            return <UserItemList key={user.userId} {...user}/>;
        });

        return (
            <div className="content-container">
                <div className="row row__createActivity-header">
                    <Link to="/dashboard"><FontAwesomeIcon icon="arrow-left" className="arrowLeft" size="2x"/></Link>
                    <div className="col-11 pl-0">
                        <h1 className="createActivity__title">USERS</h1>
                    </div>
                </div>
                <div className="list-header row row__list-header">
                    <div className="show-for-desktop col-3">Name</div>
                    <div className="show-for-desktop col-3">Surname</div>
                    <div className="show-for-desktop col-5">Email</div>
                    <div className="show-for-desktop col-1">User Type</div>
                </div>
                <div className="scroll" style={borderBottomList}>
                    {usersList}
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        users: state.allUsers
    };
}

export default connect(mapStateToProps)(UsersList);
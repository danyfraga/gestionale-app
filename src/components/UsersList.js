import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import watch from "redux-watch";
import store from "../store/configureStore";
import UserItem from "../components/UserItem";


let watchCustomer = watch(store.getState);


class UsersList extends React.Component {
    constructor(props) {
        store.subscribe(watchCustomer((val) => {
            console.log(val);
        }));
        super(props)
    }

    render() {
        let thisProps = this.props;
        let borderBottomList = thisProps.users.length > 5 ? { borderBottom: "#cacccd 1px solid" } : { borderBottom: "none" }
        let usersList = thisProps.users.map((user) => {
            return <UserItem key={user.userId} {...user}/>
        });

        return (
            <div className="content-container userslist-container">
                <h1>USERS</h1>
                <div className="list-header row row__list-header">
                    <div className="show-for-mobile">Activities</div>
                    <div className="show-for-desktop col-4">Name</div>
                    <div className="show-for-desktop col-5">Surname</div>
                    <div className="show-for-desktop col-3 text-center">User Type</div>
                </div>
                <div className="scroll" style={borderBottomList}>
                    {usersList}
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        users: state.allUsers
    }
}

export default connect(mapStateToProps)(UsersList)
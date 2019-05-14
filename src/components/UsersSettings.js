import React from "react";
import { connect } from "react-redux";
import watch from "redux-watch";
import store from "../store/configureStore";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Alert } from 'reactstrap';
import UserItemSettings from "../components/UserItemSettings";
import { startAddUserEmail, startSetUserEmailList } from "../actions/userEmailList";

let watchState = watch(store.getState);

class UsersSettings extends React.Component {
    constructor (props) {
        super(props);

        this.state = { 
            typeErrorNewUserEmail: "",
            errorNewUserEmail: "",
            newUserEmail: "",
            userEmailList: this.props.userEmailList,
            users: this.props.users 
        };

        this.unsubscribe = store.subscribe(watchState((currentVal) => {
            if(currentVal) this.setState({userEmailList: currentVal.userEmailList, users: currentVal.allUsers})
        })); 
    }

    componentWillMount() {
        this.props.startSetUserEmailList();
    }
  
    componentWillUnmount(){
        this.unsubscribe();
    }

    onSubmit = (e) => {
        e.preventDefault();
        let newUserEmail = this.state.newUserEmail;
        
        if(this.state.newUserEmail) {
            var isEqual = false;
        
            this.state.userEmailList.map((email) => {
                if(email === newUserEmail) isEqual = true;
            });
            let emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            if(!emailRegex.test(newUserEmail)) {
                this.setState({typeErrorNewUserEmail: "notEmail", errorNewUserEmail: "Error! The email you entered is not valid (example@example.com)."});
            }
            else {
                if(!isEqual) {
                    this.props.startAddUserEmail(newUserEmail);
                    this.setState({typeErrorNewUserEmail: "", errorNewUserEmail: "", newUserEmail: ""});
                }
                else {
                    this.setState({typeErrorNewUserEmail: "emailIsEqual", errorNewUserEmail: "Warning! The email entered is already present."});
                }
            }
        }
        else {
            this.setState({typeErrorNewUserEmail: "emptyEmail", errorNewUserEmail: "Error! Your new user email input is empty."});
        }
    }

    onChangeInputUserEmail = (e) => {
        let newUserEmail = e.target.value;
        this.setState({newUserEmail, errorNewUserEmail: "", typeErrorNewUserEmail: ""});
    }

    onClick = (e) => {
        this.onSubmit(e);
    }

    render() {
        let errorColor = ""; 
        if(this.state.typeErrorNewUserEmail) {errorColor = "danger"}
        let errorMessageInputNewUserEmail = this.state.errorNewUserEmail ? <Alert color={errorColor}>{this.state.errorNewUserEmail}</Alert> : "";

        let usersList = this.state.userEmailList.map((userEmail) => {
            var userObj = {
                name: "/",
                surname: "/",
                email: userEmail,
                key: userEmail,
                userId: userEmail,
                isAdmin: false,
                logUser: true
            };

            let user = this.state.users.find((user) => userEmail === user.email);

            if(user) {
                let nameAndSurname = (user.nameAndSurname).split(" ");
                userObj.name = nameAndSurname[0].charAt(0) + nameAndSurname[0].slice(1).toLowerCase();
                userObj.surname = nameAndSurname[1].charAt(0) + nameAndSurname[1].slice(1).toLowerCase();
                userObj.email = user.email;
                userObj.key = user.userId;
                userObj.userId = user.userId;
                userObj.isAdmin = user.isAdmin;
                userObj.logUser = false;
            }
        
            return (
                <UserItemSettings
                    key={userObj.userId}
                    userObj={userObj}
                />
            );
        });

        let borderBottomList = usersList.length > 5 ? {borderBottom:"#cacccd 1px solid" } : {borderBottom:"none"};
        let insertIconStyle = {"backgroundColor" : "rgba(0, 0, 0, 0)", "padding":"0", "border":"none"};

        return (
            <div className="usersSettings__container">
                <h2 className="settings_subtitle">Users settings</h2>
                <div className="list-header row row__list-header">
                    <div className="show-for-desktop col-2">Name</div>
                    <div className="show-for-desktop col-3">Surname</div>
                    <div className="show-for-desktop col-5">Email</div>
                    <div className="show-for-desktop col-1 text-center">Admin</div>
                    <div className="show-for-desktop col-1 text-center">Delete</div>
                </div>
               <div className="scroll scrollTypeWorkingOptions" style={borderBottomList}>
                   {usersList}
               </div>
               <form className="list-item d-flex justify-content-between insertOptionTW" onSubmit={this.onSubmit}>
                    <div className="show-for-desktop col-11">
                        <input 
                            placeholder="Enter a new email to enable a user"
                            onChange={this.onChangeInputUserEmail}
                            value={this.state.newUserEmail}
                        />                       
                    </div>
                    <div className="show-for-desktop col-1 text-center">
                        <button style={insertIconStyle}>
                            <FontAwesomeIcon icon="plus-circle" className="plusCircle insertIcon" size="2x" onClick={this.onClick}/>
                        </button>
                    </div>                    
                </form>
                {errorMessageInputNewUserEmail}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        users: state.allUsers,
        userEmailList: state.userEmailList
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        startAddUserEmail: (email) => dispatch(startAddUserEmail(email)),
        startSetUserEmailList: () => dispatch(startSetUserEmailList())
    };
};

const UsersSettingsConnect = connect(mapStateToProps, mapDispatchToProps)(UsersSettings)
export default UsersSettingsConnect;


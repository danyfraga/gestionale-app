import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import watch from "redux-watch";
import store from "../store/configureStore";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import TypeWorkingOptionItem from "../components/TypeWorkingOptionItem";
import { startAddOption } from "../actions/typeWorkingOptions";
import { Alert } from 'reactstrap';
import UserItemSettings from "../components/UserItemSettings";
import { startAddUserEmail, startSetUserEmailList } from "../actions/userEmailList";

let watchCustomer = watch(store.getState);

class SettingsList extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            collapse: false,
            modalShow: false,
            modalSaveShow: false,
            modalDeleteShow: false,
            options: this.props.typeWorkingOptions, 
            newOption: "",
            newOptionDescription: "",
            typeErrorNewOption: "",
            errorNewOption: "",
            typeErrorNewUserEmail: "",
            errorNewUserEmail: "",
            newUserEmail: "",
            userEmailList: this.props.userEmailList,
            users: this.props.users 
        };

        this.unsubscribe = store.subscribe(watchCustomer((currentVal) => {
            if(currentVal) this.setState({ userEmailList: currentVal.userEmailList, options: currentVal.typeWorkingOptions, users: currentVal.allUsers})
         })); 
    }

    componentWillMount() {
        this.props.startSetUserEmailList();
     }
  
     componentWillUnmount(){
        this.unsubscribe();
     }

    // INPUT TYPE WORKING OPTION
    toggle = () => {
        this.setState({ collapse: !this.state.collapse });
    }

    onSubmit = (e) => {
        e.preventDefault();
        let titleOption = this.state.newOption;
        let descriptionOption = this.state.newOptionDescription;
        let objNewOption = {
            "title": titleOption,
            "description": descriptionOption ? descriptionOption : "-"
        }
       
        if(this.state.newOption) {
            var isEqual = false;
            for(var key in this.state.options) { 
                if ( (this.state.options)[key].title === this.state.newOption) isEqual = true;
            }

            if(titleOption.length > 25 || descriptionOption > 50) {
                this.setState({ typeErrorNewOption: "inputLong", errorNewOption: "Warning! Your type working name (max 25) or description (max 50) is too long."});
                
            }
            else {
                if(!isEqual) {
                    this.props.startAddOption(objNewOption);
                    this.setState({ newOption : "", newOptionDescription: "" });
                }
                else {
                    this.setState({ typeErrorNewOption: "inputIsEqual", errorNewOption: "Warning! Your type working name is already present."})
                }
            }
        }
        else {
            this.setState({ typeErrorNewOption: "emptyInput", errorNewOption: "Error! Your type working input is empty."})
        }
    }

    onClick = (e) => {
        this.onSubmit(e)
    }

    onChangeInputOption = (e) => {
        let newOption = e.target.value;
        this.setState({ newOption, errorNewOption: "", typeErrorNewOption: "" });
    }

    onChangeInputDescriptionOption = (e) => {
        let newOptionDescription = e.target.value;
        this.setState({ newOptionDescription });
    }

    // INPUT EMAIL NEW USER

    onSubmit2 = (e) => {
        e.preventDefault();
        let newUserEmail = this.state.newUserEmail;
        
        if(this.state.newUserEmail) {
            var isEqual = false;
        
            this.state.userEmailList.map((email) => {
                if(email === newUserEmail) isEqual = true;
            })
            let emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            if(!emailRegex.test(newUserEmail)) {
                this.setState({ typeErrorNewUserEmail: "notEmail", errorNewUserEmail: "Error! The email you entered is not valid (example@example.com)." });
            }
            else {
                if(!isEqual) {
                    this.props.startAddUserEmail(newUserEmail);
                    this.setState({ typeErrorNewUserEmail: "", errorNewUserEmail: "" });
                }
                else {
                    this.setState({ typeErrorNewUserEmail: "emailIsEqual", errorNewUserEmail: "Warning! The email entered is already present." });
                }
            }
        }
        else {
            this.setState({ typeErrorNewUserEmail: "emptyEmail", errorNewUserEmail: "Error! Your new user email input is empty." });
        }
    }

    onChangeInputUserEmail = (e) => {
        let newUserEmail = e.target.value;
        this.setState({ newUserEmail, errorNewUserEmail: "", typeErrorNewUserEmail: "" });
    }

    onClick2 = (e) => {
        this.onSubmit2(e);
    }

    render() {
        let thisProps = this.props;
        let typeWorkingOptions = thisProps.typeWorkingOptions;
        var isSingle = false;
        let typeWorkingOption = typeWorkingOptions.map((option) => {
            let optionTitle = option.title;
            let optionDescription = option.description;
            if(typeWorkingOptions.length === 1) isSingle = true; 
            return (
                <TypeWorkingOptionItem 
                    key={optionTitle} 
                    optionTitle={optionTitle} 
                    optionId={optionTitle}
                    optionDescription={optionDescription} 
                    isSingle={isSingle}
                />
            )
        });

        let borderBottomList = typeWorkingOption.length > 5 ? { borderBottom: "#cacccd 1px solid" } : { borderBottom: "none" };

        let errorColor = ""; 
        if(this.state.typeErrorNewOption === "emptyInput") { errorColor = "danger" }
        else if (this.state.typeErrorNewOption === "inputLong" ) { errorColor = "warning" }
        else if(this.state.typeErrorNewOption === "inputIsEqual") { errorColor = "warning" }
 
        if(this.state.typeErrorNewUserEmail === "notEmail") { errorColor = "danger" }
        else if (this.state.typeErrorNewUserEmail === "emailIsEqual" ) { errorColor = "warning" }
        else if(this.state.typeErrorNewUserEmail === "emptyEmail") { errorColor = "danger" }

        let errorMessageInputTypeWorking = <Alert color={errorColor}>{this.state.errorNewOption}</Alert>
        let errorMessageInputNewUserEmail = <Alert color={errorColor}>{this.state.errorNewUserEmail}</Alert>

        let usersList = this.state.userEmailList.map((userEmail) => {
            var userObj = {
                name: "/",
                surname: "/",
                email: userEmail,
                key: userEmail,
                userId: userEmail,
                isAdmin: false,
                logUser: true
            }
            let user = this.state.users.find((user) => userEmail === user.email);

            // Risolvere problema relativo al cambio di stato della checkbox Admin

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
            )
        });
        

        return (
            <div className="content-container">
                <div className="row row__createActivity-header">
                    <Link to="/dashboard"><FontAwesomeIcon icon="arrow-left" className="arrowLeft" size="2x"/></Link>
                    <div className="col-11 pl-0">
                        <h1 className="createActivity__title">SETTINGS</h1>
                    </div>
                </div> 
                <h2 className="settings_subtitle">Setting type working</h2>
                <div className="list-header row row__list-header">
                    <div className="show-for-mobile">Activities</div>
                    <div className="show-for-desktop col-5">Type working name</div>
                    <div className="show-for-desktop col-6">Description</div>
                    <div className="show-for-desktop col-1 text-center">Remove</div>
                </div>
                <div id="typeWorkingOptions" className="scroll scrollTypeWorkingOptions" style={borderBottomList}>
                    {typeWorkingOption}
                </div>
                <form className="list-item d-flex justify-content-between insertOptionTW" onSubmit={this.onSubmit}>
                    <div className="show-for-desktop col-5">
                        <input 
                            placeholder="Insert new type working option"
                            onChange={this.onChangeInputOption}
                            value={this.state.newOption}
                        />                       
                    </div>
                    <div className="show-for-desktop col-6">
                        <input 
                            placeholder="Insert type working description"
                            onChange={this.onChangeInputDescriptionOption}
                            value={this.state.newOptionDescription}
                        /> 
                    </div>
                    <div className="show-for-desktop col-1 text-center">
                        <button style={{"backgroundColor" : "rgba(0, 0, 0, 0)", "padding":"0", "border":"none"}}>
                            <FontAwesomeIcon icon="plus-circle" className="plusCircle insertIcon" size="2x" onClick={this.onClick}/>
                        </button>
                    </div>                    
                </form>
                {this.state.errorNewOption ? errorMessageInputTypeWorking : ""}

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
               <form className="list-item d-flex justify-content-between insertOptionTW" onSubmit={this.onSubmit2}>
                    <div className="show-for-desktop col-11">
                        <input 
                            placeholder="Enter a new email to enable a user"
                            onChange={this.onChangeInputUserEmail}
                            value={this.state.newUserEmail}
                        />                       
                    </div>
                    <div className="show-for-desktop col-1 text-center">
                        <button style={{"backgroundColor" : "rgba(0, 0, 0, 0)", "padding":"0", "border":"none"}}>
                            <FontAwesomeIcon icon="plus-circle" className="plusCircle insertIcon" size="2x" onClick={this.onClick2}/>
                        </button>
                    </div>                    
                </form>
                {this.state.errorNewUserEmail ? errorMessageInputNewUserEmail : ""}

            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        users: state.allUsers,
        typeWorkingOptions: state.typeWorkingOptions,
        userEmailList: state.userEmailList
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        startAddOption: (option) => dispatch(startAddOption(option)),
        startAddUserEmail: (email) => dispatch(startAddUserEmail(email)),
        startSetUserEmailList: () => dispatch(startSetUserEmailList())
    }
}

const SettingsListConnect = connect(mapStateToProps, mapDispatchToProps)(SettingsList)
export default SettingsListConnect;


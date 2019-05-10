import React from "react";
import { connect } from "react-redux";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { startEditIsAdminUser, startRemoveUser } from "../actions/user";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { startRemoveUserEmail } from "../actions/userEmailList";

class UserItemSettings extends React.Component {
    constructor(props) {
        super(props);

        var allUsers = this.props.users;
        var userIndex = 0;
        let currentUserEmailAndId = allUsers.map((user, index) => {
            if(user.email === this.props.userObj.email){
                userIndex = index;
                return user.email + " " + user.userId;
            }
        })[userIndex];

        let name = this.props.userObj.name;
        let surname = this.props.userObj.surname;
        let email = this.props.userObj.email;  
        var disabledButtonDeleteUser = false;

        this.state = {
            isAdmin: this.props.userObj.isAdmin,
            logUser: this.props.userObj.logUser,
            name,
            surname,
            email,
            disabledButtonDeleteUser,
            modalShow: false,
            modalSaveShow: false,
            modalDeleteShow: false,
            allUsers,
            currentUserEmailAndId,
            classDisabledButtonDeleteUser: ""
        };
        
        if(this.state.email === this.props.user.email) this.state.disabledButtonDeleteUser = true;
        this.state.disabledButtonDeleteUser ? this.state.classDisabledButtonDeleteUser = "deleteOptionDisabled" : this.state.classDisabledButtonDeleteUser = "deleteOption";
    }

    buttonDeleteUserModalClick = () => {
        this.props.startRemoveUser(this.state.currentUserEmailAndId);
        this.props.startRemoveUserEmail(this.state.email);
    }

    buttonDeleteUserClick = () => { 
        if(!this.state.logUser) {
            this.setState({modalDeleteShow: true}, this.handleShow);
        } 
        else {
            this.props.startRemoveUserEmail(this.state.email);
        }
    } 

    handleShow = () => {
        this.setState({modalShow: true});
        if(!this.state.modalSaveShow) {
            this.setState({modalSaveShow: true, modalDeleteShow: false});
        }
        else if (!this.state.modalDeleteShow) {
            this.setState({modalDeleteShow: true, modalSaveShow: false});
        }
    }

    handleClose = () => {
        this.setState({modalShow: false, modalSaveShow: false, modalDeleteShow: false});
    }

    onChange = () => {
        let isAdmin = !this.state.isAdmin;
        this.setState({isAdmin});
        let updates = {
            userId: this.props.userObj.userId,
            isAdmin 
        };
        this.props.startEditIsAdminUser(updates);
    }

    render() {
        let disabledButtonDeleteUserStyle = {"backgroundColor":"rgba(0, 0, 0, 0)", "padding":"0"};
        let disabledButtonDeleteUserStyleModal = {color: "white", backgroundColor: "#d65b5b", border: "none"};
        let deteleUserMessageModal = <p>Are you sure you want to delete {this.state.name + " " + this.state.surname} with {this.state.email} email? This action is final.</p>;

        return (
            <div className="list-item d-flex justify-content-between">
                <div className="show-for-desktop col-2">
                    <span className="span__typeActivity">{this.state.name}</span>
                </div>
                <div className="show-for-desktop col-3">
                    <span className="span__typeActivity">{this.state.surname}</span>
                </div>
                <div className="show-for-desktop col-5">
                    <span className="span__typeWorking">{this.state.email}</span>
                </div>
                <div className="show-for-desktop col-1 text-center">
                    <form >
                        <input type="checkbox" checked={this.state.isAdmin} onChange={this.onChange} disabled={this.state.logUser}/>
                    </form>
                </div>
                <div className="show-for-desktop col-1 text-center">
                    <button 
                        disabled={this.state.disabledButtonDeleteUser}
                        className={this.state.classDisabledButtonDeleteUser}
                        style={disabledButtonDeleteUserStyle}
                        onClick={this.buttonDeleteUserClick} 
                    >
                        <FontAwesomeIcon icon="times-circle" className="timesCircle" size="2x"/>
                    </button>
                </div>
                <Modal 
                    isOpen={this.state.modalShow} 
                    toggle={this.handleClose} 
                >
                    <ModalHeader className="modal__header-remove"><span className="modal__title-remove">Delete User</span></ModalHeader>
                    <ModalBody>
                        {deteleUserMessageModal}
                    </ModalBody>
                    <ModalFooter>
                        <Button style={disabledButtonDeleteUserStyleModal} className="modal__button" onClick={this.buttonDeleteUserModalClick}>Yes</Button>
                        <Button className="modal__button" onClick={this.handleClose}>No</Button>
                    </ModalFooter>
                </Modal>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        users: state.allUsers,
        typeWorkingOptions: state.typeWorkingOptions,
        user: state.user
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        startEditIsAdminUser: (updates) => dispatch(startEditIsAdminUser(updates)),
        startRemoveUser: (userId) => dispatch(startRemoveUser(userId)),
        startRemoveUserEmail: (email) => dispatch(startRemoveUserEmail(email))
    };
};

const UserItemSettingsConnect = connect(mapStateToProps, mapDispatchToProps)(UserItemSettings);
export default UserItemSettingsConnect;


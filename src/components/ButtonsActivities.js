import { Link } from "react-router-dom";
import store from "../store/configureStore";
import watch from "redux-watch";
import React from "react";
import { connect } from "react-redux";
import { startSetActivity, startRemoveActivitiesGroup } from "../actions/activities";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import {setActivitiesGroupToBeRemoved} from "../actions/activitiesGroupToBeRemoved";

let watchState = watch(store.getState);

class ButtonActivities extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            activitiesGroupToBeRemoved: this.props.activitiesGroupToBeRemoved,
            modalShow: false,
            modalSaveShow: false,
            modalDeleteShow: false,
            fromAdmin: this.props.fromAdmin,
            userId: this.props.userId
        }
        this.unsubscribe = store.subscribe(watchState((currentVal) => {
            this.setState({ 
               activitiesGroupToBeRemoved: currentVal.activitiesGroupToBeRemoved
            });
        })); 
    }
    componentDidMount() {
       this.props.setActivitiesGroupToBeRemoved();
    }

    componentWillUnmount(){
        this.unsubscribe();
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
  
     removeActivitiesSelection = () => {
        this.props.startRemoveActivitiesGroup(this.state.activitiesGroupToBeRemoved, this.state.userId);
        this.props.setActivitiesGroupToBeRemoved();
        this.setState({modalShow: false, modalSaveShow: false, modalDeleteShow: false});
     }
  
     startRemoveGroup = () => {
        this.setState({modalDeleteShow: true}, this.handleShow);
    } 
  
    render() {
        let trashIconHidden = true;
        let buttonAddActivityHidden = false;
        let styleButtonsRow;
        let modalMessageRemoveActivities; 
        let modalHeaderTextRemoveActivities;
        let divRowStyle = {height: "0"}
        if(this.state.activitiesGroupToBeRemoved.length > 0) trashIconHidden = false;
        if(this.state.activitiesGroupToBeRemoved.length < 2) {
            modalHeaderTextRemoveActivities = "Remove activity"
            modalMessageRemoveActivities = <span>Are you sure you want to remove the selected activity?</span>;
        }
        else {
            modalHeaderTextRemoveActivities = "Remove activities"
            modalMessageRemoveActivities = <span>Are you sure you want to remove the selected activities?</span>;
        }
        if(this.state.fromAdmin) { 
            buttonAddActivityHidden = true;
            if(!trashIconHidden) {
                divRowStyle = {display: "block"};
                styleButtonsRow = {borderTop: "none", padding:"0 0 4.8rem 0"};
            }
        }

        let linkStyle = {textDecoration: 'none'};
        let disabledButtonDeleteUserStyleModal = {color: "white", backgroundColor: "#d65b5b", border: "none"};
       
        return(
            <div style={divRowStyle}>
                <div className="row d-flex justify-content-around row__buttonCreate" style={styleButtonsRow}>
                    <div className="col-2 col-xl-2 col-lg-4 col-md-6 col-sm-6" hidden={buttonAddActivityHidden}>
                        <Link style={linkStyle} to="/create"><button className="button button__create">Add Activity</button></Link>
                    </div>
                    <div className="col-2 col-xl-2 col-lg-4 col-md-6 col-sm-6" hidden={trashIconHidden}>
                        <button className="button removeButton" onClick={this.startRemoveGroup} cursor="pointer">Remove Activities</button>
                    </div>
                </div>
                <Modal 
                    isOpen={this.state.modalShow} 
                    toggle={this.handleClose} 
                >
                    <ModalHeader className="modal__header-remove"><span className="modal__title-remove">{modalHeaderTextRemoveActivities}</span></ModalHeader>
                    <ModalBody>
                        {modalMessageRemoveActivities}
                    </ModalBody>
                    <ModalFooter>
                    <Button className="modal__button" style={disabledButtonDeleteUserStyleModal} onClick={this.removeActivitiesSelection}>Delete</Button>
                    <Button className="modal__button" onClick={this.handleClose}>Cancel</Button>
                    </ModalFooter>
                </Modal>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
       activitiesGroupToBeRemoved: state.activitiesGroupToBeRemoved,
    };
 };
 
 const mapDispatchToProp = (dispatch) => ({
    startSetActivity: (emailId) => dispatch(startSetActivity(emailId)),
    startRemoveActivitiesGroup: (activitiesSelection, userId) => dispatch(startRemoveActivitiesGroup(activitiesSelection, userId)),
    setActivitiesGroupToBeRemoved: () => dispatch(setActivitiesGroupToBeRemoved())
 });
 
 export default connect(mapStateToProps, mapDispatchToProp)(ButtonActivities);
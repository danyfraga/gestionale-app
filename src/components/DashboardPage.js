import React from "react";
import { Link } from "react-router-dom";
import ActivitiesList from "../components/ActivitiesList";
import ActivitiesFilters from "../components/ActivitiesFilters";
import DashboardHeader from "../components/DashboardHeader";
import { switchCheck, sortByTypeWorking, sortByActivity } from "../actions/filters";
import { startSetActivity, startRemoveActivitiesGroup } from "../actions/activities";
import { connect } from "react-redux";
import store from "../store/configureStore";
import watch from "redux-watch";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import {setActivitiesGroupToBeRemoved} from "../actions/activitiesGroupToBeRemoved";

let watchState = watch(store.getState);

class DashboardPage extends React.Component {
   constructor (props) {
      super(props);

      this.state = {
         switchChecked: this.props.filters.switchChecked,
         typeWorking: this.props.filters.sortByTypeWorking,
         typeActivity: this.props.filters.sortByActivity,
         activitiesGroupToBeRemoved: this.props.activitiesGroupToBeRemoved,
         modalShow: false,
         modalSaveShow: false,
         modalDeleteShow: false,
      }
      this.unsubscribe = store.subscribe(watchState((currentVal) => {
         this.setState({ 
            activities: currentVal.activities,
            switchChecked: currentVal.filters.switchChecked,
            activitiesGroupToBeRemoved: currentVal.activitiesGroupToBeRemoved
         });
      })); 
   }

   componentDidMount() {
      let userId = this.props.auth.uid;
      this.props.startSetActivity(userId);
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
      this.props.startRemoveActivitiesGroup(this.state.activitiesGroupToBeRemoved);
      this.props.setActivitiesGroupToBeRemoved();
      this.setState({modalShow: false, modalSaveShow: false, modalDeleteShow: false});
   }

   startRemoveGroup = () => {
      this.setState({modalDeleteShow: true}, this.handleShow);
  } 

  render() {
      let linkStyle = {textDecoration: 'none'};
      let trashIconHidden = true;
      if(this.state.activitiesGroupToBeRemoved.length > 0) trashIconHidden = false;
      let disabledButtonDeleteUserStyleModal = {color: "white", backgroundColor: "#d65b5b", border: "none"};

      return (
         <div className="content-container">
            <DashboardHeader/>
            <ActivitiesFilters/>
            <ActivitiesList/>
            <div className="row d-flex justify-content-around row__buttonCreate">
               <div className="col-2 col-xl-2 col-lg-4 col-md-6 col-sm-6">
                  <Link style={linkStyle} to="/create"><button className="button button__create">Add Activity</button></Link>
               </div>
               <div className="col-2 col-xl-2 col-lg-4 col-md-6 col-sm-6" hidden={trashIconHidden}>
                  <button className="button removeButton" onClick={this.startRemoveGroup} cursor="pointer">
                     <span>Delete Selection</span>
                     <FontAwesomeIcon icon="trash-alt" className="trashAlt trash-style" size="1x"/>
                  </button>
               </div>
            </div>
            <Modal 
               isOpen={this.state.modalShow} 
               toggle={this.handleClose} 
            >
               <ModalHeader className="modal__header-remove"><span className="modal__title-remove">Delete selected activities</span></ModalHeader>
               <ModalBody>
                  <span>Are you sure you want to delete the selected activities?</span>
               </ModalBody>
               <ModalFooter>
                  <Button className="modal__button" style={disabledButtonDeleteUserStyleModal} onClick={this.removeActivitiesSelection}>Delete</Button>
                  <Button className="modal__button" onClick={this.handleClose}>Cancel</Button>
               </ModalFooter>
            </Modal>
         </div>   
      );
   }
}

const mapStateToProps = (state) => {
   return {
      filters: state.filters,
      auth: state.auth,
      activitiesGroupToBeRemoved: state.activitiesGroupToBeRemoved,
   };
};

const mapDispatchToProp = (dispatch) => ({
   switchCheck: (switchChecked) => dispatch(switchCheck(switchChecked)),
   sortByActivity: (typeActivity) => dispatch(sortByActivity(typeActivity)),
   sortByTypeWorking: (typeWorking) => dispatch(sortByTypeWorking(typeWorking)),
   startSetActivity: (emailId) => dispatch(startSetActivity(emailId)),
   startRemoveActivitiesGroup: (activitiesSelection) => dispatch(startRemoveActivitiesGroup(activitiesSelection)),
   setActivitiesGroupToBeRemoved: () => dispatch(setActivitiesGroupToBeRemoved())
});

export default connect(mapStateToProps, mapDispatchToProp)(DashboardPage);



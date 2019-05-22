import React from "react";
import { connect } from "react-redux";
import DateRangePicker from 'react-bootstrap-daterangepicker';
import moment from "moment";
import { startRemoveActivity, startSetActivity } from "../actions/activities";
import { Redirect } from "react-router-dom";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import store from "../store/configureStore";
import watch from "redux-watch";
import { Alert } from 'reactstrap';

let watchState = watch(store.getState);

class ActivityForm extends React.Component {
    constructor(props) {
        super(props);

        this._startRemoveActivity = this._startRemoveActivity.bind(this);

        let typeWorkInActivity = [];
        this.props.typeActivityOptions.map((typeActivityOption) => {
            return typeWorkInActivity[typeActivityOption.title] = typeActivityOption.hasTypeWork ? (this.props.typeWorkingOptions.map((typeWorkingOption) => {
                    return typeWorkingOption;
            })) : ([{title : "-", description : "-"}]);
        });
        
        let typeActivity = props.activity ? props.activity.typeActivity : "";
        let typesOfWorkOptions = typeWorkInActivity[typeActivity];
        let typeWorking = props.activity ? props.activity.typeWorking : "";
        let createdAt = props.activity ? moment(props.activity.createdAt): moment();
        let hours = props.activity ? props.activity.hours : "";

        this.state = {
            typeWorkingOptions: this.props.typeWorkingOptions,
            typeActivityOptions: this.props.typeActivityOptions,
            typeWorkInActivity,
            typeActivity,
            typeWorking,
            typesOfWorkOptions,
            linkPath: this.props.linkPath,
            createdAt,
            hours,
            calendarFocused: false,
            modalShow: false,
            modalSaveShow: false,
            modalDeleteShow: false,
            dateRangePickerShow: false,
            disableSaveButton: true,
            remove: false,
            activities: this.props.activities,
            hoursErrorIsHidden: true,
            hoursError: "",
            userId: this.props.userId ? this.props.userId : this.props.auth.uid
        }

        this.unsubscribe = store.subscribe(watchState((currentVal) => {
            if(this.state.activities !== currentVal.activities) {
                let currentActivity = currentVal.activities.find((activity) => {
                    return activity.idActivity === this.props.activityLinkPath;
                });
                if(currentActivity) {
                    this.setState({ 
                        activities: currentVal.activities,
                        typeActivity: currentActivity.typeActivity,
                        typeWorking: currentActivity.typeWorking,
                        createdAt: currentActivity.createdAt,
                        hours: currentActivity.hours
                    });
                }
            }
        })); 
    }

    componentWillUnmount(){
        this.unsubscribe();
    }

    componentDidMount() {
        this.props.startSetActivity(this.state.userId)
    }

    onSubmit = (e) => {
        e.preventDefault();
    }

    saveData = () => {
        this.props.onSubmit({
            typeWorking: this.state.typeWorking,
            typeActivity: this.state.typeActivity,
            createdAt: this.state.createdAt.valueOf(),
            hours: parseFloat(this.state.hours).toFixed(1) + ""
        });
    }

    onChangeTypeWorking = (e) => {
        this.setState({ typeWorking: e.target.value });
    }

    onChangeTypeActivity = (e) => {
        let typeActivity = e.target.value;
        let typesOfWorkOptions = this.state.typeWorkInActivity[typeActivity];
        let typeWorking = typesOfWorkOptions[0].title;
        this.setState({ 
            typeActivity, 
            typesOfWorkOptions, 
            typeWorking 
        });
    }

    onDateChange = (e, picker) => {
        const date = picker.startDate;
        if(picker) {
            this.setState({createdAt: date});
        }
    }

    onHoursChange = (e) => {
        let hours = e.target.value;
        this.setState({ 
            hours,
            hoursError: "",
            hoursErrorIsHidden: true 
        });
        let notAcceptedChar = hours.includes("e");
        let parseHours = hours.replace(",", ".");
        let floatHours = parseFloat(parseHours);
        let splittedHours = parseHours.split(".");
        if(notAcceptedChar) floatHours = "";
        if(floatHours < 1 || floatHours > 24) {
            this.setState({ 
                hoursError: "Error! Input must be between 1 and 24.",
                hoursErrorIsHidden: false
            });
        }
        else if(splittedHours.length > 1 && (splittedHours[1] !== "0" && splittedHours[1] !== "5")) {
            this.setState({ 
                hoursError: "Error! Only half hours are accepted.",
                hoursErrorIsHidden: false
            });
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

    onShow = () => {
        this.setState({dateRangePickerShow: true}); 
    }

    onHide = () => {
        this.setState({dateRangePickerShow: false});
    }

    activeSaveButton = () => {
        if(this.state.hours) {
            this.setState({disableSaveButton: false});
        }
        else {
            this.setState({disableSaveButton: true});
        }
    }

    _startRemoveActivity(){
        this.props.startRemoveActivity(this.props.activityLinkPath, this.state.userId);
        this.setState({remove: true});
    }
    
    render() {
        var disabledTypeWorkingSelect = false;
        var disabledTypeActivitySelect = false;
        var disableSaveButton = true;
        let typeActivitiesOptionsSelect = [];
        let typeWorkingOptionsSelect = [];
        var typeWorkingExistInDB = false;
        var typeActivityExistInDB = false;
        
        let currentTypeActivityOption = this.state.typeActivityOptions.find((element) => {
            return element.title === this.state.typeActivity;
        }); 

        for (var typeActivityOption in this.state.typeWorkInActivity) {
            if(typeActivityOption === this.state.typeActivity) {
                typeActivityExistInDB = true;
            }
            this.state.typeWorkInActivity[typeActivityOption].map((element) => {
                if(element.title === this.state.typeWorking) {
                    typeWorkingExistInDB = true;
                }
            });
        }     

        if(typeActivityExistInDB) {
            typeActivitiesOptionsSelect = this.state.typeActivityOptions.map((option) => {
                option = option.title;
                return <option key={option} value={option}>{option.charAt(0).toUpperCase() + option.slice(1)}</option>;
            });

            if(!currentTypeActivityOption.hasTypeWork) {
                disabledTypeWorkingSelect = true;
                typeWorkingOptionsSelect = <option key={this.state.typeWorking} value={this.state.typeWorking}>{(this.state.typeWorking).charAt(0).toUpperCase() + (this.state.typeWorking).slice(1)}</option>;
            }
            else {
                typeWorkingOptionsSelect = this.state.typeWorkingOptions.map((option) => {
                    option = option.title;
                    return <option key={option} value={option}>{(option).charAt(0).toUpperCase() + (option).slice(1)}</option>;
                });
            }
        }

        if(!typeWorkingExistInDB || !typeActivityExistInDB ) {
            typeActivitiesOptionsSelect = <option key={this.state.typeActivity} value={this.state.typeActivity}>{this.state.typeActivity.charAt(0).toUpperCase() + this.state.typeActivity.slice(1)}</option>;
            typeWorkingOptionsSelect = <option key={this.state.typeWorking} value={this.state.typeWorking}>{this.state.typeWorking.charAt(0).toUpperCase() + this.state.typeWorking.slice(1)}</option>;
            disabledTypeWorkingSelect = true;
            disabledTypeActivitySelect = true;
        }

        if(this.state.hoursErrorIsHidden && this.state.hours.length > 0) {
            disableSaveButton = false;
        }

        let selectDate = moment(this.state.createdAt).format("DD/MM/YYYY");

        //Style
        let buttonDateRangerPicker;
        if(this.state.dateRangePickerShow) buttonDateRangerPicker = {backgroundColor: "#b8e5ff", border: "#1c88bf 1px solid", color: "#1c88bf", fontWeight: "500"};
        let containerStyles = {display: 'block'};
        let buttonRemoveActivityContainer;
        if (window.location.pathname === "/create") buttonRemoveActivityContainer = {display: "none"};
        let buttonStartRemoveActivity = {color: "white", backgroundColor: "#d65b5b", border: "none"};
        let buttonSaveActivity = {color: "white", backgroundColor: "#1c88bf", border: "none"};

        let hoursString = !this.state.hours.includes(".") ? this.state.hours + (this.state.hours > 1 ? ".0 hours" : ".0 hour") : this.state.hours + (this.state.hours > 1 ? " hours" : " hour")  
        let typeActivityString = this.state.typeActivity.charAt(0).toUpperCase() + this.state.typeActivity.slice(1);
        let typeWorkingInString = this.state.typeWorking === "-" ? "" : "in ";
        let typeWorkingString = (this.state.typeWorking).replace("-", "").toUpperCase();
        if(typeWorkingString.trim() !== "") typeWorkingString += " ";
        let dateString = moment(this.state.createdAt).format("DD/MM/YYYY");
        let saveString = `Are you sure you want to save ${hoursString} of ${typeActivityString} ${typeWorkingInString}${typeWorkingString}on ${dateString}`;

        return (
            <div>
                {this.state.remove && <Redirect to={this.state.linkPath} push/>}
                {
                    !this.state.remove && 
                    <div className="row d-flex justify-content-center">
                        <form onSubmit={this.onSubmit} className="form col-12 col-sm-12 col-md-6 col-lg-6 col-xl-3">
                            <div className="row d-flex justify-content-center">
                                <div className="col-12">
                                    <span className="span">Choose type of activity</span>
                                    <select
                                        value={this.state.typeActivity}
                                        onChange={this.onChangeTypeActivity}
                                        className="select form-control"
                                        disabled={disabledTypeActivitySelect}
                                    >
                                        {typeActivitiesOptionsSelect}
                                    </select>
                                </div>    
                                
                            </div>                
                            <div className="row d-flex justify-content-center">
                                <div className="col-12">
                                    <span className="span">Choose type of work</span>
                                    <select
                                        value={this.state.typeWorking}
                                        onChange={this.onChangeTypeWorking}
                                        disabled={disabledTypeWorkingSelect}
                                        className="select form-control"
                                    >
                                        {typeWorkingOptionsSelect}
                                    </select>
                                </div>
                            </div>
                            <div className="row d-flex justify-content-center">
                                <div className="col-12">
                                    <span className="span">Select Date</span>
                                    <DateRangePicker 
                                        containerStyles={containerStyles}
                                        singleDatePicker
                                        onApply={this.onDateChange}
                                        onShow={this.onShow}
                                        onHide={this.onHide}   
                                    >
                                        <button style={buttonDateRangerPicker} className="button buttonDate">{selectDate}</button>
                                    </DateRangePicker> 
                                </div>
                            </div>
                            <div className="row d-flex justify-content-center">
                                <div className="col-12">
                                    <span className="span">Number of hours</span>
                                    <input
                                        type="number"
                                        placeholder="Hours"
                                        autoFocus
                                        value={this.state.hours}
                                        onChange={this.onHoursChange}
                                        className="text-input form-control"
                                    />
                                    <div className="alert__container">
                                        <Alert hidden={this.state.hoursErrorIsHidden} color="danger" className="alert__form">{this.state.hoursError}</Alert>
                                    </div>
                                </div>
                            </div>
                            <div className="row justify-content-center row__buttonSaveActivity">
                                <div className="col-6 text-center">
                                    <button 
                                        disabled={disableSaveButton}
                                        className={disableSaveButton ? "button__disabled" : "button"}
                                        onClick={
                                            () => {
                                                this.setState({modalSaveShow: true}, this.handleShow);
                                            }
                                        }
                                    >
                                        Save Activity
                                    </button>
                                </div>
                                <div className="col-6 text-center" style={buttonRemoveActivityContainer}>
                                    <button 
                                        className="button removeButton"
                                        onClick={() => { 
                                            this.setState({modalDeleteShow: true}, this.handleShow);
                                        }} 
                                    >
                                        Remove Activity
                                    </button>
                                </div>
                            </div>
                            <Modal 
                                isOpen={this.state.modalShow} 
                                toggle={this.handleClose} 
                            >
                                <div>
                                    {
                                        this.state.modalSaveShow ? (   
                                            <div>
                                                <ModalHeader className="modal__header-remove"><span className="modal__title-remove">Remove Activity</span></ModalHeader>
                                                <ModalBody>
                                                    <p>Are you sure you want to delete this activity?</p>
                                                </ModalBody>
                                                <ModalFooter>
                                                    <Button style={buttonStartRemoveActivity} className="modal__button" onClick={this._startRemoveActivity}>Yes</Button>
                                                    <Button className="modal__button" onClick={this.handleClose}>No</Button>
                                                </ModalFooter>
                                            </div>
                                        ) : (
                                            <div>
                                                <ModalHeader className="modal__header-save"><span className="modal__title-save">Save Activity</span></ModalHeader>
                                                <ModalBody>
                                                    {saveString}
                                                </ModalBody>
                                                <ModalFooter>
                                                    <Button style={buttonSaveActivity} className="modal__button" onClick={this.saveData}>Save</Button>
                                                    <Button className="modal__button" color="link" onClick={this.handleClose}>Cancel</Button>
                                                </ModalFooter>
                                            </div>
                                        )
                                    }
                                </div> 
                            </Modal>
                        </form>
                    </div>
                }
            </div>
        );
    }
}

const mapStateToProps = (state, props) => {
    return {
        activityLinkPath: props.activityLinkPath,
        auth: state.auth,
        typeWorkingOptions: state.typeWorkingOptions,
        typeActivityOptions: state.typeActivityOptions,
        activities: state.activities
    }
}

const mapDispatchToProps = (dispatch) => ({
    startRemoveActivity: (idActivity, idUser) => dispatch(startRemoveActivity(idActivity, idUser)),
    startSetActivity: (uid) => dispatch(startSetActivity(uid))
});

export default connect(mapStateToProps, mapDispatchToProps)(ActivityForm)

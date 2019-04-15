import React from "react";
import { connect } from "react-redux";
import DateRangePicker from 'react-bootstrap-daterangepicker';
import moment from "moment"
import { generateOptionTypeActivities, generateOptionTypeWorking } from "../selectors/activities";
import { startRemoveActivity } from "../actions/activities";
import { Redirect } from "react-router-dom"
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

class ActivityForm extends React.Component {
    constructor(props) {
        super(props);
        this._startRemoveActivity = this._startRemoveActivity.bind(this);

        let typeActivities = this.props.typeActivityOptions;
        let typeWorkingOpitonsObj = this.props.typeWorkingOptions;
        let defaultTypeWorkingObj = typeWorkingOpitonsObj[0];
        var defaultTypeActivity = typeActivities[0].title;
        typeActivities.map(typeActivity => typeActivity.typeWorkingOption = typeWorkingOpitonsObj);
        
        let typeActivity = props.activity ? props.activity.typeActivity: defaultTypeActivity;
        let typesOfWorkOptions = (typeActivities.find((activity)=> activity.title == typeActivity)).typeWorkingOption;
        let typeWorking = props.activity ? props.activity.typeWorking : defaultTypeWorkingObj.title;

        this.state = {
            typeWorking,
            typeActivity,
            createdAt: props.activity ? moment(props.activity.createdAt) : moment(),
            hours: props.activity ? props.activity.hours : "",
            typesOfWorkOptions: typesOfWorkOptions,
            calendarFocused: false,
            modalShow: false,
            modalSaveShow: false,
            modalDeleteShow: false,
            dateRangePickerShow: false,
            disableSaveButton: true,
            remove: false
        }
    }

    onSubmit = (e) => {
        e.preventDefault();
    }

    saveData = () => {
        this.props.onSubmit({
            typeWorking: this.state.typeWorking,
            typeActivity: this.state.typeActivity,
            createdAt: this.state.createdAt.valueOf(),
            hours: this.state.hours
        });
    }

    onChangeTypeWorking = (e) => {
        this.setState({ typeWorking: e.target.value });
    }

    onChangeTypeActivity = (e) => {
        let typeActivity = e.target.value;
        this.setState({ 
            typeActivity: typeActivity
        });
    }

    onDateChange = (e, picker) => {
        const date = picker.startDate
        if(picker) {
            this.setState({ createdAt: date});
        }
    }

    onHoursChange = (e) => {
        const hours = e.target.value;
        if(!hours || hours.match(/^[0-9]$|^[1][0-9]$|^[2][0-4]$/)) {
            this.setState(() => ({ hours }));
         }
    }

    handleShow = () => {
        this.setState({ modalShow: true})
        if(!this.state.modalSaveShow) {
            this.setState({ modalSaveShow: true, modalDeleteShow: false });
        }
        else if (!this.state.modalDeleteShow) {
            this.setState({ modalDeleteShow: true, modalSaveShow: false });
        }
    }

    handleClose = () => {
        this.setState({ modalShow: false, modalSaveShow: false, modalDeleteShow: false });
      }

    onShow = () => {
        this.setState({dateRangePickerShow: true}); 
    }

    onHide = () => {
        this.setState({dateRangePickerShow: false});
    }

    activeSaveButton = () => {
        if(this.state.hours) {
            this.setState({ disableSaveButton: false})
        }
        else {
            this.setState({ disableSaveButton: true})
        }
    }

    _startRemoveActivity(){
        this.props.startRemoveActivity({idActivity: this.props.activity.idActivity});
        this.setState({remove:true});
        
    }

    render() {
        
        const disableSaveButton = () => {
            if((this.state.typeActivity === "working") && 
                (this.state.typeWorking && this.state.hours)){
                return false;
            }
            else if ((this.state.typeActivity !== "working") && (this.state.hours)) {
                return false;
            }
            else {
                return true;
            }
            
        }

        const disableInputDescription = () => {
            if(this.state.typeActivity !== "working") {
                return true
            }
            else {
                return false;
            }
        }

        let options = this.props.typeActivities.map((item) => {
            return <option key={item} value={item}>{item.charAt(0).toUpperCase() + item.slice(1)}</option>
        });
        
        let workingOptionsSelect = [];
        for(var key in (this.state.typesOfWorkOptions)) {
            var typeWorkingTitle = this.state.typesOfWorkOptions[key].title;
            workingOptionsSelect.push(<option key={typeWorkingTitle} value={typeWorkingTitle}>{typeWorkingTitle}</option>)
        }

        let selectDate = moment(this.state.createdAt).format("DD/MM/YYYY");

        let buttonDateRangerPicker = this.state.dateRangePickerShow ? 
            (
                { backgroundColor: "#b8e5ff", border: "#1c88bf 1px solid", color: "#1c88bf", fontWeight: "500" }
            ) : ( 
                {}
            );
        
        let hoursString = this.state.hours + (this.state.hours > 1 ? " hours" : " hour"); 
        let typeActivityString = this.state.typeActivity;
        let typeWorkingInString = this.state.typeWorking === "-" ? "" : "in ";
        let typeWorkingString = (this.state.typeWorking).replace("-","").toUpperCase();
        if(typeWorkingString.trim() !== "") typeWorkingString+= " ";
        let dateString = moment(this.state.createdAt).format("DD/MM/YYYY")
        let saveString =  `Are you sure you want to save ${hoursString} of ${typeActivityString} ${typeWorkingInString}${typeWorkingString}on ${dateString}`;

        return (
            <div>
                {this.state.remove && <Redirect to="/" push />}
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
                                    >
                                        {options}
                                    </select>
                                </div>    
                                
                            </div>                
                            <div className="row d-flex justify-content-center">
                                <div className="col-12">
                                    <span className="span">Choose type of work</span>
                                    <select
                                        value={this.state.typeWorking}
                                        onChange={this.onChangeTypeWorking}
                                        disabled={disableInputDescription()}
                                        className="select form-control"
                                    >
                                        {workingOptionsSelect}
                                    </select>
                                </div>
                            </div>
                            <div className="row d-flex justify-content-center">
                                <div className="col-12">
                                    <span className="span">Select Date</span>
                                    <DateRangePicker 
                                        containerStyles={{ display: 'block' }}
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
                                </div>
                            </div>
                            <div className="row justify-content-center">
                                <div className="col-6 text-center">
                                    <button 
                                        disabled={disableSaveButton()}
                                        className={disableSaveButton() ? "button__disabled" : "button"}
                                        onClick={() => {
                                            this.setState({ modalSaveShow: true }, this.handleShow );
                                        }}
                                    >
                                        Save Activity
                                    </button>
                                </div>
                                <div className="col-6 text-center" style={window.location.pathname === "/create" ? { display: "none" } : {}}>
                                    <button 
                                        className="button removeButton"
                                        onClick={() => { 
                                            this.setState({ modalDeleteShow: true }, this.handleShow);
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
                                    {this.state.modalSaveShow ? 
                                        (   <div>
                                                <ModalHeader className="modal__header-remove"><span className="modal__title-remove">Remove Activity</span></ModalHeader>
                                                <ModalBody>
                                                    <p>Are you sure you want to delete this activity?</p>
                                                </ModalBody>
                                                <ModalFooter>
                                                    <Button style={{color: "white", backgroundColor: "#d65b5b", border: "none"}} className="modal__button" onClick={this._startRemoveActivity}>Yes</Button>
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
                                                    <Button style={{color: "white", backgroundColor: "#1c88bf", border: "none"}} className="modal__button" onClick={this.saveData}>Save</Button>
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

const mapStateToProps = (state) => {
    return {
        typeActivities: generateOptionTypeActivities(),
        typeWorking: generateOptionTypeWorking(),
        typeWorkingOptions: state.typeWorkingOptions,
        typeActivityOptions: state.typeActivityOptions
    }
}

const mapDispatchToProps = (dispatch) => ({
    startRemoveActivity: (idActivity) => {
        dispatch(startRemoveActivity(idActivity))
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(ActivityForm)

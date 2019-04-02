import React from "react";
import moment from "moment";
import { connect } from "react-redux";
import  { sortByTypeWorking, sortByActivity, setStartDate, setEndDate, switchCheck } from "../actions/filters";
import DateRangePicker from 'react-bootstrap-daterangepicker';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-daterangepicker/daterangepicker.css';
import Switch from "react-switch";
import { generateOptionTypeActivities, generateOptionTypeWorking } from "../selectors/activities";

class ActivitiesFilters extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            switchChecked: false,
            typeWorking: "",
            typeActivity: "",
            dateRangePickerShow: false
        }
    }

    handleChange = () => {
        let currentSwitchState = this.state.switchChecked;
        if(currentSwitchState) {
            this.setState({ switchChecked: false }) 
        }
        else {
            this.setState({ switchChecked: true, typeWorking: "", typeActivity: "All" })
            this.props.sortByTypeWorking("all");
            this.props.sortByActivity("all") 
            
        }
        this.props.switchCheck(!currentSwitchState);
    }

    onSortChangeTypeWorking = (e) => {
        this.setState({ typeWorking: e.target.value });
        this.props.sortByTypeWorking(e.target.value);
    }

    onSortChangeType = (e) => {
        if(this.state.typeActivity === "working") {
            this.setState({ typeWorking: ""})
            this.props.sortByTypeWorking("all")
        }
        this.setState({ typeActivity: e.target.value })
        this.props.sortByActivity(e.target.value) 
    }

    applyDates = (e, picker) => {
        this.props.setStartDate(picker.startDate);
        this.props.setEndDate(picker.endDate);
    }

    onClick = (e) => {
        e.preventDefault();
    } 

    onShow = () => {
        this.setState({dateRangePickerShow: true}); 
    }

    onHide = () => {
        this.setState({dateRangePickerShow: false});
    }

    render() {
        let thisProps = this.props;
        const ranges = () => {
            return {
                "This Month": [moment().startOf('month'), moment().endOf('month')],
                "Today": [moment(), moment()],
                "Last 7 Days": [moment().subtract(6, 'days'), moment()],
                "Last 30 Days": [moment().subtract(29, 'days'), moment()] 
            }
        }
        const locale = () => {
            return {
                "format": "MM/DD/YYYY",
                "separator": " - ",
                "applyLabel": "Apply",
                "cancelLabel": "Cancel",
                "fromLabel": "",
                "toLabel": "",
                "customRangeLabel": "Select",
                "weekLabel": "W",
                "daysOfWeek": [
                    "Su",
                    "Mo",
                    "Tu",
                    "We",
                    "Th",
                    "Fr",
                    "Sa"
                ],
                "monthNames": [
                    "January",
                    "February",
                    "March",
                    "April",
                    "May",
                    "June",
                    "July",
                    "August",
                    "September",
                    "October",
                    "November",
                    "December"
                ],
                "firstDay": 1
            }
        }

        let options = ["all", ...thisProps.typeActivities].map((item) => {
            return <option key={item} value={item} >{item.charAt(0).toUpperCase() + item.slice(1)}</option>
        });
        let workingOptions = ["all", ...thisProps.typeWorking].map((type) => {
            return <option key={type} value={type} >{type.charAt(0).toUpperCase() + type.slice(1)}</option>
        })

        let showDataInput = () => {
            if(this.state.switchChecked) {
                return true;
            }
        }

        let disabledTypeWorking = () => {
            if(this.state.typeActivity !== "working") {
                return true;
            }
        }
        
        //Calendar Button
        let startDate = moment(thisProps.filters.startDate).format("DD/MM/YYYY");
        let endDate = moment(thisProps.filters.endDate).format("DD/MM/YYYY");
        var rangeOfDate =  startDate === endDate ? startDate : <span>From {startDate} to {endDate}</span>;

        //Style
        let labelStyle = this.state.switchChecked ? { border: "#1c88bf 1px solid" } : { border: "#cacccd 1px solid" };
        let spanStyle = this.state.switchChecked ? { color: "#1c88bf"} : { color: "#495057"};
        let buttonDateRangerPicker = this.state.dateRangePickerShow ? 
            (
                { backgroundColor: "#b8e5ff", border: "#1c88bf 1px solid", color: "#1c88bf", fontWeight: "500"} 
            ) : ( 
                {}
            );
            
        return (
                <div className="row d-flex justify-content-center row__filter">
                    <div className="col-10 col-xl-2 col-lg-2 col-md-6 col-sm-8 form-group ">
                        <span className="span">Type Activity</span>
                        <select
                            value={this.props.filters.sortByActivity}
                            onChange={this.onSortChangeType}
                            disabled={showDataInput()}
                            className="select form-control text-center"
                        >
                            { options }
                        </select>
                    </div>
                    <div className="col-10 col-xl-2 col-lg-2 col-md-6 col-sm-8 form-group">
                        <span className="span">Type Work Activity</span>
                        <select
                                value={this.props.filters.sortByTypeWorking}
                                onChange={this.onSortChangeTypeWorking}
                                disabled={disabledTypeWorking()}
                                className="select form-control text-center"
                            >
                                { workingOptions }
                        </select>
                    </div>
                    <div className="col-10 col-xl-3 col-lg-3 col-md-6 col-sm-8 form-group">
                        <span className="span">Choose Date</span>
                        <DateRangePicker
                            alwaysShowCalendars 
                            onApply={this.applyDates}
                            startDate={this.props.filters.startDate}
                            endDate={this.props.filters.endDate}
                            showDropdowns={true}
                            ranges={ranges()}
                            locale={locale()}
                            onShow={this.onShow}
                            onHide={this.onHide}
                            containerStyles={{ display: 'block' }}
                        >
                            <button onClick={this.onClick} className="button buttonDate" style={buttonDateRangerPicker}>{rangeOfDate}</button>
                        </DateRangePicker>
                    </div>
                    <div className="col-10 col-xl-4 col-lg-4 col-md-6 col-sm-8 form-group">
                        <span className="span">Data View</span>
                        <label className="label text-center" style={labelStyle}>
                            <span className="span span__filter" style={spanStyle}>Partial Data</span>
                            <Switch
                                checked={this.state.switchChecked}
                                onChange={this.handleChange}
                                onColor="#86d3ff"
                                onHandleColor="#2693e6"
                                handleDiameter={30}
                                uncheckedIcon={false}
                                checkedIcon={false}
                                boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
                                activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
                                height={20}
                                width={48}
                                className="react-switch switch"
                                id="material-switch"
                            />
                            <span className="span span__filter" style={spanStyle}>Total Data</span>
                        </label>
                    </div>
                </div>            
        );
    }
}

const mapStateToProps = (state) => {
    return {
        filters: state.filters,
        typeActivities: generateOptionTypeActivities(),
        typeWorking: generateOptionTypeWorking()
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        sortByTypeWorking: (typeWorking) => dispatch(sortByTypeWorking(typeWorking)),
        sortByActivity: (typeActivity) => dispatch(sortByActivity(typeActivity)),
        setStartDate: (startDate) => dispatch(setStartDate(startDate)),
        setEndDate: (endDate) => dispatch(setEndDate(endDate)),
        switchCheck: (switchChecked) => dispatch(switchCheck(switchChecked))
    }
}

export default  connect(mapStateToProps, mapDispatchToProps)(ActivitiesFilters);


                    
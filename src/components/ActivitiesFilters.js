import React from "react";
import moment from "moment";
import {connect} from "react-redux";
import  {sortByTypeWorking, sortByActivity, setStartDate, setEndDate, switchCheck, setFilters} from "../actions/filters";
import DateRangePicker from 'react-bootstrap-daterangepicker';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-daterangepicker/daterangepicker.css';
import Switch from "react-switch";
import store from "../store/configureStore";
import watch from "redux-watch";
import {setActivitiesGroupToBeRemoved} from "../actions/activitiesGroupToBeRemoved";

let watchState = watch(store.getState);

class ActivitiesFilters extends React.Component {
    constructor(props) {
        super(props);

        let filters = {
            sortByActivity: "all",
            sortByTypeWorking: "all",
            startDate: moment().startOf('month'),
            endDate: moment().endOf('month'),
            switchChecked: this.props.filters.switchChecked || false,
        }

        this.state = {
            typeActivityOptions: this.props.typeActivityOptions,
            typeWorkingOptions: this.props.typeWorkingOptions,
            filters,
            dateRangePickerShow: false
        };

        this.unsubscribe = store.subscribe(watchState((currentVal) => {
            this.setState({ 
                filters: currentVal.filters
            });
        }));
    }

    componentWillUnmount(){
        this.unsubscribe();
    }

    componentDidMount(){
        let tmpFilters = {...this.state.filters};
        this.props.setFilters(tmpFilters);
    }

    handleChange = () => {
        let tmpFilters = {...this.state.filters};
        let currentSwitchState = tmpFilters.switchChecked;
        tmpFilters.sortByActivity = "all";
        tmpFilters.sortByTypeWorking = "all";
        tmpFilters.switchChecked = !currentSwitchState;
        this.props.setFilters(tmpFilters);
        this.props.setActivitiesGroupToBeRemoved();
    }

    onSortChangeTypeWorking = (e) => {
        let tmpFilters = {...this.state.filters};
        tmpFilters.sortByTypeWorking = e.target.value;
        this.props.setFilters(tmpFilters);
    }

    onSortChangeType = (e) => {
        let tmpFilters = {...this.state.filters};
        tmpFilters.sortByTypeWorking = "all";
        tmpFilters.sortByActivity = e.target.value;
        this.props.setFilters(tmpFilters); 
    }

    applyDates = (e, picker) => {
        let tmpFilters = {...this.state.filters};
        tmpFilters.startDate = picker.startDate;
        tmpFilters.endDate = picker.endDate;
        this.props.setFilters(tmpFilters);
    } 

    onShow = () => {
        this.setState({dateRangePickerShow: true}); 
    }

    onHide = () => {
        this.setState({dateRangePickerShow: false});
    }

    render() {
        const ranges = {
            "This Month": [moment().startOf('month'), moment().endOf('month')],
            "Today": [moment(), moment()],
            "Last 7 Days": [moment().subtract(6, 'days'), moment()],
            "Last 30 Days": [moment().subtract(29, 'days'), moment()] 
        }
        const locale = {
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
        let typeActivities = this.state.typeActivityOptions;
        let typeWorkingOptions = this.state.typeWorkingOptions;

        let activitiesOptions = [{"title": "all", "description": "-"}, ...typeActivities].map((item) => {
            return <option key={item.title} value={item.title} >{(item.title).charAt(0).toUpperCase() + (item.title).slice(1)}</option>
        });

        let workingOptions = [{"title": "all", "description": "-"}, ...typeWorkingOptions].map((item) => {
            return <option key={item.title} value={item.title} >{(item.title).charAt(0).toUpperCase() + (item.title).slice(1)}</option>
        });

        let showDataInput = false;
        if(this.state.filters.switchChecked) {
            showDataInput = true;
        }
   
        let disabledTypeWorking = true;
        this.state.typeActivityOptions.map((option) => {
            if(option.title === this.state.filters.sortByActivity){
                if(option.hasTypeWork) {
                    disabledTypeWorking = false;
                }
            }
        });
     
        //Calendar Button
        let startDate = moment(this.state.filters.startDate).format("DD/MM/YYYY");
        let endDate = moment(this.state.filters.endDate).format("DD/MM/YYYY");
        var rangeOfDate =  startDate === endDate ? startDate : <span>From {startDate} to {endDate}</span>;

        //Style
        let labelStyle = this.state.filters.switchChecked ? {border: "#1c88bf 1px solid"} : {border: "#cacccd 1px solid"};
        let spanStyle = this.state.filters.switchChecked ? {color: "#1c88bf"} : {color: "#495057"};
        let buttonDateRangerPicker;
        if(this.state.dateRangePickerShow) {
            buttonDateRangerPicker = {backgroundColor: "#b8e5ff", border: "#1c88bf 1px solid", color: "#1c88bf", fontWeight: "500"};
        }
        let containerStyles = {display: "block"};

        return (
            <div className="row d-flex justify-content-center row__filter">
                <div className="col-10 col-xl-2 col-lg-2 col-md-6 col-sm-8 form-group ">
                    <span className="span">Type Activity</span>
                    <select
                        value={this.state.filters.sortByActivity}
                        onChange={this.onSortChangeType}
                        disabled={showDataInput}
                        className="select form-control text-center"
                    >
                        {activitiesOptions}
                    </select>
                </div>
                <div className="col-10 col-xl-2 col-lg-2 col-md-6 col-sm-8 form-group">
                    <span className="span">Type Work Activity</span>
                    <select
                            value={this.state.filters.sortByTypeWorking}
                            onChange={this.onSortChangeTypeWorking}
                            disabled={disabledTypeWorking}
                            className="select form-control text-center"
                        >
                            {workingOptions}
                    </select>
                </div>
                <div className="col-10 col-xl-3 col-lg-3 col-md-6 col-sm-8 form-group">
                    <span className="span">Choose Date</span>
                    <DateRangePicker
                        alwaysShowCalendars 
                        onApply={this.applyDates}
                        startDate={this.state.filters.startDate}
                        endDate={this.state.filters.endDate}
                        showDropdowns={true}
                        ranges={ranges}
                        locale={locale}
                        onShow={this.onShow}
                        onHide={this.onHide}
                        containerStyles={containerStyles}
                    >
                        <button className="button buttonDate" style={buttonDateRangerPicker}>{rangeOfDate}</button>
                    </DateRangePicker>
                </div>
                <div className="col-10 col-xl-4 col-lg-4 col-md-6 col-sm-8 form-group">
                    <span className="span">Data View</span>
                    <label className="label text-center" style={labelStyle}>
                        <span className="span span__filter" style={spanStyle}>Activities List</span>
                        <Switch
                            checked={this.state.filters.switchChecked}
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
                        <span className="span span__filter" style={spanStyle}>Activities Table</span>
                    </label>
                </div> 
            </div>           
        );
    }
}

const mapStateToProps = (state) => {
    return {
        filters: state.filters,
        typeWorkingOptions: state.typeWorkingOptions,
        typeActivityOptions: state.typeActivityOptions
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        sortByTypeWorking: (typeWorking) => dispatch(sortByTypeWorking(typeWorking)),
        sortByActivity: (typeActivity) => dispatch(sortByActivity(typeActivity)),
        setStartDate: (startDate) => dispatch(setStartDate(startDate)),
        setEndDate: (endDate) => dispatch(setEndDate(endDate)),
        switchCheck: (switchChecked) => dispatch(switchCheck(switchChecked)),
        setFilters: (filtersObj) => dispatch(setFilters(filtersObj)),
        setActivitiesGroupToBeRemoved: () => dispatch(setActivitiesGroupToBeRemoved())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ActivitiesFilters);
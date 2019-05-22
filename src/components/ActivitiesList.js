import React from "react";
import { connect } from "react-redux";
import  selectActivity from "../selectors/activities";
import ActivityItem from "../components/ActivityItem";
import { Table } from 'reactstrap';
import moment from "moment";
import { Pagination, PaginationItem, PaginationLink } from "reactstrap";
import store from "../store/configureStore";
import watch from "redux-watch";
import {addAllActivitiesInGroup, setActivitiesGroupToBeRemoved} from "../actions/activitiesGroupToBeRemoved";

let watchState = watch(store.getState);

var enumerateDaysBetweenDates = function(startDate, endDate) {
    var dates = [];
    var currDate = moment(startDate);
    var lastDate = moment(endDate);

    while(currDate.add(1, 'days').diff(lastDate) < 0) { 
        dates.push(currDate.clone().format("DD/MM/YYYY"));
    }
    return dates;
};

class ActivitiesList extends React.Component {
    constructor (props) {
        super(props);
        
        this.state = {
            currentPage: 0,
            startDate: this.props.filters.startDate,
            endDate: this.props.filters.endDate,
            fromAdmin: this.props.fromAdmin,
            userId: this.props.userId,
            typeActivityOptions: this.props.typeActivityOptions,
            switchChecked: this.props.filters.switchChecked,
            activitiesGroupToBeRemoved: this.props.activitiesGroupToBeRemoved,
            allActivitiesAreChecked: false
        };
        this.unsubscribe = store.subscribe(watchState((currentVal) => {
            this.setState({ 
                switchChecked: currentVal.filters.switchChecked,
                activitiesGroupToBeRemoved: currentVal.activitiesGroupToBeRemoved,
            });
        }));
    }

    componentDidUpdate(prevProps) {
        //When change startDate or endDate, currentPage go to 0
        if((prevProps.filters.startDate !== this.props.filters.startDate) || (prevProps.filters.endDate !== this.props.filters.endDate)) {
            this.setState({currentPage: 0});
        }
        if(this.props.filters.switchChecked !== prevProps.filters.switchChecked) {
            this.setState({allActivitiesAreChecked: false});
        }
        if(this.props.activitiesGroupToBeRemoved !== prevProps.activitiesGroupToBeRemoved){
            if(this.props.activitiesGroupToBeRemoved.length < 1) {
                this.setState({allActivitiesAreChecked: false});
            }
        }
    }

    componentWillUnmount() {
        this.unsubscribe();
    }

    handleClick = (e, index) => {
        e.preventDefault();
        this.setState({
            currentPage: index
        }); 
    }

    toggle = () => {
        this.setState({
            collapse: !this.state.collapse
        });
    }
      
    toggleCheck = () => {
        this.setState({allActivitiesAreChecked: !this.state.allActivitiesAreChecked});
        if(this.state.allActivitiesAreChecked) {
            this.props.setActivitiesGroupToBeRemoved();
        }
        else {
            let idsActivities = this.props.activities.map((activity) => {
                return activity.idActivity;
            });
            this.props.addAllActivitiesInGroup(idsActivities);
        }
    }
   
   render() {
        let props = this.props;
        let startDate = moment(props.filters.startDate).format("LL");
        let endDate = moment(props.filters.endDate).format("LL");
        let filteredDates = startDate === endDate ? (
                [moment(startDate).format("DD/MM/YYYY")]
            ) : (
                [moment(props.filters.startDate).format("DD/MM/YYYY"), ...enumerateDaysBetweenDates(startDate, endDate), moment(props.filters.endDate).format("DD/MM/YYYY")]
            );
        let rows = {};

        let typeActivityOptionsTitle = this.props.activities.map((activity, index) => {
            if(activity.typeActivity !== this.props.activities[index - 1]) {
                return activity.typeActivity;
            }
        });

        this.state.typeActivityOptions.map((option) => {
            typeActivityOptionsTitle.push(option.title);
        });

        typeActivityOptionsTitle.map((typeActivity) => {
            rows[typeActivity] = filteredDates.map(() => 0);
        });
        filteredDates.forEach((date, index) => {
           let activityForDate = props.activities.filter((activity) => {
               return moment(activity.createdAt).format("DD/MM/YYYY") === date;
            });

            activityForDate.forEach((activity) => {
                let currentHours = rows[activity.typeActivity][index];
                let totalHours = currentHours + parseFloat(activity.hours);
                rows[activity.typeActivity][index] = totalHours;
            });            
        });

        let pageSize = 7;
        let pageCount = Math.ceil(filteredDates.length / pageSize);
        const {currentPage} = this.state;

        let headerRowTable = filteredDates.map((date, index) => {
                return <th key = {date + index} className = "th-table__header ">{date}</th>;
        }).slice(currentPage * pageSize, (currentPage + 1) * pageSize);
    
        var totalHoursPerActivity = [];
        let trRows = [];
        for(var key in rows) {
            var countHours = 0;
            let typeActivity = <th className="th-table__typeActivity text-center">
                    {
                        key.charAt(0).toUpperCase() + key.slice(1)
                    }
                </th>;
            let hours = rows[key].map((hour, i) => {
                countHours = countHours + hour;
                if(hour === 0) hour = "-";
                return <td className="td-table__body text-center" key={key + "_" + i + "td"}>{hour}</td>;
            }).slice(currentPage * pageSize, (currentPage + 1) * pageSize);
            trRows.push(<tr key={key + "_tr"}>{typeActivity}{hours}</tr>);
            if(!totalHoursPerActivity.includes(key)) {
                totalHoursPerActivity.push({[key] : countHours});
            }
        }
        
        let activitiesList = this.props.activities.map((activity) => {
            return <ActivityItem 
                key={activity.idActivity} 
                {...activity} 
                fromAdmin={this.state.fromAdmin} 
                userId={this.state.userId}
                isChecked={this.state.allActivitiesAreChecked}
            />
        });
       
        let borderBottomList = this.props.activities.length > 5 ? {borderBottom: "#cacccd 1px solid"} : {borderBottom: "none"};

        return (
            <div>
                {
                    this.props.activities.length === 0 ? (
                        <div className="row list-item--message d-flex justify-content-center noActivities__p">
                            <span>No activities</span>
                        </div>
                    ) : (
                        this.state.switchChecked ? (
                            <div>
                                <div className="row row__table">
                                    <Table bordered className="table">
                                        <thead>
                                            <tr className="tr-table__header text-center">    
                                                <th className="th-table__header th-table__header-col1">Type Activity</th> 
                                                {headerRowTable} 
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {trRows}                          
                                        </tbody>
                                    </Table>
                                </div>
                                <div className="row d-flex flex-row-reverse row__pagination">
                                    <Pagination>
                                        <PaginationItem disabled={currentPage <= 0}>
                                            <PaginationLink
                                                onClick={e => this.handleClick(e, currentPage - 1)}
                                                previous
                                                href="#"
                                            />                
                                        </PaginationItem>
                                        {
                                            [...Array(pageCount)].map((page, i) => 
                                                <PaginationItem active={i === currentPage} key={i}>
                                                    <PaginationLink onClick={e => this.handleClick(e, i)} href="#">
                                                        {i + 1}
                                                    </PaginationLink>
                                                </PaginationItem>
                                            )
                                        }
                                        <PaginationItem disabled={currentPage >= pageCount - 1}>    
                                            <PaginationLink
                                                onClick={e => this.handleClick(e, currentPage + 1)}
                                                next
                                                href="#"
                                            />
                                        </PaginationItem>          
                                    </Pagination>
                                    </div>
                                </div>
                        ) : (
                            <div>
                                <div className="list-header row row__list-header">
                                    <div className="show-for-desktop col-1">
                                        <span onClick={this.toggleCheck} className="myCheckbox">
                                            <input type="checkbox" onChange={this.toggleCheck} checked={this.state.allActivitiesAreChecked} value={this.state.allActivitiesAreChecked}/>
                                            <span></span>
                                        </span>
                                    </div>
                                    <div className="show-for-desktop col-2">Date</div>
                                    <div className="show-for-desktop text-center col-6">Activity</div>
                                    <div className="show-for-desktop col-2 text-right">Hours</div>
                                    <div className="show-for-desktop col-1 text-right">Edit</div>  
                                </div>
                                <div className="scroll" style={borderBottomList}>
                                    {activitiesList}
                                </div>
                            </div>
                        )
                    )
                }
            </div>
        )
    } 
}
    
const mapStateToProps = (state) => {
    return {
        activities: selectActivity(state.activities, state.filters),
        filters: state.filters,
        typeActivityOptions: state.typeActivityOptions,
        activitiesGroupToBeRemoved: state.activitiesGroupToBeRemoved
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        addAllActivitiesInGroup: (idsActivities) => dispatch(addAllActivitiesInGroup(idsActivities)), 
        setActivitiesGroupToBeRemoved: () => dispatch(setActivitiesGroupToBeRemoved())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ActivitiesList);
import React from "react";
import { Link } from "react-router-dom";
import ActivitiesList from "../components/ActivitiesList";
import ActivitiesFilters from "../components/ActivitiesFilters";
import DashboardHeader from "../components/DashboardHeader";
import { switchCheck, sortByTypeWorking, sortByActivity } from "../actions/filters";
import { connect } from "react-redux";

class DashboardPage extends React.Component {
   constructor (props) {
      super(props);

      this.state = {
         switchChecked: this.props.filters.switchChecked,
         typeWorking: this.props.filters.sortByTypeWorking,
         typeActivity: this.props.filters.sortByActivity
      }
  }

   onClick = () => {
      this.setState({ switchChecked: false, sortByActivity: "all", sortByTypeWorking: "" });
      this.props.switchCheck(this.state.switchChecked);
      this.props.sortByActivity(this.state.typeActivity);
      this.props.sortByTypeWorking(this.state.typeWorking);
   }

  render() {
      return (
         <div className="content-container">
            <DashboardHeader/>
            <ActivitiesFilters/>
            <ActivitiesList/>
            <div className="row d-flex justify-content-center row__buttonCreate">
               <div className="col-2 col-xl-2 col-lg-4 col-md-6 col-sm-6">
                  <Link style={{ textDecoration: 'none' }} onClick={this.onClick}to="/create"><button className="button button__create">Add Activity</button></Link>
               </div>
            </div>
         </div>   
      )
   }
}

const mapStateToProps = (state) => {
   return {
       filters: state.filters,
       users: state.users
   }
}

const mapDispatchToProp = (dispatch) => ({
   switchCheck: (switchChecked) => dispatch(switchCheck(switchChecked)),
   sortByActivity: (typeActivity) => dispatch(sortByActivity(typeActivity)),
   sortByTypeWorking: (typeWorking) => dispatch(sortByTypeWorking(typeWorking))
});

export default connect(mapStateToProps, mapDispatchToProp)(DashboardPage);



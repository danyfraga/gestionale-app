import React from "react";
import { Link } from "react-router-dom";
import ActivitiesList from "../components/ActivitiesList";
import ActivitiesFilters from "../components/ActivitiesFilters";
import DashboardHeader from "../components/DashboardHeader";
import { switchCheck, sortByTypeWorking, sortByActivity } from "../actions/filters";
import { startSetActivity } from "../actions/activities";
import { connect } from "react-redux";
import store from "../store/configureStore";
import watch from "redux-watch";

let watchCustomer = watch(store.getState);

class DashboardPage extends React.Component {
   constructor (props) {
      super(props);

      this.state = {
         switchChecked: this.props.filters.switchChecked,
         typeWorking: this.props.filters.sortByTypeWorking,
         typeActivity: this.props.filters.sortByActivity,
      }
      this.unsubscribe = store.subscribe(watchCustomer((currentVal) => {
         this.setState({ 
            activities: currentVal.activities,
            switchChecked: currentVal.filters.switchChecked
         });
      })); 
  }

   componentDidMount() {
      let userId = this.props.auth.uid;
      this.props.startSetActivity(userId);
   }

   componentWillUnmount(){
      this.unsubscribe();
   }

  render() {
      let linkStyle = {textDecoration: 'none'};

      return (
         <div className="content-container">
            <DashboardHeader/>
            <ActivitiesFilters/>
            <ActivitiesList/>
            <div className="row d-flex justify-content-center row__buttonCreate">
               <div className="col-2 col-xl-2 col-lg-4 col-md-6 col-sm-6">
                  <Link style={linkStyle} to="/create"><button className="button button__create">Add Activity</button></Link>
               </div>
            </div>
         </div>   
      );
   }
}

const mapStateToProps = (state) => {
   return {
       filters: state.filters,
       auth: state.auth,
   };
};

const mapDispatchToProp = (dispatch) => ({
   switchCheck: (switchChecked) => dispatch(switchCheck(switchChecked)),
   sortByActivity: (typeActivity) => dispatch(sortByActivity(typeActivity)),
   sortByTypeWorking: (typeWorking) => dispatch(sortByTypeWorking(typeWorking)),
   startSetActivity: (emailId) => dispatch(startSetActivity(emailId))
});

export default connect(mapStateToProps, mapDispatchToProp)(DashboardPage);



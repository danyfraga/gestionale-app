import React from "react";
import { connect } from "react-redux";
import store from "../store/configureStore";
import watch from "redux-watch";
import { Pie } from 'react-chartjs-2';
import { Collapse, CardBody, Card } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

let watchCustomer = watch(store.getState);

class ActivitySummary extends React.Component {
    constructor (props) {
        super(props);

        this.state = {
            totalHoursPerActivity: this.props.totalHoursPerActivity,
            fromAdmin: this.props.fromAdmin,
            labels: [],
            data: [],
            colorPalette: ["#CC4347", "#456990", "#49C1AD", "#E26CB9","#EDAE50", "#66CC6B", "#9F76E2", "#E5E05E", "#CC0000"],
            colors: [],
            collapse: false
        }



    } 
    
    componentDidUpdate(prevProps){
        if (this.props.totalHoursPerActivity !== prevProps.totalHoursPerActivity){
            this.setState({
                totalHoursPerActivity: prevProps.totalHoursPerActivity
            }, () => {
                this.state.totalHoursPerActivity.map((typeActivity, index) => {
                    if(Object.values(typeActivity)[0] != 0) {
                        this.state.labels.push(Object.keys(typeActivity)[0]);
                        this.state.colors.push(this.state.colorPalette[index])
                        this.state.data.push(Object.values(typeActivity)[0]);
                    }
                });
            });
        }
    }
    
    toggle = () => {
        this.setState({
            collapse: !this.state.collapse
        });
    }

    render() {
        let dataLengthArray = this.state.data.length;
        let itemsPerCol = 10;
        let totalCol = Math.ceil(dataLengthArray/itemsPerCol);
        let colsComponent = [];
        
        for(var currentCol = 0; currentCol < totalCol; currentCol++) {
            let colComponent = this.state.labels.map((label, index) => {
                return (
                    <li key={label + index}>
                        <div className="bullet-legend__li" style={{"backgroundColor":`${this.state.colors[index]}`}}></div>
                        <p className="label-legend__li">{label.charAt(0).toUpperCase() + label.slice(1)}</p> 
                    </li> 
                )
            }).slice(currentCol * itemsPerCol, (currentCol + 1) * itemsPerCol);
            console.log(colComponent)
            colsComponent.push(
                <div className="col-2" key={currentCol}>
                    <ul className="ul-legend">
                        {colComponent}
                    </ul>
                </div>
            )
        }

        let graphicCol = "graphicCol";
        totalCol > 3 ? graphicCol = graphicCol + " col-4" : graphicCol = graphicCol + " col-6";

        return (
            <div hidden={this.state.fromAdmin ? false : true} className="collapse__container">
                <h2 className="settings_subtitle title-collapse">Activity summary</h2>
                {this.state.collapse ? <FontAwesomeIcon icon="angle-up" className="angle_up button-collapse" size="2x"  style={{ margin: "0" }} onClick={this.toggle} cursor="pointer"/> : <FontAwesomeIcon icon="angle-down" className="angle_down button-collapse" size="2x"  style={{ margin: "0" }} onClick={this.toggle} cursor="pointer"/>}
                <Collapse isOpen={this.state.collapse}>
                    <Card className="card-activitySummary">
                        <CardBody>
                            <div className="row justify-content-center">
                                <div className={graphicCol}>
                                    <Pie 
                                        data={{
                                            labels: this.state.labels,
                                            datasets: [{
                                                data: this.state.data,
                                                backgroundColor: this.state.colors,
                                                hoverBackgroundColor: this.state.colors
                                            }]
                                        }}
                                        options={{
                                            legend: { display: false }  
                                        }}
                                    />
                                </div>
                                {colsComponent}                           
                            </div>
                        </CardBody>
                    </Card>
                </Collapse>
            </div>
        )
    }
}

export default connect()(ActivitySummary);
import React from "react";
import { connect } from "react-redux";
import { Bar } from 'react-chartjs-2';
import { Collapse, CardBody, Card } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import  selectActivity from "../selectors/activities";

function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

class ActivitySummary extends React.Component {
    constructor (props) {
        super(props);
     
        this.state = {
            fromAdmin: this.props.fromAdmin,
            collapse: false
        }
    } 
    
    toggle = () => {
        this.setState({
            collapse: !this.state.collapse
        });
    }

    render() { 
        let typeActivityTitles = [];
        this.props.activities.map((activity, index) => {
            if(activity.typeActivity !== typeActivityTitles[index-1]) {
                typeActivityTitles[activity.typeActivity] = 0;
            }
        });
        this.props.activities.map((activity) => {
            for (var title in typeActivityTitles) {
                if(title === activity.typeActivity) {
                    typeActivityTitles[activity.typeActivity] = typeActivityTitles[activity.typeActivity] + parseInt(activity.hours);
                }
            }
        });

        let data = [];
        let labels = [];
        let colors = [];

        for(var title in typeActivityTitles) {
            var randomColor = getRandomColor();
            data.push(typeActivityTitles[title]);
            labels.push(title);
            colors.push(randomColor);
        }
        let dataLengthArray = data.length;
        let itemsPerCol = 10;
        let totalCol = Math.ceil(dataLengthArray/itemsPerCol);
        let colsComponent = [];
        
        for(var currentCol = 0; currentCol < totalCol; currentCol++) {
            let colComponent = labels.map((label, index) => {
                return (
                    <li key={label + index}>
                        <div className="bullet-legend__li" style={{"backgroundColor":`${colors[index]}`}}></div>
                        <p className="label-legend__li">{label.charAt(0).toUpperCase() + label.slice(1)}</p> 
                    </li> 
                )
            }).slice(currentCol * itemsPerCol, (currentCol + 1) * itemsPerCol);
            colsComponent.push(
                <div className="col-2" key={currentCol}>
                    <ul className="ul-legend">
                        {colComponent}
                    </ul>
                </div>
            );
        }
        let graphicCol = "graphicCol";
        totalCol > 3 ? graphicCol = graphicCol + " col-4" : graphicCol = graphicCol + " col-6";

        return (
            <div className="row row__ringProgressBar" hidden={!this.state.fromAdmin}>
                <h2 className="settings_subtitle title-collapse">Activity summary</h2>
                {this.state.collapse ? <FontAwesomeIcon icon="angle-up" className="angle_up button-collapse" size="2x"  style={{ margin: "0" }} onClick={this.toggle} cursor="pointer"/> : <FontAwesomeIcon icon="angle-down" className="angle_down button-collapse" size="2x"  style={{ margin: "0" }} onClick={this.toggle} cursor="pointer"/>}
                <Collapse isOpen={this.state.collapse} className="collapse__container">
                    <Card className="card-activitySummary">
                        <CardBody >
                            {dataLengthArray > 0 ? (
                                <div className="row justify-content-center">
                                    <div className={graphicCol}>
                                        <Bar 
                                            data={{
                                                labels: labels,
                                                datasets: [{
                                                    data: data,
                                                    backgroundColor: colors,
                                                    hoverBackgroundColor: colors
                                                }]
                                            }}
                                            options={{
                                                legend: { display: false },
                                                scales: {
                                                    yAxes: [{
                                                        display: true,
                                                        ticks: {
                                                            suggestedMin: 0,    
                                                            beginAtZero: true   
                                                        }
                                                    }]
                                            }}}
                                        />
                                    </div>
                                    {colsComponent}                           
                                </div>
                            ) : (
                                <p className="noDataShow__p text-center">No data to show</p>
                            )}
                            
                        </CardBody>
                    </Card>
                </Collapse>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
   return {
        activities: selectActivity(state.activities, state.filters)
   }
}
export default connect(mapStateToProps)(ActivitySummary);
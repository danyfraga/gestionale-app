import React from "react";
import { connect } from "react-redux";
import store from "../store/configureStore";
import watch from "redux-watch";
import { Pie } from 'react-chartjs-2';

let watchCustomer = watch(store.getState);

class RingProgressBar extends React.Component {
    constructor (props) {
        super(props);

        this.state = {
            totalHoursPerActivity: this.props.totalHoursPerActivity,
            labels: [],
            data: [],
            colorPalette: ["#CC4347", "#456990", "#49C1AD", "#E26CB9","#EDAE50", "#66CC6B", "#9F76E2", "#E5E05E", "#CC0000"],
            colors: []
        }

        console.log(this.state.colorPalette)
        this.state.totalHoursPerActivity.map((typeActivity, index) => {
            if(Object.values(typeActivity)[0] != 0) {
                this.state.labels.push(Object.keys(typeActivity)[0]);
                this.state.colors.push(this.state.colorPalette[index])
                this.state.data.push(Object.values(typeActivity)[0]);
            }
        });

        console.log(this.state.labels)
        console.log(this.state.colors)
        console.log(this.state.data)

        this.unsubscribe = store.subscribe(watchCustomer((currentVal) => {
           this.setState({totalHoursPerActivity: currentVal})
        })); 
    } 

    componentWillUnmount(){
        this.unsubscribe();
    }

    render() {
        return(
            <div className="ring-container text-center">
                <Pie 
                    data={{
                        labels: this.state.labels,
                        datasets: [{
                            data: this.state.data,
                            backgroundColor: this.state.colors,
                            hoverBackgroundColor: this.state.colors
                        }]
                    }}
                    // options={{
                    //     legend: { display: false }  
                    // }}
                />
            </div>
        )
    }
}

export default connect()(RingProgressBar);
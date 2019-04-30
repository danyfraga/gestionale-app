import React from "react";
import { connect } from "react-redux";
import watch from "redux-watch";
import store from "../store/configureStore";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import TypeWorkingOptionItem from "../components/TypeWorkingOptionItem";
import { startAddOptionActivity } from "../actions/typeActivityOption";
import { Alert } from 'reactstrap';

let watchCustomer = watch(store.getState);

class SettingTypeActivity extends React.Component {
    constructor (props) {
        super(props);

        this.state = { 
            options: this.props.typeActivityOptions, 
            newOption: "",
            newOptionDescription: "",
            newOptionHasTypeWork: false,
            typeErrorNewOption: "",
            errorNewOption: "",
        };

        this.unsubscribe = store.subscribe(watchCustomer((currentVal) => {
            if(currentVal) this.setState({ options: currentVal.typeActivityOptions })
         })); 

    }

    componentWillUnmount(){
        this.unsubscribe();
    }

    onSubmit = (e) => {
        e.preventDefault();
        let titleOption = this.state.newOption;
        let descriptionOption = this.state.newOptionDescription;
        let hasTypeWorkOption = this.state.newOptionHasTypeWork;
        let typeActivity = {
            "title": titleOption,
            "description": descriptionOption ? descriptionOption : "-",
            "hasTypeWork": hasTypeWorkOption ? hasTypeWorkOption : false
        }
       
        if(this.state.newOption) {
            var isEqual = false;
            for(var key in this.state.options) { 
                if ( (this.state.options)[key].title === this.state.newOption) isEqual = true;
            }

            if(titleOption.length > 20 || descriptionOption.length > 50 ) {
                this.setState({ typeErrorNewOption: "inputLong", errorNewOption: "Warning! Your type activity name (max 20) or description (max 50) is too long."});
                
            }
            else {
                if(!isEqual) {
                    this.props.startAddOptionActivity(typeActivity);
                    this.setState({ newOption : "", newOptionDescription: "" });
                }
                else {
                    this.setState({ typeErrorNewOption: "inputIsEqual", errorNewOption: "Warning! Your type working name is already present."})
                }
            }
        }
        else {
            this.setState({ typeErrorNewOption: "emptyInput", errorNewOption: "Error! Your type working input is empty."})
        }
    }

    onClick = (e) => {
        this.onSubmit(e)
    }

    onChangeInputOption = (e) => {
        let newOption = e.target.value;
        this.setState({ newOption, errorNewOption: "", typeErrorNewOption: "" });
    }

    onChangeInputDescriptionOption = (e) => {
        let newOptionDescription = e.target.value;
        this.setState({ newOptionDescription });
    }

    render() {
        let thisProps = this.props;
        let typeActivityOptions = thisProps.typeActivityOptions;
        var isSingle = false;
        let isTypeActivity = true;
        let typeActivityOption = typeActivityOptions.map((option, index) => {
            let optionTitle = option.title;
            let optionDescription = option.description;
            let optionHasTypeWork = option.hasTypeWork
            if(typeActivityOptions.length === 1) isSingle = true; 
            return (
                <TypeWorkingOptionItem 
                    key={optionTitle + index} 
                    optionTitle={optionTitle} 
                    optionId={optionTitle}
                    optionDescription={optionDescription} 
                    isSingle={isSingle}
                    isTypeActivity={isTypeActivity}
                    hasTypeWork={optionHasTypeWork}
                />
            )
        });

        let borderBottomList = typeActivityOption.length > 5 ? { borderBottom: "#cacccd 1px solid" } : { borderBottom: "none" };

        let errorColor = ""; 
        if(this.state.typeErrorNewOption === "emptyInput") { errorColor = "danger" }
        else if (this.state.typeErrorNewOption === "inputLong" ) { errorColor = "warning" }
        else if(this.state.typeErrorNewOption === "inputIsEqual") { errorColor = "warning" }

        let errorMessageInputTypeWorking = <Alert color={errorColor}>{this.state.errorNewOption}</Alert>

        return (
            <div>
                <h2 className="settings_subtitle">Setting type activity</h2>
                <div className="list-header row row__list-header">
                    <div className="show-for-mobile">Activities</div>
                    <div className="show-for-desktop col-5">Type activity name</div>
                    <div className="show-for-desktop col-4">Description</div>
                    <div className="show-for-desktop col-2 text-center">Type Working visible</div>
                    <div className="show-for-desktop col-1 text-center">Remove</div>
                </div>
                <div id="typeWorkingOptions" className="scroll scrollTypeWorkingOptions" style={borderBottomList}>
                    {typeActivityOption}
                </div>
                <form className="list-item d-flex justify-content-between insertOptionTW" onSubmit={this.onSubmit}>
                    <div className="show-for-desktop col-5">
                        <input 
                            placeholder="Insert new type working option"
                            onChange={this.onChangeInputOption}
                            value={this.state.newOption}
                        />                       
                    </div>
                    <div className="show-for-desktop col-6">
                        <input 
                            placeholder="Insert type working description"
                            onChange={this.onChangeInputDescriptionOption}
                            value={this.state.newOptionDescription}
                        /> 
                    </div>
                    <div className="show-for-desktop col-1 text-center">
                        <button style={{"backgroundColor" : "rgba(0, 0, 0, 0)", "padding":"0", "border":"none"}}>
                            <FontAwesomeIcon icon="plus-circle" className="plusCircle insertIcon" size="2x" onClick={this.onClick}/>
                        </button>
                    </div>                    
                </form>
                {this.state.errorNewOption ? errorMessageInputTypeWorking : ""}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        typeActivityOptions: state.typeActivityOptions,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        startAddOptionActivity: (typeActivity) => dispatch(startAddOptionActivity(typeActivity)),
    }
}

const SettingTypeActivityConnect = connect(mapStateToProps, mapDispatchToProps)(SettingTypeActivity)
export default SettingTypeActivityConnect;
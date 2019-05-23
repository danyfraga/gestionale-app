import React from "react";
import { connect } from "react-redux";
import watch from "redux-watch";
import store from "../store/configureStore";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import TypeActivityOrWorkingOptionItem from "../components/TypeActivityOrWorkingOptionItem";
import { startAddOptionActivity } from "../actions/typeActivityOption";
import { Alert } from 'reactstrap';

let watchState = watch(store.getState);

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

        this.unsubscribe = store.subscribe(watchState((currentVal) => {
            if(currentVal) this.setState({options: currentVal.typeActivityOptions});
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
        const keyOption = require('uuid/v1');
        let typeActivity = {
            "title": titleOption.charAt(0).toUpperCase() + titleOption.slice(1),
            "description": descriptionOption ? descriptionOption.charAt(0).toUpperCase() + descriptionOption.slice(1) : "-",
            "hasTypeWork": hasTypeWorkOption ? hasTypeWorkOption : false,
            "key": keyOption()
        };
       
        if(this.state.newOption) {
            var isEqual = false;
            for(var key in this.state.options) { 
                if ((this.state.options)[key].title.toLowerCase() === this.state.newOption.toLowerCase()) isEqual = true;
            }

            if(titleOption.length > 20 || descriptionOption.length > 50 ) {
                this.setState({typeErrorNewOption: "inputLong", errorNewOption: "Error! Your type activity name (max 20) or description (max 50) is too long."});
            }
            else {
                if(!isEqual) {
                    this.props.startAddOptionActivity(typeActivity);
                    this.setState({newOption : "", newOptionDescription: ""});
                }
                else {
                    this.setState({typeErrorNewOption: "inputIsEqual", errorNewOption: "Error! Your type activity name is already present."});
                }
            }
        }
        else {
            this.setState({typeErrorNewOption: "emptyInput", errorNewOption: "Error! Your type activity input is empty."});
        }
    }

    onClick = (e) => {
        this.onSubmit(e)
    }

    onChangeInputOption = (e) => {
        let newOption = e.target.value;
        this.setState({newOption, errorNewOption: "", typeErrorNewOption: ""});
    }

    onChangeInputDescriptionOption = (e) => {
        let newOptionDescription = e.target.value;
        this.setState({newOptionDescription});
    }

    render() {
        let thisProps = this.props;
        let typeActivityOptions = thisProps.typeActivityOptions;
        var isSingle = false;
        let isTypeActivity = true;
        let typeActivityOptionsItem = typeActivityOptions.map((option, index) => {
            let optionKey = option.key
            let optionTitle = option.title;
            let optionDescription = option.description;
            let optionHasTypeWork = option.hasTypeWork;
            if(typeActivityOptions.length === 1) isSingle = true; 
            return (
                <TypeActivityOrWorkingOptionItem 
                    key={optionTitle + index} 
                    optionTitle={optionTitle} 
                    optionId={optionKey}
                    optionDescription={optionDescription} 
                    isSingle={isSingle}
                    isTypeActivity={isTypeActivity}
                    hasTypeWork={optionHasTypeWork}
                />
            );
        });

        let borderBottomList = typeActivityOptionsItem.length > 5 ? {borderBottom:"#cacccd 1px solid"} : {borderBottom:"none"};
        let iconButtonAddTypeActivityStyle = {"backgroundColor":"rgba(0, 0, 0, 0)", "padding":"0", "border":"none"};
        let errorColor = ""; 
        if(this.state.typeErrorNewOption) {errorColor = "danger"}
        let errorMessageInputTypeWorking = this.state.errorNewOption ? <Alert color={errorColor}>{this.state.errorNewOption}</Alert> : "";

        return (
            <div>
                <h2 className="settings_subtitle">Setting type activity</h2>
                <div className="list-header row row__list-header">
                    <div className="show-for-desktop col-5">Type activity name</div>
                    <div className="show-for-desktop col-4">Description</div>
                    <div className="show-for-desktop col-2 text-center">Type Working visible</div>
                    <div className="show-for-desktop col-1 text-center">Remove</div>
                </div>
                <div id="typeWorkingOptions" className="scroll scrollTypeWorkingOptions" style={borderBottomList}>
                    {typeActivityOptionsItem}
                </div>
                <form className="list-item d-flex justify-content-between insertOptionTW" onSubmit={this.onSubmit}>
                    <div className="show-for-desktop col-5">
                        <input 
                            placeholder="Insert new type activity option"
                            onChange={this.onChangeInputOption}
                            value={this.state.newOption}
                        />                       
                    </div>
                    <div className="show-for-desktop col-6">
                        <input 
                            placeholder="Insert type activity description"
                            onChange={this.onChangeInputDescriptionOption}
                            value={this.state.newOptionDescription}
                        /> 
                    </div>
                    <div className="show-for-desktop col-1 text-center">
                        <button style={iconButtonAddTypeActivityStyle}>
                            <FontAwesomeIcon icon="plus-circle" className="plusCircle insertIcon" size="2x" onClick={this.onClick}/>
                        </button>
                    </div>                    
                </form>
                <div className="alert__container">
                    {errorMessageInputTypeWorking}
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        typeActivityOptions: state.typeActivityOptions
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        startAddOptionActivity: (typeActivity) => dispatch(startAddOptionActivity(typeActivity))
    };
};

const SettingTypeActivityConnect = connect(mapStateToProps, mapDispatchToProps)(SettingTypeActivity);
export default SettingTypeActivityConnect;
import React from "react";
import { connect } from "react-redux";
import watch from "redux-watch";
import store from "../store/configureStore";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import TypeActivityOrWorkingOptionItem from "../components/TypeActivityOrWorkingOptionItem";
import { startAddOption } from "../actions/typeWorkingOptions";
import { Alert } from 'reactstrap';

let watchState = watch(store.getState);

class SettingTypeWorking extends React.Component {
    constructor (props) {
        super(props);

        this.state = { 
            options: this.props.typeWorkingOptions, 
            newOption: "",
            newOptionDescription: "",
            typeErrorNewOption: "",
            errorNewOption: "",
        };

        this.unsubscribe = store.subscribe(watchState((currentVal) => {
            if(currentVal) this.setState({options: currentVal.typeWorkingOptions});
        })); 
    }

    componentWillUnmount(){
        this.unsubscribe();
    }

    onSubmit = (e) => {
        e.preventDefault();
        let titleOption = this.state.newOption;
        let descriptionOption = this.state.newOptionDescription;
        const keyOption = require('uuid/v1');
        let objNewOption = {
            "title": titleOption.charAt(0).toUpperCase() + titleOption.slice(1),
            "description": descriptionOption ? descriptionOption.charAt(0).toUpperCase() + descriptionOption.slice(1) : "-",
            "key": keyOption()
        };
       
        if(this.state.newOption) {
            var isEqual = false;
            for(var key in this.state.options) { 
                if ((this.state.options)[key].title.toLowerCase() === this.state.newOption.toLowerCase()) isEqual = true;
            }

            if(titleOption.length > 25 || descriptionOption > 51) {
                this.setState({typeErrorNewOption: "inputLong", errorNewOption: "Error! Your type working name (max 25) or description (max 50) is too long."});
            }
            else {
                if(!isEqual) {
                    this.props.startAddOption(objNewOption);
                    this.setState({newOption : "", newOptionDescription: ""});
                }
                else {
                    this.setState({typeErrorNewOption: "inputIsEqual", errorNewOption: "Error! Your type working name is already present."})
                }
            }
        }
        else {
            this.setState({typeErrorNewOption: "emptyInput", errorNewOption: "Error! Your type working input is empty."})
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
        let typeWorkingOptions = thisProps.typeWorkingOptions;
        var isSingle = false;
        let typeWorkingOptionsItem = typeWorkingOptions.map((option) => {
            let optionKey = option.key;
            let optionTitle = option.title;
            let optionDescription = option.description;
            if(typeWorkingOptions.length === 1) isSingle = true; 
            return (
                <TypeActivityOrWorkingOptionItem 
                    key={optionTitle} 
                    optionTitle={optionTitle} 
                    optionId={optionKey}
                    optionDescription={optionDescription} 
                    isSingle={isSingle}
                />
            );
        });

        let borderBottomList = typeWorkingOptionsItem.length > 5 ? {borderBottom:"#cacccd 1px solid"} : {borderBottom: "none"};
        let iconButtonAddTypeActivityStyle = {"backgroundColor":"rgba(0, 0, 0, 0)", "padding":"0", "border":"none"}; 
        let errorColor = ""; 
        if(this.state.typeErrorNewOption) {errorColor = "danger"};
        let errorMessageInputTypeWorking = this.state.errorNewOption ? <Alert color={errorColor}>{this.state.errorNewOption}</Alert> : "";

        return (
            <div>
                <h2 className="settings_subtitle">Setting type working</h2>
                <div className="list-header row row__list-header">
                    <div className="show-for-desktop col-5">Type working name</div>
                    <div className="show-for-desktop col-6">Description</div>
                    <div className="show-for-desktop col-1 text-center">Remove</div>
                </div>
                <div id="typeWorkingOptions" className="scroll scrollTypeWorkingOptions" style={borderBottomList}>
                    {typeWorkingOptionsItem}
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
        typeWorkingOptions: state.typeWorkingOptions
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        startAddOption: (option) => dispatch(startAddOption(option)),
    };
};

const SettingsTypeWorkingConnect = connect(mapStateToProps, mapDispatchToProps)(SettingTypeWorking);
export default SettingsTypeWorkingConnect;
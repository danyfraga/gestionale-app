import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import watch from "redux-watch";
import store from "../store/configureStore";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import TypeWorkingOptionItem from "../components/TypeWorkingOptionItem";
import { startAddOption } from "../actions/typeWorkingOptions";
import { Alert } from 'reactstrap';
import UserItemList from "../components/UsersList";

let watchCustomer = watch(store.getState);

class SettingsList extends React.Component {
    constructor(props) {
        super(props);

        this.state = { 
            collapse: false,
            modalShow: false,
            modalSaveShow: false,
            modalDeleteShow: false,
            options: this.props.typeWorkingOptions, 
            newOption: "",
            newOptionDescription: "",
            typeError: "",
            error: "" 
        };

        store.subscribe(watchCustomer((currentVal) => {
        }));
    }


    toggle = () => {
        this.setState({ collapse: !this.state.collapse });
    }

    onSubmit = (e) => {
        e.preventDefault();
        let titleOption = this.state.newOption;
        let descriptionOption = this.state.newOptionDescription;
        let objNewOption = {
            "title": titleOption,
            "description": descriptionOption ? descriptionOption : "-"
        }

        if(this.state.newOption) {
            var isEqual = false;
            for(var key in this.state.options) { 
                if ( (this.state.options)[key].title === this.state.newOption) isEqual = true;
            }

            if(titleOption.length > 25 || descriptionOption > 50) {
                this.setState({ typeError: "inputLong", error: "Warning! Your type working name (max 25) or description (max 50) is too long."});
                
            }
            else {
                if(!isEqual) {
                    this.props.startAddOption(objNewOption);
                    this.setState({ newOption : "", newOptionDescription: "" });
                }
                else {
                    this.setState({ typeError: "inputIsEqual", error: "Warning! Your type working name is already present."})
                }
            }
        }
        else {
            this.setState({ typeError: "emptyInput", error: "Error! Your type working input is empty."})
        }
    }

    onClick = (e) => {
        this.onSubmit(e)
    }

    onChangeInputOption = (e) => {
        let newOption = e.target.value;
        this.setState({ newOption, error: "", typeError: "" });
    }

    onChangeInputDescriptionOption = (e) => {
        let newOptionDescription = e.target.value;
        this.setState({ newOptionDescription });
    }

    render() {
        let thisProps = this.props;
        let typeWorkingOptions = thisProps.typeWorkingOptions;
        var isSingle = false;
        console.log(typeWorkingOptions);
        let typeWorkingOption = typeWorkingOptions.map((option) => {
            let optionTitle = option.title;
            let optionDescription = option.description;
            if(typeWorkingOptions.length === 1) isSingle = true; 
            return (
                <TypeWorkingOptionItem 
                    key={optionTitle} 
                    optionTitle={optionTitle} 
                    optionId={optionTitle}
                    optionDescription={optionDescription} 
                    isSingle={isSingle}
                />
            )
        });

        let borderBottomList = typeWorkingOption.length > 5 ? { borderBottom: "#cacccd 1px solid" } : { borderBottom: "none" };

        let errorColor = ""; 
        if(this.state.typeError === "emptyInput") { errorColor = "danger" }
        else if (this.state.typeError === "inputLong" ) { errorColor = "warning" }
        else if(this.state.typeError === "inputIsEqual") { errorColor = "warning" }

        let errorMessageInputTypeWorking = <Alert color={errorColor}>{this.state.error}</Alert>

        let usersList = this.state.options.map((user) => {
            
        });
        
        return (
            <div className="content-container">
                <div className="row row__createActivity-header">
                    <Link to="/dashboard"><FontAwesomeIcon icon="arrow-left" className="arrowLeft" size="2x"/></Link>
                    <div className="col-11 pl-0">
                        <h1 className="createActivity__title">SETTINGS</h1>
                    </div>
                </div> 
                <h2 className="settings_subtitle">Setting type working</h2>
                <div className="list-header row row__list-header">
                    <div className="show-for-mobile">Activities</div>
                    <div className="show-for-desktop col-5">Type working name</div>
                    <div className="show-for-desktop col-6">Description</div>
                    <div className="show-for-desktop col-1 text-center">Remove</div>
                </div>
                <div id="typeWorkingOptions" className="scroll scrollTypeWorkingOptions" style={borderBottomList}>
                    {typeWorkingOption}
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
                {this.state.error ? errorMessageInputTypeWorking : <p></p>}

                <h2 className="settings_subtitle">Setting type working</h2>
                <div className="list-header row row__list-header">
                    <div className="show-for-desktop col-5">Name</div>
                    <div className="show-for-desktop col-5">Surname</div>
                    <div className="show-for-desktop col-1 text-center">Admin</div>
                    <div className="show-for-desktop col-1 text-center">Delete</div>
                </div>
               <div>
                   
               </div>
                
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        users: state.allUsers,
        typeWorkingOptions: state.typeWorkingOptions
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        startAddOption: (option) => dispatch(startAddOption(option))
    }
}

const SettingsListConnect = connect(mapStateToProps, mapDispatchToProps)(SettingsList)
export default SettingsListConnect;


import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { connect } from "react-redux";
import { startRemoveOption } from "../actions/typeWorkingOptions";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

class TypeWorkingOptionItem extends React.Component {
    constructor(props) {
        super(props);

        this.state = { 
            modalShow: false,
            modalSaveShow: false,
            modalDeleteShow: false 
        };
    }

    onClick = () => {
        this.props.startRemoveOption(this.props.optionId);
    }

    handleShow = () => {
        this.setState({ modalShow: true})
        if(!this.state.modalSaveShow) {
            this.setState({ modalSaveShow: true, modalDeleteShow: false });
        }
        else if (!this.state.modalDeleteShow) {
            this.setState({ modalDeleteShow: true, modalSaveShow: false });
        }
    }

    handleClose = () => {
        this.setState({ modalShow: false, modalSaveShow: false, modalDeleteShow: false });
      }

    render() {
        let thisProps = this.props;
        let disabledRemoveButton = thisProps.isSingle ? true : false;

        return (
            <div
                className="list-item d-flex justify-content-between" 
            >
                <div className="show-for-desktop col-5">
                    <span className="span__typeActivity">{thisProps.optionTitle}</span>
                </div>
                <div className="show-for-desktop col-6">
                    <span className="span__typeWorking">{thisProps.optionDescription}</span>
                </div>
                <div className="show-for-desktop col-1 text-center">
                    <button 
                        className={disabledRemoveButton ? "deleteOptionDisabled" : "deleteOption" }
                        style={disabledRemoveButton ? {"backgroundColor" : "rgba(0, 0, 0, 0)", "border":"none"} : {"backgroundColor" : "rgba(0, 0, 0, 0)", "padding":"0"}}
                        onClick={() => { 
                            this.setState({ modalDeleteShow: true }, this.handleShow);
                        }}
                        disabled={disabledRemoveButton} 
                    >
                        <FontAwesomeIcon icon="times-circle" className="timesCircle" size="2x"/>
                    </button>
                </div>
                <Modal 
                    isOpen={this.state.modalShow} 
                    toggle={this.handleClose} 
                >
                    <ModalHeader className="modal__header-remove"><span className="modal__title-remove">Remove type working option</span></ModalHeader>
                    <ModalBody>
                        <p>Are you sure you want to delete {(thisProps.optionTitle).toUpperCase()} option?</p>
                    </ModalBody>
                    <ModalFooter>
                        <Button style={{color: "white", backgroundColor: "#d65b5b", border: "none"}} className="modal__button" onClick={this.onClick}>Yes</Button>
                        <Button className="modal__button" onClick={this.handleClose}>No</Button>
                    </ModalFooter>
                </Modal>  
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        startRemoveOption: (optionId) => dispatch(startRemoveOption(optionId)),
        startSetOptions: (options) => dispatch(startSetOptions(options))
    }
}

const TypeWorkingOptionItemConnect = connect (undefined, mapDispatchToProps)(TypeWorkingOptionItem)
export default TypeWorkingOptionItemConnect;

// Mettere a posto bottone delete option quando è disabilitato
import React from "react";
import { connect } from "react-redux";
import { startLogout } from "../actions/auth";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from "react-router-dom";
import  { switchCheck } from "../actions/filters";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

export class Header extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
            switchChecked: this.props.filters.switchChecked,
            modalShow: false,
            modalSaveShow: false,
            modalDeleteShow: false
        }
    }
    
    onClick = () => {
        this.setState({ switchChecked: false });
        this.props.switchCheck(this.state.switchChecked)
    }

    startLogout = () => {
        this.props.startLogout();
    }


    handleShow = () => {
        this.setState({ modalShow: true})
    }

    handleClose = () => {
        this.setState({ modalShow: false });
      }

    onShow = () => {
        this.setState({dateRangePickerShow: true}); 
    }

    render() {
        return (
            <div> 
                <header className="header">
                    <div className="content-container">
                        <div className="row header__content">
                            <div className="col-9">
                                <Link to="/dashboard" style={{ textDecoration: 'none' }} onClick={this.onClick}><h1 className="header__title">MGMTNet</h1></Link>
                            </div>
                            {
                                this.props.user.isAdmin ? (
                                    <div className="row">
                                    <div className="col-6 text-center">
                                        <Link to="/users" className="navItemLink" onClick={this.onClick}>USERS</Link>
                                    </div>
                                    <div className="col-6 text-center">
                                        <Link to="/settings" className="navItemLink" onClick={this.onClick}>SETTINGS</Link>
                                    </div>
                                    </div>
                                ) : (
                                    false
                                )
                            } 
                            <div className="col-1 text-center">
                                <FontAwesomeIcon icon="sign-out-alt" className="logout_icon" size="2x" onClick={this.handleShow} style={{ margin: "0" }}/>
                                <Modal 
                                    isOpen={this.state.modalShow} 
                                    toggle={this.handleClose} 
                                >
                                    <ModalHeader className="modal__header-save"><span className="modal__title-save ">LOGOUT</span></ModalHeader>
                                    <ModalBody>
                                        <p>Are you sure you want to log out?</p>
                                    </ModalBody>
                                    <ModalFooter>
                                        <Button style={{color: "white", backgroundColor: "#  1c88bf", border: "none"}} className="modal__button" onClick={this.startLogout}>Yes</Button>
                                        <Button className="modal__button" onClick={this.handleClose}>No</Button>
                                    </ModalFooter>    
                                </Modal>
                            </div>                           
                        </div>  
                    </div>
                </header>
            </div>
         )
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.user,
        filters: state.filters
    }
}

const mapDispatchToProps = (dispatch) => ({
    startLogout: () => dispatch(startLogout()),
    switchCheck: (switchChecked) => dispatch(switchCheck(switchChecked))
})

export default connect(mapStateToProps, mapDispatchToProps)(Header);


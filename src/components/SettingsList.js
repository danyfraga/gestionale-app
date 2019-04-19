import React from "react";
import SettingTypeWorking from "../components/SettingTypeWorking";
import SettingTypeActivity from "../components/SettingTypeActivity";
import  UsersSettings from "../components/UsersSettings";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default class SettingsList extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="content-container">
                <div className="row row__createActivity-header">
                    <Link to="/dashboard"><FontAwesomeIcon icon="arrow-left" className="arrowLeft" size="2x"/></Link>
                    <div className="col-11 pl-0">
                        <h1 className="createActivity__title">SETTINGS</h1>
                    </div>
                </div> 
                <SettingTypeActivity/>
                <SettingTypeWorking/>
                <UsersSettings/>
            </div>
        )
    }
}
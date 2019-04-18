import React from "react";
import SettingTypeWorking from "../components/SettingTypeWorking";
import  UsersSettings from "../components/UsersSettings";

export default class SettingsList extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="content-container">
                <SettingTypeWorking/>
                <UsersSettings/>
            </div>
        )
    }
}
import React from "react";
import { Link } from "react-router-dom";

export default class UserItemList extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let thisProps = this.props;
        let nameAndSurname = (thisProps.nameAndSurname).split(" ");
        let name = nameAndSurname[0].charAt(0) + nameAndSurname[0].slice(1).toLowerCase();
        let surname = nameAndSurname[1].charAt(0) + nameAndSurname[1].slice(1).toLowerCase();
        let typeUser = thisProps.isAdmin ? "Admin" : "User";

        //Style 
        let linkStyle = {textDecoration: 'none'};
        
        return (
            <Link 
                className="list-item d-flex justify-content-between" 
                style={linkStyle} 
                to={`/user/${thisProps.userId}`}
            >
                <div className="show-for-desktop col-3">
                    <span className="span__typeActivity">{name}</span>
                </div>
                <div className="show-for-desktop col-3">
                    <span className="span__typeActivity">{surname}</span>
                </div>
                <div className="show-for-desktop col-5">
                <span className="span__typeWorking">{thisProps.email}</span>
                </div>
                <div className="show-for-desktop col-1">
                    <span className="span__typeWorking">{typeUser}</span>
                </div>
            </Link>
        );
    }
}
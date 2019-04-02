import React from "react";
import { Link } from "react-router-dom";

export default class UserItem extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let thisProps = this.props;
        let nameAndSurname = (thisProps.nameAndSurname).split(" ");
        let name = nameAndSurname[0].charAt(0) + nameAndSurname[0].slice(1).toLowerCase();
        let surname = nameAndSurname[1].charAt(0) + nameAndSurname[1].slice(1).toLowerCase();
        let typeUser = thisProps.isAdmin ? "Admin" : "User"

        return (
            <Link className="list-item d-flex justify-content-between" style={{ textDecoration: 'none' }} to={`/edit/${this.props.idActivity}`}>
                <div className="show-for-desktop col-4">
                    <span className="span__typeActivity">{name}</span>
                </div>
                <div className="show-for-desktop col-5 text-left">
                    <span className="span__typeActivity">{surname}</span>
                </div>
                <div className="show-for-desktop col-3 text-center">
                    <span className="span__typeWorking">{typeUser}</span>
                </div>
            </Link>
        )
    }
}
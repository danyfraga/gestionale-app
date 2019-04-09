import React from "react";
import { Router, Route, Switch, Link, NavLink} from "react-router-dom";
import createHistory from "history/createBrowserHistory"
import DashboardPage from "../components/DashboardPage";
import NotFoundPage from "../components/NotFoundPage";
import LoginPage from "../components/LoginPage";
import PrivateRoute from "./PrivateRoute";
import PublicRoute from "./PublicRoute";
import CreateActivity from "../components/CreateActivity";
import EditActivity from "../components/EditActivity";
import UsersList from "../components/UsersList";
import UserItem from "../components/UserItem";

export const history = createHistory();

const AppRouter = () => (
    <Router history={history}>
        <div>
            <Switch>
                <PublicRoute path="/" component={LoginPage} exact={true}/>
                <PrivateRoute path="/dashboard" component={DashboardPage}/>
                <PrivateRoute path="/create" component={CreateActivity}/>
                <PrivateRoute path="/edit/:id" component={EditActivity}/>
                <PrivateRoute path="/users" component={UsersList}/>
                <PrivateRoute path="/user/:id" component={UserItem}/>
                <Route component={NotFoundPage}/>
            </Switch>
        </div> 
    </Router>
);

export default AppRouter;
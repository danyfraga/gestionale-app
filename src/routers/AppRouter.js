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
import SettingsList from "../components/SettingsList";
import AdminRoute from "./AdminRoute";

export const history = createHistory();

const AppRouter = () => (
    <Router history={history}>
        <div>
            <Switch>
                <PublicRoute path="/" component={LoginPage} exact={true}/>
                <PrivateRoute path="/dashboard" component={DashboardPage}/>
                <PrivateRoute path="/create" component={CreateActivity}/>
                <PrivateRoute path="/edit/:id" component={EditActivity}/>
                <AdminRoute path="/users" component={UsersList}/>
                <AdminRoute path="/user/:id" component={UserItem}/>
                <AdminRoute path="/user/:id/edit/:id" component={EditActivity}/>
                <AdminRoute path="/settings" component={SettingsList}/>
                <Route component={NotFoundPage}/>
            </Switch>
        </div> 
    </Router>
);

export default AppRouter;
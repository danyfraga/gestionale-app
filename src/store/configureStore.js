import {createStore, combineReducers, applyMiddleware, compose} from "redux"
import thunk from "redux-thunk";
import authReducer from "../reducers/auth";
import { activitiesReducer } from "../reducers/activities";
import filtersReducer from "../reducers/filters";
import { userReducer, usersReducer } from "../reducers/user";
import { typeWorkingOptionsReducer } from "../reducers/typeWorkingOptions";
import { typeActivityOptionsReducer } from "../reducers/typeActivityOption";
import { userEmailListReducer } from "../reducers/userEmailList";
import { activitiesGroupToBeRemovedReducer } from "../reducers/activitiesGroupToBeRemoved"

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
    combineReducers({
        auth: authReducer,
        activities: activitiesReducer,
        filters: filtersReducer,
        user: userReducer,
        allUsers: usersReducer,
        typeWorkingOptions: typeWorkingOptionsReducer ,
        typeActivityOptions: typeActivityOptionsReducer,
        userEmailList: userEmailListReducer,
        activitiesGroupToBeRemoved: activitiesGroupToBeRemovedReducer
    }),
    composeEnhancers(applyMiddleware(thunk))
);
export default store


import {createStore, combineReducers, applyMiddleware, compose} from "redux"
import thunk from "redux-thunk";
import authReducer from "../reducers/auth";
import { activitiesReducer } from "../reducers/activities";
import filtersReducer from "../reducers/filters";
import { userReducer, usersReducer } from "../reducers/user";
import { typeWorkingOptionsReducer } from "../reducers/typeWorkingOptions";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
    combineReducers({
        auth: authReducer,
        activities: activitiesReducer,
        filters: filtersReducer,
        user: userReducer,
        allUsers: usersReducer,
        typeWorkingOptions: typeWorkingOptionsReducer  
    }),
    composeEnhancers(applyMiddleware(thunk))
);
export default store


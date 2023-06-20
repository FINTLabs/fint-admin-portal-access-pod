import {applyMiddleware, combineReducers, createStore} from "redux";
import thunkMiddleware from "redux-thunk";
import {createLogger} from "redux-logger";
import component from "../reducers/component";
import organisation from "../reducers/organisation";
import contact from "../reducers/contact";
import accessTemplate from "../reducers/access_template";
import component_configuration from "../reducers/component-configuration";

const logger = createLogger();
const store = createStore(
    combineReducers({
        component,
        organisation,
        contact,
        accessTemplate,
        component_configuration
    }),
    applyMiddleware(thunkMiddleware, logger)
);

export default store;
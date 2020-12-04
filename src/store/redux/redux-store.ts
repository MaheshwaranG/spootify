import {createStore, combineReducers, compose, applyMiddleware} from "redux";
import thunk from "redux-thunk";
import auth from "./reducers/auth";
import spoty from "./reducers/spoty"

/* eslint-disable */
// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const composeEnhancers = compose;

const rootReducer = combineReducers({
    auth: auth,
    spoty: spoty
})

export type StoreType = ReturnType<typeof rootReducer>;

export default () => {
    const store = createStore(
        rootReducer,
        composeEnhancers(applyMiddleware(thunk))
    );
    return store;
}




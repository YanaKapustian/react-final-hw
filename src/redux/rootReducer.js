import { combineReducers } from "redux";
import { postReducer } from "./postReducer";
import { createStore } from 'redux';
export const rootReducer = combineReducers({
    postReducer
})

export const store = createStore(rootReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())

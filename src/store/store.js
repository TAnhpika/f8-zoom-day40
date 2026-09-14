import { combineReducers } from "redux";
import { createStore } from "@/libs/redux";
import taskReducer from "./task/reducer";

const rootReducer = combineReducers({
    task: taskReducer,
});

const store = createStore(rootReducer);

export default store;

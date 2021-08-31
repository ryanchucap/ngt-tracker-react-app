import { combineReducers } from "redux";
import employees from "./employeeReducer";
import apiStatus from "./apiStatusReducer";
import file from "./fileReducer";

const rootReducer = combineReducers({
    employees,
    apiStatus,
    file,
});

export default rootReducer;

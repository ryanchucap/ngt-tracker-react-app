import { combineReducers } from "redux";
import employees from "./employeeReducer";
import apiStatus from "./apiStatusReducer";
import file from "./fileReducer";
import login from "./loginReducer";

const rootReducer = combineReducers({
    employees,
    apiStatus,
    file,
    login,
});

export default rootReducer;

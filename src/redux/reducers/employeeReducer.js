import * as types from "../actions/actionTypes";
import initialState from "./initialState";

export default function employeeReducer(
    state = initialState.employees,
    action
) {
    switch (action.type) {
        case types.CREATE_EMPLOYEE_SUCCESS:
            return [...state, { ...action.employee }];
        case types.UPDATE_EMPLOYEE_SUCCESS:
            return state.map((employee) =>
                employee.id === action.employee.id ? action.employee : employee
            );
        case types.LOAD_EMPLOYEES_SUCCESS:
            return action.employees;
        case types.DELETE_EMPLOYEE_SUCCESS:
            return state.filter(
                (employee) => employee.id !== action.employee.id
            );
        case types.CLEAR_EMPLOYEES:
            return [];
        default:
            return state;
    }
}

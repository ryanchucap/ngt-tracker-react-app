import * as apiTypes from "../../api/apiTypes";
import * as employeeApi from "../../api/employeeApi";
import * as types from "./actionTypes";
import { beginApiCall } from "./apiStatusActions";

export function clearEmployees() {
    return { type: types.CLEAR_EMPLOYEES };
}

export function loadEmployees(id) {
    return (dispatch) => {
        dispatch(beginApiCall(apiTypes.LOAD_EMPLOYEES));
        return employeeApi
            .getEmployees(id)
            .then((employees) => {
                dispatch({
                    type: types.LOAD_EMPLOYEES_SUCCESS,
                    employees: id ? [employees] : employees,
                });
            })
            .catch((error) => {
                dispatch({ type: types.LOAD_EMPLOYEES_FAILURE });
                throw error;
            });
    };
}

export function saveEmployee(employee) {
    if (employee.id !== undefined) {
        // id is present -> update operation
        return (dispatch) => {
            dispatch(beginApiCall(apiTypes.UPDATE_EMPLOYEE));
            return employeeApi
                .updateEmployee(employee)
                .then((savedEmployee) => {
                    dispatch({
                        type: types.UPDATE_EMPLOYEE_SUCCESS,
                        employee: savedEmployee,
                    });
                })
                .catch((error) => {
                    dispatch({ type: types.UPDATE_EMPLOYEE_FAILURE });
                    throw error;
                });
        };
    } else {
        // id missing -> create operation
        return (dispatch) => {
            dispatch(beginApiCall(apiTypes.CREATE_EMPLOYEE));
            return employeeApi
                .createEmployee(employee)
                .then((savedEmployee) => {
                    dispatch({
                        type: types.CREATE_EMPLOYEE_SUCCESS,
                        employee: savedEmployee,
                    });
                })
                .catch((error) => {
                    dispatch({ type: types.CREATE_EMPLOYEE_FAILURE });
                    throw error;
                });
        };
    }
}

export function deleteEmployee(employee) {
    return (dispatch) => {
        dispatch(beginApiCall(apiTypes.DELETE_EMPLOYEE));
        return employeeApi
            .deleteEmployee(employee)
            .then(() => {
                dispatch({ type: types.DELETE_EMPLOYEE_SUCCESS, employee });
            })
            .catch((error) => {
                dispatch({ type: types.DELETE_EMPLOYEE_FAILURE });
                throw error;
            });
    };
}

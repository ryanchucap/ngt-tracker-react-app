export const LOAD_EMPLOYEES_SUCCESS = "LOAD_EMPLOYEES_SUCCESS";
export const CREATE_EMPLOYEE_SUCCESS = "CREATE_EMPLOYEE_SUCCESS";
export const UPDATE_EMPLOYEE_SUCCESS = "UPDATE_EMPLOYEE_SUCCESS";
export const DELETE_EMPLOYEE_SUCCESS = "DELETE_EMPLOYEE_SUCCESS";
export const UPLOAD_FILE_SUCCESS = "UPLOAD_FILE_SUCCESS";
export const DOWNLOAD_FILE_SUCCESS = "DOWNLOAD_FILE_SUCCESS";

export const LOAD_EMPLOYEES_FAILURE = "LOAD_EMPLOYEES_FAILURE";
export const CREATE_EMPLOYEE_FAILURE = "CREATE_EMPLOYEE_FAILURE";
export const UPDATE_EMPLOYEE_FAILURE = "UPDATE_EMPLOYEE_FAILURE";
export const DELETE_EMPLOYEE_FAILURE = "DELETE_EMPLOYEE_FAILURE";
export const UPLOAD_FILE_FAILURE = "UPLOAD_FILE_FAILURE";
export const DOWNLOAD_FILE_FAILURE = "DOWNLOAD_FILE_SUCCESS";

export const BEGIN_API_CALL = "BEGIN_API_CALL";
export const CLEAR_EMPLOYEES = "CLEAR_EMPLOYEES";

const _SUCCESS = "_SUCCESS";
const _FAILURE = "_FAILURE";

export function isSuccess(type) {
    return type.endsWith(_SUCCESS);
}

export function isFailure(type) {
    return type.endsWith(_FAILURE);
}

export function getApiCallType(type) {
    if (isSuccess(type)) {
        return type.substring(0, type.length - _SUCCESS.length);
    } else if (isFailure(type)) {
        return type.substring(0, type.length - _FAILURE.length);
    } else {
        return null;
    }
}

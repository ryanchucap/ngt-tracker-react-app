import * as apiTypes from "../../api/apiTypes";
import * as fileApi from "../../api/fileApi";
import * as types from "./actionTypes";
import { beginApiCall } from "./apiStatusActions";
import { clearEmployees } from "./employeeActions";

export function uploadFile(file) {
    return (dispatch) => {
        dispatch(beginApiCall(apiTypes.UPLOAD_FILE));
        return fileApi
            .uploadFile(file)
            .then(() => {
                dispatch({ type: types.UPLOAD_FILE_SUCCESS });
                dispatch(clearEmployees());
            })
            .catch((error) => {
                dispatch({ type: types.UPLOAD_FILE_FAILURE });
                throw error;
            });
    };
}

export function downloadFile() {
    return (dispatch) => {
        dispatch(beginApiCall(apiTypes.DOWNLOAD_FILE));
        return fileApi
            .downloadFile()
            .then((response) => {
                dispatch({ type: types.DOWNLOAD_FILE_SUCCESS });
            })
            .catch((error) => {
                dispatch({ type: types.DOWNLOAD_FILE_FAILURE });
                throw error;
            });
    };
}

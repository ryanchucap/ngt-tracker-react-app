import * as types from "../actions/actionTypes";
import initialState from "./initialState";

export default function fileReducer(state = initialState.files, action) {
    switch (action.type) {
        case types.UPLOAD_FILE_SUCCESS:
            return { uploaded: true };
        case types.UPLOAD_FILE_FAILURE:
            return { uploaded: false };
        default:
            return state;
    }
}

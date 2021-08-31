import * as types from "./actionTypes";

export function beginApiCall(apiCall) {
    return { type: types.BEGIN_API_CALL, apiCall };
}

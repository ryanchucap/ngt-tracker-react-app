import * as types from "../actions/actionTypes";
import initialState from "./initialState";

export default function apiStatusReducer(
    state = initialState.apiStatus,
    action
) {
    switch (action.type) {
        case types.BEGIN_API_CALL:
            return [...state, action.apiCall];
        default:
            const apiCallType = types.getApiCallType(action.type);
            if (apiCallType) {
                const index = state.indexOf(apiCallType);
                if (index > -1) {
                    let newState = [...state];
                    newState.splice(index, 1);
                    return newState;
                } else {
                    // This line should never be reached
                    console.log("Error: Api call ended without being logged.");
                    return state;
                }
            } else {
                return state;
            }
    }
}

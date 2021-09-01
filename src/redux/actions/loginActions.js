import * as types from "./actionTypes";

export function login(username) {
    return { type: types.LOGIN, username };
}

export function logout() {
    return { type: types.LOGOUT };
}

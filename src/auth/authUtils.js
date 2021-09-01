import { store } from "../index";
import * as loginActions from "../redux/actions/loginActions";

export function login(credentials) {
    if (credentials.username !== "reject") {
        localStorage.setItem("user", credentials.username);
        store.dispatch(loginActions.login(credentials.username));
        return true;
    } else {
        return false;
    }
}

export function logout() {
    localStorage.clear();
    store.dispatch(loginActions.logout());
}

export function checkSession() {
    if (localStorage.getItem("user")) {
        store.dispatch(loginActions.login(localStorage.getItem("user")));
        return true;
    } else {
        return false;
    }
}

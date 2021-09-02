import { store } from "../index";
import * as loginActions from "../redux/actions/loginActions";

// for mock testing:
// use u:admin for admin view
// use u:reject for rejected credentials view
// use u:anythingElse for user view
export function login(credentials) {
    if (credentials.username !== "reject") {
        localStorage.setItem("user", credentials.username);
        store.dispatch(loginActions.login(credentials.username));
        return true;
    } else {
        return false;
    }
}

// clear localStorage of cached username
export function logout() {
    localStorage.clear();
    store.dispatch(loginActions.logout());
}

// check if a username is saved to localStorage
// if so, update login information
export function checkSession() {
    if (localStorage.getItem("user")) {
        store.dispatch(loginActions.login(localStorage.getItem("user")));
        return true;
    } else {
        return false;
    }
}

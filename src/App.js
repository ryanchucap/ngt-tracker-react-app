import React from "react";
import { connect } from "react-redux";
import { Redirect, Route, Switch } from "react-router";
import { ToastContainer } from "react-toastify";
import * as authUtils from "./auth/authUtils";
import Admin from "./components/admin/Admin";
import Footer from "./components/common/Footer";
import Title from "./components/common/Title";
import Login from "./components/login/Login.page";
import User from "./components/user/User";

const App = ({ user }) => {
    return (
        <>
            <div className="main-content">
                <Title />
                <div className="container">
                    {user === "admin" ? (
                        <Admin />
                    ) : user ? (
                        <User />
                    ) : (
                        <Switch>
                            {/* if not logged in, only available route is /login.
                             * If attempting to access another route, first
                             * check localStorage for login data. If nothing is
                             * there, then redirect
                             */}
                            <Route path="/login" component={Login} />
                            {authUtils.checkSession() ? (
                                <></>
                            ) : (
                                <Redirect to="/login" />
                            )}
                        </Switch>
                    )}
                    <ToastContainer autoClose={5000} hideProgressBar />
                </div>
            </div>
            <Footer />
        </>
    );
};

const mapStateToProps = (state) => {
    return {
        user: state.login,
    };
};

export default connect(mapStateToProps)(App);

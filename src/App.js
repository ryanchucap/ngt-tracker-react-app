import React from "react";
import { connect } from "react-redux";
import { Redirect, Route, Switch } from "react-router";
import { ToastContainer } from "react-toastify";
import * as authUtils from "./auth/authUtils";
import AddEmployee from "./components/add-employee/AddEmployee.page";
import AdminHeader from "./components/admin-header/AdminHeader";
import Footer from "./components/common/Footer";
import Title from "./components/common/Title";
import EditEmployee from "./components/edit-employee/EditEmployee.page";
import AdminHome from "./components/home/AdminHome";
import UserHome from "./components/home/UserHome";
import Login from "./components/login/Login.page";
import UserHeader from "./components/user-header/UserHeader";
import ViewEmployees from "./components/view-employees/ViewEmployees.page";

const App = ({ user }) => {
    return (
        <>
            <div className="main-content">
                <Title />
                <div className="container">
                    {user === "admin" ? (
                        <>
                            <AdminHeader />
                            <Switch>
                                <Route
                                    path="/employees/add"
                                    component={AddEmployee}
                                />
                                <Route
                                    path="/employees/:id"
                                    component={EditEmployee}
                                />
                                <Route
                                    path="/employees"
                                    component={ViewEmployees}
                                />
                                <Route path="/" component={AdminHome} />
                            </Switch>
                        </>
                    ) : user ? (
                        <>
                            <UserHeader />
                            <Switch>
                                <Route path="/" component={UserHome} />
                            </Switch>
                        </>
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

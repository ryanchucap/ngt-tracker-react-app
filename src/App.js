import React, { Component } from "react";
import { Container } from "react-bootstrap";
import { connect } from "react-redux";
import { Redirect, Route, Switch } from "react-router";
import { ToastContainer } from "react-toastify";
import * as authUtils from "./auth/authUtils";
import AddEmployee from "./components/add-employee/AddEmployee.page";
import AdminHeader from "./components/admin-header/AdminHeader";
import Footer from "./components/common/Footer";
import EditEmployee from "./components/edit-employee/EditEmployee.page";
import AdminHome from "./components/home/AdminHome";
import UserHome from "./components/home/UserHome";
import Login from "./components/login/Login.page";
import UserHeader from "./components/user-header/UserHeader";
import ViewEmployees from "./components/view-employees/ViewEmployees.page";

class App extends Component {
    render() {
        return (
            <Container>
                {this.props.user === "admin" ? (
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
                ) : this.props.user ? (
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

                <Footer />
                <ToastContainer autoClose={5000} hideProgressBar />
            </Container>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.login,
    };
};

export default connect(mapStateToProps)(App);

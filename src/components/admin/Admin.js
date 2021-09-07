import React from "react";
import { Redirect, Route, Switch } from "react-router";
import AddEmployee from "./add-employee/AddEmployee.page";
import AdminHeader from "./admin-header/AdminHeader";
import Home from "./admin-home/Home";
import EditEmployee from "./edit-employee/EditEmployee.page";
import ViewEmployees from "./view-employees/ViewEmployees.page";

const Admin = () => {
    return (
        <>
            <AdminHeader />
            <Switch>
                <Route path="/employees/add" component={AddEmployee} />
                <Route path="/employees/:id" component={EditEmployee} />
                <Route path="/employees" component={ViewEmployees} />
                <Route path="/" exact component={Home} />
                <Redirect to="/" />
            </Switch>
        </>
    );
};

export default Admin;

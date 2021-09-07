import React from "react";
import { Route, Switch } from "react-router";
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
                <Route path="/" component={Home} />
            </Switch>
        </>
    );
};

export default Admin;

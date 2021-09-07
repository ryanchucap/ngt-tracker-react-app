import React from "react";
import { Redirect, Route, Switch } from "react-router";
import UserHeader from "./user-header/UserHeader";
import Home from "./user-home/Home";

const User = () => {
    return (
        <>
            <UserHeader />
            <Switch>
                <Route path="/" exact component={Home} />
                <Redirect to="/" />
            </Switch>
        </>
    );
};

export default User;

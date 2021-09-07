import React from "react";
import { Route, Switch } from "react-router";
import UserHeader from "./user-header/UserHeader";
import Home from "./user-home/Home";

const User = () => {
    return (
        <>
            <UserHeader />
            <Switch>
                <Route path="/" component={Home} />
            </Switch>
        </>
    );
};

export default User;

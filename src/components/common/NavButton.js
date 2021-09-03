import React from "react";
import { matchPath, useLocation } from "react-router";
import { Link } from "react-router-dom";

const NavButton = (props) => {
    const location = useLocation();
    const inactiveClass = "btn btn-lg btn-outline-primary";
    const activeClass = "btn btn-lg btn-primary";

    // to disable Link, we need to disable pointer events
    // matchPath is used to determine current url, and set the
    // className of the button accordingly
    return (
        <Link
            to={props.path}
            exact={props.exact ? "true" : "false"}
            style={props.disabled ? { pointerEvents: "none" } : {}}
        >
            <button
                className={
                    matchPath(location.pathname, {
                        path: props.path,
                        exact: props.exact ? "true" : "false",
                    })
                        ? activeClass
                        : inactiveClass
                }
                style={{
                    width: "200px",
                    margin: "10px 10px",
                }}
                disabled={props.disabled}
            >
                {props.label}
            </button>
        </Link>
    );
};

export default NavButton;

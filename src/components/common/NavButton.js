import React from "react";
import { matchPath, useLocation } from "react-router";
import { Link } from "react-router-dom";

const NavButton = (props) => {
    const location = useLocation();
    const inactiveClass = "btn btn-lg btn-info";
    const activeClass = "btn btn-lg btn-primary";

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
                    marginRight: "5px",
                    marginLeft: "5px",
                }}
                disabled={props.disabled}
            >
                {props.label}
            </button>
        </Link>
    );
};

export default NavButton;

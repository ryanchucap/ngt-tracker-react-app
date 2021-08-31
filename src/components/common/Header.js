import React from "react";
import { Link, matchPath, useLocation } from "react-router-dom";

import { connect } from "react-redux";
import * as apiTypes from "../../api/apiTypes";
import Loading from "./Loading";

const Header = (props) => {
    const loadingMessage = {
        [apiTypes.DELETE_EMPLOYEE]: "Deleting Employee...",
        [apiTypes.LOAD_EMPLOYEES]: "Loading Employees...",
        [apiTypes.CREATE_EMPLOYEE]: "Adding Employee...",
        [apiTypes.UPDATE_EMPLOYEE]: "Updating Employee...",
        [apiTypes.UPLOAD_FILE]: "Processing File...",
        [apiTypes.DOWNLOAD_FILE]: "Preparing File...",
    };

    return (
        <div style={{ textAlign: "center" }}>
            <h1 style={{ fontSize: "75px" }}>NGT Tracker Service</h1>
            <hr />
            <nav>
                <NavButton path="/" exact label="Home" />
                <NavButton
                    path="/employees"
                    exact
                    label="Employees"
                    disabled={!props.uploaded}
                />
                <NavButton
                    path="/employees/add"
                    exact
                    label="Add Employee"
                    disabled={!props.uploaded}
                />
            </nav>
            <hr />
            {Object.keys(loadingMessage).map((key, i) => (
                <ApiLoader
                    key={i}
                    apiStatus={props.apiStatus}
                    apiName={key}
                    message={loadingMessage[key]}
                />
            ))}
        </div>
    );
};

const ApiLoader = ({ apiStatus, apiName, message }) => {
    return (
        <>
            {apiStatus.indexOf(apiName) > -1 ? (
                <>
                    <Loading message={message} />
                    <hr />
                </>
            ) : (
                <></>
            )}
        </>
    );
};

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

const mapStateToProps = (state, ownProps) => {
    return {
        apiStatus: state.apiStatus,
        uploaded: state.file.uploaded,
    };
};

export default connect(mapStateToProps)(Header);

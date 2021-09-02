import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as apiTypes from "../../api/apiTypes";
import * as authUtils from "../../auth/authUtils";
import * as loginActions from "../../redux/actions/loginActions";
import ApiLoader from "../common/ApiLoader";
import NavButton from "../common/NavButton";
import Title from "../common/Title";

const AdminHeader = (props) => {
    // loading message for each api call -> multiple will display
    // if multiple api calls are in progress
    const loadingMessage = {
        [apiTypes.DELETE_EMPLOYEE]: "Deleting Employee...",
        [apiTypes.LOAD_EMPLOYEES]: "Loading Employees...",
        [apiTypes.CREATE_EMPLOYEE]: "Adding Employee...",
        [apiTypes.UPDATE_EMPLOYEE]: "Updating Employee...",
        [apiTypes.UPLOAD_FILE]: "Processing File...",
        [apiTypes.DOWNLOAD_FILE]: "Preparing File...",
    };

    // Title and Navigation Bar, with links disabled
    // if there is no data available to view (no file uploaded yet)
    return (
        <div style={{ textAlign: "center" }}>
            <Title />
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
                <button
                    className="btn btn-lg btn-secondary"
                    onClick={authUtils.logout}
                    style={{
                        width: "200px",
                        margin: "10px 10px",
                    }}
                >
                    Logout
                </button>
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

const mapStateToProps = (state, ownProps) => {
    return {
        apiStatus: state.apiStatus,
        uploaded: state.file.uploaded,
        user: state.login,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        actions: {
            logout: bindActionCreators(loginActions.logout, dispatch),
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(AdminHeader);

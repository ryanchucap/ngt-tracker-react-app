import React from "react";
import { connect } from "react-redux";
import * as apiTypes from "../../api/apiTypes";
import * as authUtils from "../../auth/authUtils";
import ApiLoader from "../common/ApiLoader";

const UserHeader = ({ apiStatus }) => {
    const loadingMessage = {
        [apiTypes.LOAD_EMPLOYEES]: "Loading Profile...",
        [apiTypes.UPDATE_EMPLOYEE]: "Updating Profile...",
    };

    return (
        <div style={{ textAlign: "center" }}>
            <hr />
            <div style={{ textAlign: "right" }}>
                <button
                    className="btn btn-lg btn-outline-danger"
                    onClick={authUtils.logout}
                    style={{
                        width: "200px",
                        marginRight: "5px",
                        marginLeft: "5px",
                    }}
                >
                    Logout
                </button>
            </div>

            <hr />
            {Object.keys(loadingMessage).map((key, i) => (
                <ApiLoader
                    key={i}
                    apiStatus={apiStatus}
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
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        actions: {},
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserHeader);

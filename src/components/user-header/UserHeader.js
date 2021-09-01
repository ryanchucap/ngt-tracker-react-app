import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as apiTypes from "../../api/apiTypes";
import * as authUtils from "../../auth/authUtils";
import * as loginActions from "../../redux/actions/loginActions";
import ApiLoader from "../common/ApiLoader";
import Title from "../common/Title";

const UserHeader = (props) => {
    const loadingMessage = {
        [apiTypes.LOAD_EMPLOYEES]: "Loading Profile...",
        [apiTypes.UPDATE_EMPLOYEE]: "Updating Profile...",
    };

    return (
        <div style={{ textAlign: "center" }}>
            <Title />
            <hr />
            <div style={{ textAlign: "right" }}>
                <button
                    className="btn btn-lg btn-secondary"
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

export default connect(mapStateToProps, mapDispatchToProps)(UserHeader);

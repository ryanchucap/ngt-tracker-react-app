import React, { useState } from "react";

import Title from "../common/Title";
import * as loginActions from "../../redux/actions/loginActions";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Redirect, useHistory } from "react-router";
import { toast } from "react-toastify";

import * as authUtils from "../../auth/authUtils";

const Login = (props) => {
    const [credentials, setCredentials] = useState({});
    const history = useHistory();

    const handleChange = (event) => {
        setCredentials({
            ...credentials,
            [event.target.name]: event.target.value,
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const valid = authUtils.login(credentials);
        if (!valid) {
            toast.error("Invalid credentials.");
        } else {
            history.push("/");
        }
    };

    return (
        <>
            {!props.user ? (
                <div style={{ display: "block", margin: "0 auto" }}>
                    <Title />
                    <form
                        style={{ width: "400px", margin: "0 auto" }}
                        autoComplete="off"
                    >
                        <div className="form-group">
                            <label>Username</label>
                            <input
                                name="username"
                                className="form-control"
                                type="text"
                                placeholder="Enter username"
                                onChange={handleChange}
                            />
                        </div>
                        <div className="form-group">
                            <label>Password</label>
                            <input
                                name="password"
                                className="form-control"
                                type="password"
                                placeholder="Enter password"
                                onChange={handleChange}
                            />
                        </div>
                        <div style={{ textAlign: "center" }}>
                            <button
                                disabled={
                                    !credentials.username ||
                                    !credentials.password
                                }
                                onClick={handleSubmit}
                                className="btn btn-primary"
                                style={{
                                    width: "200px",
                                    marginTop: "10px",
                                    marginBottom: "10px",
                                }}
                            >
                                Login
                            </button>
                        </div>
                    </form>
                </div>
            ) : (
                <Redirect to="/" />
            )}
        </>
    );
};

const mapStateToProps = (state) => {
    return {
        user: state.login,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        actions: {
            login: bindActionCreators(loginActions.login, dispatch),
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);

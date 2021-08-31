import React from "react";
import { Spinner } from "react-bootstrap";

const Loading = (props) => {
    return (
        <div>
            <h1 style={{ textAlign: "center" }}>
                {props.message ? props.message : "Loading"}
            </h1>
            <div style={{ textAlign: "center" }}>
                <Spinner animation="border" variant="primary" />
            </div>
        </div>
    );
};

export default Loading;

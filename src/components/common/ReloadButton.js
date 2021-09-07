import React from "react";
import "./common.css";

const ReloadButton = ({ error, onClick }) => {
    return (
        <div className="container-reload">
            <h1>Unexpected Error: {error.message}</h1>
            <button
                className="btn btn-success btn-lg btn-reload"
                onClick={onClick}
            >
                Reload
            </button>
        </div>
    );
};

export default ReloadButton;

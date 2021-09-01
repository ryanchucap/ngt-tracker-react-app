import React from "react";
import Loading from "./Loading";

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

export default ApiLoader;

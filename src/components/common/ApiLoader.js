import React from "react";
import Loading from "./Loading";

const ApiLoader = ({ apiStatus, apiName, message }) => {
    // conditionally display loading spinner
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

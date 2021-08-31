import React from "react";

import "./common.css";

const Pagination = (props) => {
    const numPages = Math.ceil(props.numEntries / props.entriesPerPage);
    const pageStartDisplay =
        numPages <= 7 ? 1 : Math.min(Math.max(props.page - 3, 1), numPages - 6);
    const pageEndDisplay =
        numPages <= 7
            ? numPages
            : Math.max(Math.min(props.page + 3, numPages), 7);
    let numDisplayed = pageEndDisplay - pageStartDisplay + 1;
    if (pageEndDisplay < 7) {
        console.log();
    }

    return (
        <div className="pagcontainer">
            <div>
                <button
                    className="pagbutton-labeled btn btn-secondary"
                    disabled={props.page === 1}
                    onClick={() => props.onChange(1)}
                >
                    First
                </button>
                <button
                    className="pagbutton-labeled btn btn-secondary"
                    disabled={props.page <= 1}
                    onClick={() => props.onChange(props.page - 1)}
                >
                    Previous
                </button>
            </div>
            <div>
                <button
                    className="pagbutton btn btn-secondary"
                    disabled
                    style={{
                        visibility:
                            pageStartDisplay === 1 ? "hidden" : "visible",
                    }}
                >
                    ...
                </button>
                {[...Array(numDisplayed).keys()].map((key) => {
                    let actualPage = key + pageStartDisplay;
                    return (
                        <button
                            className="pagbutton btn btn-secondary"
                            key={actualPage}
                            disabled={props.page === actualPage}
                            onClick={() => props.onChange(actualPage)}
                        >
                            {actualPage}
                        </button>
                    );
                })}
                <button
                    className="pagbutton btn btn-secondary"
                    disabled
                    style={{
                        visibility:
                            pageEndDisplay === numPages ? "hidden" : "visible",
                    }}
                >
                    ...
                </button>
            </div>
            <div>
                <button
                    className="pagbutton-labeled btn btn-secondary"
                    disabled={props.page >= numPages}
                    onClick={() => props.onChange(props.page + 1)}
                >
                    Next
                </button>
                <button
                    className="pagbutton-labeled btn btn-secondary"
                    disabled={props.page === numPages}
                    onClick={() => props.onChange(numPages)}
                >
                    Last
                </button>
            </div>
        </div>
    );
};

export default Pagination;

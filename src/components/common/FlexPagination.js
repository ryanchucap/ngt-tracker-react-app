import React from "react";
import "./flex-pagination.css";
import useWindowDimension from "./useWindowDimensions";

const FlexPagination = ({ numEntries, entriesPerPage, page, onChange }) => {
    const { width } = useWindowDimension();

    const numPages = Math.ceil(numEntries / entriesPerPage);

    const btnInner = "btn btn-outline-secondary btn-num";
    const btnOuter = "btn btn-outline-secondary btn-named";

    const range = (start, stop) => {
        let list = [];
        for (let n = start; n < stop; n++) {
            list.push(n);
        }
        return list;
    };

    let pgWidth = 1;
    if (width < 1000) {
        pgWidth = 1;
    } else if (width < 1200) {
        pgWidth = 3;
    } else {
        pgWidth = 5;
    }

    let start = page - (pgWidth - 1) / 2;
    let end = page + (pgWidth - 1) / 2;
    if (start <= 0) {
        start = 1;
        end = pgWidth;
    }
    if (end > numPages) {
        end = numPages;
        start = numPages - pgWidth + 1;
    }
    start = start < 1 ? 1 : start;
    end = end > numPages ? numPages : end;

    const display = range(start, end + 1);

    return (
        <div style={{ paddingTop: "10px" }}>
            <table className="table-fixed">
                <tbody>
                    <tr>
                        <td className="td-left">
                            <button
                                onClick={() => onChange(1)}
                                className={btnOuter + " btn-hide-if-small"}
                            >
                                First
                            </button>
                            <button
                                disabled={page === 1}
                                onClick={() => onChange(page - 1)}
                                className={width < 500 ? btnInner : btnOuter}
                            >
                                {width < 500 ? "<" : "Previous"}
                            </button>
                        </td>
                        <td className="td-center">
                            <button
                                disabled
                                className={
                                    btnInner +
                                    (display.includes(1) ? " btn-hide" : "")
                                }
                            >
                                ...
                            </button>
                            {display.map((p) => (
                                <button
                                    key={p}
                                    onClick={() => onChange(p)}
                                    className={
                                        btnInner +
                                        (page === p ? " btn-selected" : "")
                                    }
                                >
                                    {p}
                                </button>
                            ))}
                            <button
                                disabled
                                className={
                                    btnInner +
                                    (display.includes(numPages)
                                        ? " btn-hide"
                                        : "")
                                }
                            >
                                ...
                            </button>
                        </td>
                        <td className="td-right">
                            <button
                                disabled={page === numPages}
                                onClick={() => onChange(page + 1)}
                                className={width < 500 ? btnInner : btnOuter}
                            >
                                {width < 500 ? ">" : "Next"}
                            </button>
                            <button
                                onClick={() => onChange(numPages)}
                                className={btnOuter + " btn-hide-if-small"}
                            >
                                Last
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};

export default FlexPagination;

import React from "react";
import "./flex-pagination.css";

const FlexPagination = ({ numEntries, entriesPerPage, page, onChange }) => {
    const numPages = Math.ceil(numEntries / entriesPerPage);

    const btnInner = "btn btn-outline-secondary btn-num";
    const btnOuter = "btn btn-outline-secondary btn-named";
    return (
        <div>
            <table>
                <tbody>
                    <tr>
                        <td className="td-left">
                            <button className={btnOuter + " btn-hide-if-small"}>
                                First
                            </button>
                            <button className={btnOuter}>Previous</button>
                        </td>
                        <td className="td-center">
                            <button className={btnInner}>...</button>
                            <button className={btnInner}>1</button>
                            <button className={btnInner}>1</button>
                            <button className={btnInner}>1</button>
                            <button className={btnInner}>1</button>
                            <button className={btnInner}>1</button>
                            <button className={btnInner}>...</button>
                        </td>
                        <td className="td-right">
                            <button className={btnOuter}>Next</button>
                            <button className={btnOuter + " btn-hide-if-small"}>
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

import React from "react";
import "./employee-table.css";

const TableFooter = ({ page, entriesPerPage, empList }) => {
    return (
        <div>
            Showing {(page - 1) * entriesPerPage + 1} -{" "}
            {Math.min(page * entriesPerPage, empList.length)} of{" "}
            {empList.length} Employees
        </div>
    );
};

export default TableFooter;

import React from "react";
import FIELDS from "../../db-structure/fields";

import "./employees.css";

const EmployeeEntry = ({ employee, handleDelete, handleEdit }) => {
    return (
        <tr>
            <td className="container-modify">
                <button
                    className="btn btn-warning btn-modify"
                    onClick={handleEdit}
                >
                    EDIT
                </button>
                <button
                    className="btn btn-danger btn-modify"
                    onClick={handleDelete}
                >
                    DELETE
                </button>
            </td>
            {FIELDS.map((f) => (
                <td key={f.colName}>
                    {f.formatter
                        ? f.formatter(employee[f.colName])
                        : employee[f.colName]}
                </td>
            ))}
        </tr>
    );
};

export default EmployeeEntry;

import React from "react";
import "./employee-table.css";

const EmployeeEntry = ({ fields, employee, handleDelete, handleEdit }) => {
    return (
        <tr>
            <th className="container-modify cell">
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
            </th>
            {fields.map((f) => (
                <td key={f} className="cell">
                    {employee[f]}
                </td>
            ))}
        </tr>
    );
};

export default EmployeeEntry;

import React from "react";
import "./employee-table.css";

const EmployeeEntry = ({ employee, handleDelete, handleEdit }) => {
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
            {Object.keys(employee).map(
                (f) =>
                    f !== "id" && (
                        <td key={f} className="cell">
                            {employee[f]}
                        </td>
                    )
            )}
        </tr>
    );
};

export default EmployeeEntry;

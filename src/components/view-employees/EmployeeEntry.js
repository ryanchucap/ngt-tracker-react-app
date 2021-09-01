import React from "react";
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
            {Object.keys(employee).map(
                (f) => f !== "id" && <td key={f}>{employee[f]}</td>
            )}
        </tr>
    );
};

export default EmployeeEntry;

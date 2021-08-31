import React from "react";

import "./employees.css";

const EmployeeEntry = ({ employee, handleDelete, handleEdit }) => {
    const d = new Date(employee.joinDate);

    return (
        <tr>
            <td>{employee.lastName + ", " + employee.firstName}</td>
            <td>
                {d.toLocaleDateString("en-US", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                })}
            </td>
            <td>{employee.track}</td>
            <td>{employee.email}</td>
            <td>{employee.phone}</td>
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
        </tr>
    );
};

export default EmployeeEntry;

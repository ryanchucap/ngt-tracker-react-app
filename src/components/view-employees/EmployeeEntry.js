import React from "react";
import "./employees.css";

const EmployeeEntry = ({ employee, handleDelete, handleEdit }) => {
    return (
        <tr>
            <th className="container-modify">
                <div>
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
                </div>
            </th>
            {Object.keys(employee).map(
                (f) => f !== "id" && <td key={f}>{employee[f]}</td>
            )}
        </tr>
    );
};

export default EmployeeEntry;

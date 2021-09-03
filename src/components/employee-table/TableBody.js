import React from "react";
import "./employee-table.css";
import EmployeeEntry from "./EmployeeEntry";

const TableBody = ({ empList, handleEdit, handleDelete }) => {
    return (
        <tbody>
            {empList.map((employee) => (
                <EmployeeEntry
                    key={employee.id}
                    employee={employee}
                    handleEdit={() => handleEdit(employee.id)}
                    handleDelete={() => handleDelete(employee)}
                />
            ))}
        </tbody>
    );
};

export default TableBody;

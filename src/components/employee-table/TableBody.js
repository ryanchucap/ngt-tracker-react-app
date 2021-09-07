import React from "react";
import "./employee-table.css";
import EmployeeEntry from "./EmployeeEntry";

const TableBody = ({ fields, empList, handleEdit, handleDelete }) => {
    return (
        <tbody>
            {empList.map((employee) => (
                <EmployeeEntry
                    fields={fields}
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

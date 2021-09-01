import React from "react";
import { useHistory } from "react-router";
import EmployeeForm from "../forms/EmployeeForm";
import "./add-employee.css";

const AddEmployee = () => {
    const history = useHistory();
    return (
        <div className="container-form">
            <EmployeeForm
                values={{}}
                afterSubmit={() => history.push("/employees")}
            />
        </div>
    );
};

export default AddEmployee;

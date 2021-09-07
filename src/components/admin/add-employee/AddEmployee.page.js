import React from "react";
import { useHistory } from "react-router";
import EmployeeForm from "../../forms/EmployeeForm";
import "./add-employee.css";

const AddEmployee = (props) => {
    const history = useHistory();
    // display EmployeeForm with no initial values (values={})
    // if add is successful, redirect to /employees

    return (
        <div className="add-employee-form-container">
            <EmployeeForm
                values={{}}
                afterSubmit={() => history.push("/employees")}
            />
        </div>
    );
};

export default AddEmployee;

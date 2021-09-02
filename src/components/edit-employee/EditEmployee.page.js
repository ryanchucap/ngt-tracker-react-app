import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { matchPath, useHistory, useLocation } from "react-router";
import EmployeeForm from "../forms/EmployeeForm";
import "./edit-employee.css";

const EditEmployee = ({ employees }) => {
    const location = useLocation();
    const history = useHistory();
    const [employee, setEmployee] = useState(null);

    useEffect(() => {
        // make sure we're on the right route, and get the id if so
        const matcher = matchPath(location.pathname, {
            path: "/employees/:id",
        });

        // redirect if there aren't any employees to edit
        if (!matcher || employees.length === 0) {
            alert("Load employees before editing");
            history.push("/");
        } else {
            const emp = employees.filter(
                (emp) => emp.id === Number.parseInt(matcher.params.id)
            );
            // if the id is valid, updated employee, otherwise redirect
            if (emp.length > 0) {
                setEmployee(emp[0]);
            } else {
                alert("Employee does not exist with ID: " + matcher.params.id);
                history.push("/employees");
            }
        }
    }, [history, employees]);

    // Use employee as initial value of EmployeeForm if one is selected
    // After editing, send back to /employees
    return (
        <>
            {employee ? (
                <div className="container-form">
                    <EmployeeForm
                        values={employee}
                        afterSubmit={() => history.push("/employees")}
                    />
                </div>
            ) : (
                <></>
            )}
        </>
    );
};

const mapStateToProps = (state) => {
    return {
        employees: state.employees,
    };
};

export default connect(mapStateToProps)(EditEmployee);

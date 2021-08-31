import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { matchPath, useHistory, useLocation } from "react-router";
import EmployeeForm from "../common/forms/EmployeeForm";

import "./edit-employee.css";

const EditEmployee = ({ employees }) => {
    const location = useLocation();
    const history = useHistory();
    const [employee, setEmployee] = useState(null);

    const matcher = matchPath(location.pathname, {
        path: "/employees/:id",
    });

    useEffect(() => {
        if (!matcher || employees.length === 0) {
            alert("Load employees before editing");
            history.goBack();
        } else {
            const emp = employees.filter(
                (emp) => emp.id === Number.parseInt(matcher.params.id)
            );
            if (emp.length > 0) {
                setEmployee(emp[0]);
            } else {
                alert("Employee does not exist with ID: " + matcher.params.id);
                history.goBack();
            }
        }
    }, [history, matcher, employees]);

    return (
        <>
            {employee ? (
                <div className="container-form">
                    <EmployeeForm values={employee} />
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

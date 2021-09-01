import React from "react";
import GenericForm from "./GenericForm";
import { toast } from "react-toastify";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as employeeActions from "../../redux/actions/employeeActions";

import FIELDS from "../../db-structure/fields";

const EmployeeForm = ({ values, actions, afterSubmit }) => {
    const onSubmit = (event, result) => {
        let employee = result;
        let isUpdate = false;
        if (values.id !== undefined) {
            employee = { ...employee, id: values.id };
            isUpdate = true;
        }

        actions
            .saveEmployee(employee)
            .then(() => {
                toast.success(
                    isUpdate ? "Information updated." : "Employee added."
                );
                if (afterSubmit) {
                    afterSubmit();
                }
            })
            .catch((error) =>
                toast.error("Error saving data: " + error.message, {
                    autoClose: false,
                })
            );
    };

    const onFailure = (event, result) =>
        toast.error("Please complete all input fields before submitting.");

    return (
        <div className="employee-form">
            <GenericForm
                fields={FIELDS}
                values={values}
                onSubmit={onSubmit}
                onFailure={onFailure}
            />
        </div>
    );
};

const mapStateToProps = (state, ownProps) => {
    return {};
};

const mapDispatchToProps = (dispatch) => {
    return {
        actions: {
            saveEmployee: bindActionCreators(
                employeeActions.saveEmployee,
                dispatch
            ),
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(EmployeeForm);

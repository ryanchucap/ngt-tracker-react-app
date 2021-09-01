import React from "react";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import { bindActionCreators } from "redux";
import * as employeeActions from "../../redux/actions/employeeActions";
import GenericForm from "./GenericForm";

const EmployeeForm = ({ fields, values, actions, afterSubmit }) => {
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
                fields={fields}
                values={values}
                onSubmit={onSubmit}
                onFailure={onFailure}
            />
        </div>
    );
};

const mapStateToProps = (state, ownProps) => {
    let keys = null;
    let fields = null;
    if (state.employees.length > 0) {
        keys = Object.keys(state.employees[0]);
        fields = [];
        for (let k of keys) {
            if (k !== "id") {
                fields.push({ colName: k, formLabel: k, isRequired: true });
            }
        }
    }
    return { fields };
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

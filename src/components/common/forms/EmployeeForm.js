import React from "react";
import GenericForm from "./GenericForm";
import { toast } from "react-toastify";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as employeeActions from "../../../redux/actions/employeeActions";
import { useHistory } from "react-router";

const EmployeeForm = ({ values, actions }) => {
    const history = useHistory();

    const firstName = {
        name: "firstName",
        label: "First Name:",
        placeholder: "Enter first name",
        isRequired: true,
    };

    const lastName = {
        name: "lastName",
        label: "Last Name:",
        placeholder: "Enter last name",
        isRequired: true,
    };

    const joinDate = {
        name: "joinDate",
        label: "Join Date:",
        type: "date",
        isRequired: true,
        isValid: (value) => {
            const d = new Date(value);
            const now = new Date();
            if (d > now) {
                return {
                    valid: false,
                    message:
                        "Join date must be on or before " +
                        now.toLocaleDateString(),
                };
            } else {
                return { valid: true, message: "" };
            }
        },
    };

    const track = {
        name: "track",
        label: "Technology Track:",
        placeholder: "Enter technology track",
        isRequired: true,
    };

    const email = {
        name: "email",
        label: "Email Address:",
        placeholder: "Enter email",
        isRequired: true,
        isValid: (value) => {
            if (!/^(\w+\.)*\w+@(\w+\.)+\w+$/.test(value)) {
                return { valid: false, message: "Invalid email address." };
            } else {
                return { valid: true, message: "" };
            }
        },
    };

    const phone = {
        name: "phone",
        type: "tel",
        label: "Phone Number:",
        placeholder: "Enter phone number",
        isRequired: true,
        rejectChange: (value) => {
            if (/\D/.test(value)) {
                return true;
            } else {
                return false;
            }
        },
    };

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
                toast.success("Employee " + (isUpdate ? "updated." : "added."));
                history.push("/employees");
            })
            .catch((error) =>
                toast.error("Error saving employee: " + error.message, {
                    autoClose: false,
                })
            );
    };

    const onFailure = (event, result) =>
        toast.error("Please complete all input fields before submitting.");

    return (
        <div className="employee-form">
            <GenericForm
                fields={[firstName, lastName, joinDate, track, email, phone]}
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

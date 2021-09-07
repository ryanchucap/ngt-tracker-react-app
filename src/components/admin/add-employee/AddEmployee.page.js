import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as apiTypes from "../../../api/apiTypes";
import * as employeeActions from "../../../redux/actions/employeeActions";
import ReloadButton from "../../common/ReloadButton";
import EmployeeForm from "../../forms/EmployeeForm";
import "./add-employee.css";

class AddEmployee extends Component {
    state = { error: "" };

    componentDidMount() {
        this.loadEmployees();
    }

    loadEmployees = () => {
        const { employees, apiStatus, actions } = this.props;
        if (
            employees.length === 0 &&
            apiStatus.indexOf(apiTypes.LOAD_EMPLOYEES) === -1
        ) {
            actions.loadEmployees().catch((error) => this.setState({ error }));
        }
    };

    render() {
        const { employees, apiStatus } = this.props;
        const { error } = this.state;

        return (
            <>
                {employees.length > 0 ? (
                    <div className="add-employee-form-container">
                        <EmployeeForm
                            values={{}}
                            afterSubmit={() =>
                                this.props.history.push("/employees")
                            }
                        />
                    </div>
                ) : apiStatus.indexOf(apiTypes.LOAD_EMPLOYEES) > -1 ? (
                    <></>
                ) : (
                    <ReloadButton error={error} onClick={this.loadEmployees} />
                )}
            </>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        employees: state.employees,
        apiStatus: state.apiStatus,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        actions: {
            loadEmployees: bindActionCreators(
                employeeActions.loadEmployees,
                dispatch
            ),
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddEmployee);

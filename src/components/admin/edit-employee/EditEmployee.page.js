import React, { Component } from "react";
import { connect } from "react-redux";
import { matchPath } from "react-router";
import { bindActionCreators } from "redux";
import * as apiTypes from "../../../api/apiTypes";
import * as employeeActions from "../../../redux/actions/employeeActions";
import ReloadButton from "../../common/ReloadButton";
import EmployeeForm from "../../forms/EmployeeForm";
import "./edit-employee.css";

class EditEmployee extends Component {
    state = { error: "", id: null, employee: null };

    componentDidMount() {
        const matcher = matchPath(this.props.location.pathname, {
            path: "/employees/:id",
        });

        if (!matcher) {
            this.props.history.push("/"); // should never get here
        } else {
            this.setState({
                ...this.state,
                id: Number.parseInt(matcher.params.id),
            });
            if (this.props.employees.length === 0) {
                this.loadEmployees();
            } else {
                this.selectEmployee(Number.parseInt(matcher.params.id));
            }
        }
    }

    componentDidUpdate(prevProps) {
        if (
            this.props.employees.length > 0 &&
            prevProps.employees.length === 0
        ) {
            this.selectEmployee(this.state.id);
        }
    }

    selectEmployee = (id) => {
        const emp = this.props.employees.filter((emp) => emp.id === id);
        // if the id is valid, updated employee, otherwise redirect
        if (emp.length > 0) {
            this.setState({ ...this.state, employee: emp[0] });
        } else {
            alert("Employee does not exist with ID: " + id);
            this.props.history.push("/employees");
        }
    };

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
        const { error, employee } = this.state;
        const { apiStatus, history } = this.props;
        return (
            <>
                {employee ? (
                    <div className="container-form">
                        <EmployeeForm
                            values={employee}
                            afterSubmit={() => history.push("/employees")}
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

export default connect(mapStateToProps, mapDispatchToProps)(EditEmployee);

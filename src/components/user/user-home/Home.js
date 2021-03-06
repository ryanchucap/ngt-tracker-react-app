import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as apiTypes from "../../../api/apiTypes";
import * as employeeActions from "../../../redux/actions/employeeActions";
import EmployeeForm from "../../forms/EmployeeForm";
import "./home.css";

class Home extends Component {
    state = { error: "" };
    id = 0;
    componentDidMount() {
        this.loadEmployees();
    }

    loadEmployees = () => {
        const { employees, apiStatus, actions } = this.props;
        if (
            employees.length === 0 &&
            apiStatus.indexOf(apiTypes.LOAD_EMPLOYEES) === -1
        ) {
            actions.loadEmployees(0).catch((error) => this.setState({ error }));
        }
    };

    render() {
        const { employees, apiStatus } = this.props;
        const { error } = this.state;

        return (
            <>
                {employees.length > 0 ? (
                    <>
                        <h1>Your Profile:</h1>
                        <EmployeeForm values={employees[0]} />
                    </>
                ) : apiStatus.indexOf(apiTypes.LOAD_EMPLOYEES) > -1 ? (
                    <></>
                ) : (
                    <div className="container-reload">
                        <h1>Unexpected Error: {error.message}</h1>
                        <button
                            className="btn btn-success btn-lg btn-reload"
                            onClick={this.loadEmployees}
                        >
                            Reload
                        </button>
                    </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(Home);

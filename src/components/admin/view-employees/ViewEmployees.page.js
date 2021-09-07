import React, { Component } from "react";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import { bindActionCreators } from "redux";
import * as apiTypes from "../../../api/apiTypes";
import * as employeeActions from "../../../redux/actions/employeeActions";
import * as fileActions from "../../../redux/actions/fileActions";
import EmployeeTable from "../employee-table/EmployeeTable";
import "./view-employees.css";

class ViewEmployees extends Component {
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

    handleDownload = () => {
        this.props.actions
            .downloadFile()
            .then((response) => {
                const blob = new Blob([response.data], {
                    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
                });
                const href = URL.createObjectURL(blob);
                const link = document.createElement("a");
                link.href = href;
                link.download = "NGT_Profiles.xlsx";
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                toast.success("File downloaded.");
            })
            .catch((error) =>
                toast.error("Error downloading file: " + error.message, {
                    autoClose: false,
                })
            );
    };

    render() {
        const { employees, apiStatus } = this.props;
        const { error } = this.state;
        return (
            <>
                {employees.length > 0 ? (
                    <div className="container-table">
                        <div className="container-download">
                            <button
                                className="btn btn-success btn-lg"
                                onClick={this.handleDownload}
                            >
                                Download As Excel Document
                            </button>
                        </div>
                        <EmployeeTable />
                    </div>
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
            downloadFile: bindActionCreators(
                fileActions.downloadFile,
                dispatch
            ),
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ViewEmployees);

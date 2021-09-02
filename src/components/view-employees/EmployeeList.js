import React, { useState } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router";
import { toast } from "react-toastify";
import { bindActionCreators } from "redux";
import * as employeeActions from "../../redux/actions/employeeActions";
import Pagination from "../common/Pagination";
//import Filter from "../filter/Filter";
import EmployeeEntry from "./EmployeeEntry";
import "./employees.css";

const EmployeeList = ({ employees, actions }) => {
    const history = useHistory();

    const [page, setPage] = useState(1);

    const entriesPerPage = 15;

    const handleEdit = (id) => {
        history.push("/employees/" + id);
    };

    const handleDelete = (employee) => {
        actions
            .deleteEmployee(employee)
            .then(() => {
                toast.success("Employee deleted.");
            })
            .catch((error) =>
                toast.error("Error deleting employee: " + error.message, {
                    autoClose: false,
                })
            );
    };

    return (
        <>
            <table className="table table-hover table-scrollable">
                <thead>
                    <tr className="h4">
                        <th className="text-center">Modify</th>
                        {Object.keys(employees[0]).map(
                            (f) => f !== "id" && <th key={f}>{f}</th>
                        )}
                    </tr>
                </thead>
                <tbody>
                    {employees
                        .slice(
                            (page - 1) * entriesPerPage,
                            page * entriesPerPage
                        )
                        .map((employee) => (
                            <EmployeeEntry
                                key={employee.id}
                                employee={employee}
                                handleEdit={() => handleEdit(employee.id)}
                                handleDelete={() => handleDelete(employee)}
                            />
                        ))}
                </tbody>
            </table>
            <Pagination
                page={page}
                numEntries={employees.length}
                entriesPerPage={entriesPerPage}
                onChange={(p) => setPage(p)}
            />
            <div>
                Showing {(page - 1) * entriesPerPage + 1} -{" "}
                {Math.min(page * entriesPerPage, employees.length)} of{" "}
                {employees.length} Employees
            </div>
        </>
    );
};

const mapStateToProps = (state, ownProps) => {
    return {
        employees: state.employees,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        actions: {
            deleteEmployee: bindActionCreators(
                employeeActions.deleteEmployee,
                dispatch
            ),
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(EmployeeList);

import React, { useState } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router";
import { toast } from "react-toastify";
import { bindActionCreators } from "redux";
import * as employeeActions from "../../redux/actions/employeeActions";
import Pagination from "../common/Pagination";
import SortButton from "../common/SortButton";
//import Filter from "../filter/Filter";

import EmployeeEntry from "./EmployeeEntry";

import "./employees.css";

const EmployeeList = ({ employees, actions }) => {
    const history = useHistory();

    const [page, setPage] = useState(1);
    const [sortMethod, setSortMethod] = useState({
        field: null,
        order: 1,
    });

    const entriesPerPage = 10;

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

    const handleSort = (field, order) => {
        if (page !== 1) {
            setPage(1);
        }
        setSortMethod({ field, order });
    };

    const applySort = (employeeList, field, order) => {
        const comparators = {
            name: (a, b) => {
                const byLast = a.lastName.localeCompare(b.lastName);
                return byLast !== 0
                    ? byLast
                    : a.firstName.localeCompare(b.firstName);
            },
            startDate: (a, b) => {
                let dA = Date.parse(a.startDate, "MM-dd-yyyy");
                let dB = Date.parse(b.startDate, "MM-dd-yyyy");
                return dA < dB ? -1 : dA > dB ? 1 : 0;
            },
        };
        if (employeeList.length > 0 && field && comparators[field]) {
            return employeeList.sort(
                (a, b) => comparators[field](a, b) * order
            );
        } else {
            return employeeList;
        }
    };

    return (
        <>
            <table className="table table-hover table-scrollable">
                <thead>
                    <tr className="h3">
                        <th>
                            Name
                            <SortButton
                                onChange={(order) => handleSort("name", order)}
                                deselected={sortMethod.field !== "name"}
                            />
                        </th>
                        <th>
                            Start Date
                            <SortButton
                                onChange={(order) =>
                                    handleSort("startDate", order)
                                }
                                deselected={sortMethod.field !== "startDate"}
                            />
                        </th>
                        <th>Track</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th className="text-center">Modify</th>
                    </tr>
                </thead>
                <tbody>
                    {applySort(employees, sortMethod.field, sortMethod.order)
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

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
    const [search, setSearch] = useState("");
    const [sortField, setSortField] = useState({ field: null, order: 1 });

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

    const handleSearchChange = (event) => {
        setSearch(event.target.value);
        setPage(1);
    };

    const searchFilter = (emp) => {
        if (search === "") {
            return true;
        } else {
            for (let k of Object.keys(emp)) {
                if (
                    k !== "id" &&
                    emp[k]
                        .toString()
                        .toLowerCase()
                        .includes(search.toLowerCase())
                ) {
                    return true;
                }
            }
            return false;
        }
    };

    const applySort = (empList, field, order) => {
        if (field) {
            return empList.sort(
                (a, b) => a[field].localeCompare(b[field]) * order
            );
        } else {
            return empList;
        }
    };

    const handleSortChange = (field, order) => {
        setSortField({ field, order });
        setPage(1);
    };

    const handleSearchClear = (event) => {
        event.preventDefault();
        setSearch("");
        setPage(1);
    };

    const employeesFiltered = applySort(
        employees.filter(searchFilter),
        sortField.field,
        sortField.order
    );

    return (
        <>
            <hr />
            <div style={{ width: "100%" }}>
                <form
                    className="form-inline"
                    style={{
                        maxWidth: "400px",
                        marginLeft: "auto",
                        marginRight: "0",
                    }}
                >
                    <div className="input-group">
                        <input
                            value={search}
                            className="form-control"
                            placeholder="Enter search term"
                            onChange={handleSearchChange}
                        />
                        <button
                            className="btn btn-primary"
                            onClick={handleSearchClear}
                        >
                            Clear
                        </button>
                    </div>
                </form>
            </div>

            <hr />

            {employeesFiltered.length === 0 ? (
                <h1 style={{ textAlign: "center" }}>No results.</h1>
            ) : (
                <>
                    <div className="table-container">
                        <table>
                            <thead>
                                <tr className="h4">
                                    <th className="text-center">Modify</th>
                                    {Object.keys(employees[0]).map(
                                        (f) =>
                                            f !== "id" && (
                                                <th key={f}>
                                                    {f.toUpperCase()}
                                                    <SortButton
                                                        onChange={(order) =>
                                                            handleSortChange(
                                                                f,
                                                                order
                                                            )
                                                        }
                                                        deselected={
                                                            f !==
                                                            sortField.field
                                                        }
                                                    />
                                                </th>
                                            )
                                    )}
                                </tr>
                            </thead>
                            <tbody>
                                {employeesFiltered
                                    .slice(
                                        (page - 1) * entriesPerPage,
                                        page * entriesPerPage
                                    )
                                    .map((employee) => (
                                        <EmployeeEntry
                                            key={employee.id}
                                            employee={employee}
                                            handleEdit={() =>
                                                handleEdit(employee.id)
                                            }
                                            handleDelete={() =>
                                                handleDelete(employee)
                                            }
                                        />
                                    ))}
                            </tbody>
                        </table>
                    </div>
                    <Pagination
                        page={page}
                        numEntries={employeesFiltered.length}
                        entriesPerPage={entriesPerPage}
                        onChange={(p) => setPage(p)}
                    />
                    <div>
                        Showing {(page - 1) * entriesPerPage + 1} -{" "}
                        {Math.min(
                            page * entriesPerPage,
                            employeesFiltered.length
                        )}{" "}
                        of {employeesFiltered.length} Employees
                    </div>
                </>
            )}
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

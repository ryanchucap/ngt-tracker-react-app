import React, { useState } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router";
import { toast } from "react-toastify";
import { bindActionCreators } from "redux";
import * as employeeActions from "../../redux/actions/employeeActions";
import Pagination from "../common/Pagination";
import "./employee-table.css";
import SearchBar from "./SearchBar";
import TableBody from "./TableBody";
import TableFooter from "./TableFooter";
import TableHead from "./TableHead";

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
            <SearchBar
                search={search}
                handleSearchChange={handleSearchChange}
                handleSearchClear={handleSearchClear}
            />
            <hr />
            {employeesFiltered.length === 0 ? (
                <h1 style={{ textAlign: "center" }}>No results.</h1>
            ) : (
                <>
                    <div className="table-container">
                        <table>
                            <TableHead
                                fields={Object.keys(employees[0])}
                                handleSortChange={handleSortChange}
                                sortField={sortField}
                            />

                            <TableBody
                                empList={employeesFiltered.slice(
                                    (page - 1) * entriesPerPage,
                                    page * entriesPerPage
                                )}
                                handleEdit={handleEdit}
                                handleDelete={handleDelete}
                            />
                        </table>
                    </div>
                    <Pagination
                        page={page}
                        numEntries={employeesFiltered.length}
                        entriesPerPage={entriesPerPage}
                        onChange={(p) => setPage(p)}
                    />
                    <TableFooter
                        page={page}
                        entriesPerPage={entriesPerPage}
                        empList={employeesFiltered}
                    />
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

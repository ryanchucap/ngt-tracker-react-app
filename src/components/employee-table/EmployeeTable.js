import React, { useState } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router";
import { toast } from "react-toastify";
import { bindActionCreators } from "redux";
import * as employeeActions from "../../redux/actions/employeeActions";
import FlexPagination from "../common/FlexPagination";
import "./employee-table.css";
import SearchBar from "./SearchBar";
import TableBody from "./TableBody";
import TableFooter from "./TableFooter";
import TableHead from "./TableHead";

const EmployeeTable = ({ fields, employees, actions }) => {
    const history = useHistory();

    const [page, setPage] = useState(1);
    const [search, setSearch] = useState({ term: "", column: "-1" });
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

    const searchFilter = (emp) => {
        if (search.term === "") {
            return true;
        } else {
            const searchFields =
                search.column === "-1" ? fields : [search.column];
            for (let k of searchFields) {
                if (
                    emp[k]
                        .toString()
                        .toLowerCase()
                        .includes(search.term.toLowerCase())
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

    const handleSearchChange = (event) => {
        setSearch({ ...search, [event.target.name]: event.target.value });
        setPage(1);
    };

    const handleSearchClear = (event) => {
        event.preventDefault();
        setSearch({ term: "", column: "-1" });
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
                fields={fields}
                search={search}
                handleSearchChange={handleSearchChange}
                handleSearchClear={handleSearchClear}
            />
            <hr />
            {employeesFiltered.length === 0 ? (
                <h1 style={{ textAlign: "center" }}>No results.</h1>
            ) : (
                <div>
                    <div className="table-container">
                        <table className="table-scrolled">
                            <TableHead
                                fields={fields}
                                handleSortChange={handleSortChange}
                                sortField={sortField}
                            />

                            <TableBody
                                fields={fields}
                                empList={employeesFiltered.slice(
                                    (page - 1) * entriesPerPage,
                                    page * entriesPerPage
                                )}
                                handleEdit={handleEdit}
                                handleDelete={handleDelete}
                            />
                        </table>
                    </div>
                    <div>
                        <FlexPagination
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
                    </div>
                </div>
            )}
        </>
    );
};

const mapStateToProps = (state, ownProps) => {
    let fields = [];
    if (state.employees.length > 0) {
        fields = Object.keys(state.employees[0]).filter((k) => k !== "id");
    }
    return {
        employees: state.employees,
        fields: fields,
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

export default connect(mapStateToProps, mapDispatchToProps)(EmployeeTable);

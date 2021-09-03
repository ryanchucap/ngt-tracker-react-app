import axios from "axios";

const baseUrl = process.env.REACT_APP_API_URL + "employees/";

/*
 * employees/        -> needs error code if no database exists
 *   - GET    -> get all employees
 *   - POST   -> add new employee
 * employees/:id     -> needs error code if no database exists
 *   - GET    -> get employee by id
 *   - PUT    -> update employee with given id
 *   - DELETE -> delete employee with given id
 * files/
 *   - GET    -> get excel version of database
 *   - POST   -> create database from excel file
 */

export function getEmployees(id) {
    return new Promise((resolve, reject) => {
        axios
            .get(baseUrl + (id ? id : ""))
            .then((response) => resolve(response.data))
            .catch((error) => reject(error));
    });
}

export function updateEmployee(employee) {
    return new Promise((resolve, reject) => {
        axios
            .put(baseUrl + employee.id, employee)
            .then((response) => resolve(response.data))
            .catch((error) => reject(error));
    });
}

export function createEmployee(employee) {
    return new Promise((resolve, reject) => {
        axios
            .post(baseUrl, employee)
            .then((response) => resolve(response.data))
            .catch((error) => reject(error));
    });
}

export function deleteEmployee(employee) {
    return new Promise((resolve, reject) => {
        axios
            .delete(baseUrl + employee.id)
            .then((response) => resolve(response.data))
            .catch((error) => reject(error));
    });
}

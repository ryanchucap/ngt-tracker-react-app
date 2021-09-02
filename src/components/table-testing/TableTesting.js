import React from "react";
import "./table-testing.css";

const TableTesting = () => {
    return (
        <div className="table-container">
            <table className="table-hover">
                <thead>
                    <tr>
                        <th>Teams</th>
                        <th>1</th>
                        <th>2</th>
                        <th>3</th>
                        <th>4</th>
                        <th>5</th>
                        <th>6</th>
                        <th>7</th>
                        <th>8</th>
                        <th>9</th>
                        <th>Runs</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th>Milwaukee Brewers</th>
                        <td>0</td>
                        <td>2</td>
                        <td>0</td>
                        <td>1</td>
                        <td>4</td>
                        <td>2</td>
                        <td>3</td>
                        <td>4</td>
                        <td>1</td>
                        <td>17</td>
                    </tr>
                    <tr>
                        <th>Los Angles Dodgers</th>
                        <td>3</td>
                        <td>1</td>
                        <td>2</td>
                        <td>3</td>
                        <td>0</td>
                        <td>4</td>
                        <td>0</td>
                        <td>1</td>
                        <td>1</td>
                        <td>15</td>
                    </tr>
                    <tr>
                        <th>New York Mets</th>
                        <td>2</td>
                        <td>0</td>
                        <td>3</td>
                        <td>0</td>
                        <td>4</td>
                        <td>3</td>
                        <td>3</td>
                        <td>4</td>
                        <td>2</td>
                        <td>21</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};

export default TableTesting;

import React from "react";
import SortButton from "../common/SortButton";
import "./employee-table.css";

const TableHead = ({ fields, handleSortChange, sortField }) => {
    return (
        <thead>
            <tr className="h4">
                <th
                    className="text-center cell"
                    style={{ paddingBottom: "10px" }}
                >
                    MODIFY
                </th>
                {fields
                    .filter((f) => f !== "id")
                    .map((f) => (
                        <th key={f} className="cell">
                            {f.toUpperCase()}
                            <SortButton
                                onChange={(order) => handleSortChange(f, order)}
                                deselected={f !== sortField.field}
                            />
                        </th>
                    ))}
            </tr>
        </thead>
    );
};

export default TableHead;

import React from "react";
import SortButton from "../common/SortButton";
import "./employee-table.css";

const TableHead = ({ fields, handleSortChange, sortField }) => {
    return (
        <thead>
            <tr className="h4">
                <th className="text-center" style={{ paddingBottom: "10px" }}>
                    MODIFY
                </th>
                {fields.map((f) =>
                    f === "id" ? (
                        <></>
                    ) : (
                        <th key={f}>
                            {f.toUpperCase()}
                            <SortButton
                                onChange={(order) => handleSortChange(f, order)}
                                deselected={f !== sortField.field}
                            />
                        </th>
                    )
                )}
            </tr>
        </thead>
    );
};

export default TableHead;

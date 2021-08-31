import React from "react";

import "./filter.css";

const FilterTag = () => {
    const labelClass = "btn btn-secondary btn-tag";

    return (
        <>
            <div className="btn-group">
                <button className={labelClass}>First name</button>
                <button className={labelClass}>does</button>
                <button className={labelClass}>start with</button>
                <button className={labelClass}>"hello"</button>
                <button className="btn btn-danger btn-delete">X</button>
            </div>
        </>
    );
};

export default FilterTag;

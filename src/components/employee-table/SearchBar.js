import React from "react";
import "./employee-table.css";

const SearchBar = ({
    search,
    fields,
    handleSearchChange,
    handleSearchClear,
}) => {
    return (
        <div style={{ width: "100%" }}>
            <form className="form-inline search-form" autocomplete="off">
                <div className="input-group">
                    <input
                        name="term"
                        value={search.term}
                        className="form-control"
                        placeholder="Enter search term"
                        onChange={handleSearchChange}
                    />

                    <select
                        name="column"
                        value={search.column}
                        onChange={handleSearchChange}
                        className="form-select"
                        style={{ maxWidth: "fit-content" }}
                    >
                        <option value="0" disabled>
                            pick a column
                        </option>
                        <option value="-1">all</option>
                        {fields.map((f, i) => (
                            <option key={i} value={f}>
                                {f.toLowerCase()}
                            </option>
                        ))}
                    </select>
                    <button
                        className="btn btn-primary"
                        onClick={handleSearchClear}
                    >
                        Clear
                    </button>
                </div>
            </form>
        </div>
    );
};

export default SearchBar;

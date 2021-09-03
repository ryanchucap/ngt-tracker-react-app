import React from "react";
import "./employee-table.css";

const SearchBar = ({ search, handleSearchChange, handleSearchClear }) => {
    return (
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
    );
};

export default SearchBar;

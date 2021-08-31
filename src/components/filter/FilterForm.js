import React from "react";

const FilterForm = () => {
    const fields = ["Full name", "Last name", "First name"];

    const negate = ["does", "does not"];

    const searchTypes = ["start with", "end with", "contain"];

    return (
        <>
            <form style={{ marginTop: "10px", marginBottom: "10px" }}>
                <div className="row">
                    <div className="col-md-2">
                        <select className="form-control">
                            {fields.map((f) => (
                                <option value={f}>{f}</option>
                            ))}
                        </select>
                    </div>
                    <div className="col-md-2">
                        <select className="form-control">
                            {negate.map((n) => (
                                <option value={n}>{n}</option>
                            ))}
                        </select>
                    </div>
                    <div className="col-md-2">
                        <select className="form-control">
                            {searchTypes.map((t) => (
                                <option value={t}>{t}</option>
                            ))}
                        </select>
                    </div>
                    <div className="col">
                        <input
                            className="form-control"
                            placeholder="Enter term"
                        />
                    </div>
                    <div className="col">
                        <button className="btn btn-primary">Add Filter</button>
                    </div>
                </div>
            </form>
        </>
    );
};

export default FilterForm;

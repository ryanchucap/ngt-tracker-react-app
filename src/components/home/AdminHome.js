import React, { useState } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router";
import { toast } from "react-toastify";
import { bindActionCreators } from "redux";
import * as fileActions from "../../redux/actions/fileActions";

import "./admin-home.css";

const AdminHome = (props) => {
    const history = useHistory();
    const [fileName, setFileName] = useState("");
    const [file, setFile] = useState();
    const [error, setError] = useState("");

    const handleChange = (event) => {
        if (!event.target.value.endsWith(".xlsx")) {
            setError("Invalid file type: *.xlsx required.");
        } else {
            setError("");
            setFile(event.target.files[0]);
        }
        setFileName(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append("name", fileName);
        formData.append("file", file);

        let proceed = true;
        if (props.uploaded) {
            proceed = window.confirm(
                "Warning: Changes to previous file will be lost. Proceed?"
            );
        }
        if (proceed) {
            props.actions
                .uploadFile(formData)
                .then(() => {
                    history.push("/employees");
                })
                .catch((error) =>
                    toast.error("Error uploading file: " + error.message)
                );
        }
    };

    return (
        <>
            <form encType="multipart/form-data" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="fileName">Upload An Excel File:</label>
                    <input
                        name="fileName"
                        type="file"
                        accept=".xlsx"
                        className="form-control"
                        value={fileName}
                        onChange={handleChange}
                    />
                    {error && fileName ? (
                        <small className="text-danger">{error}</small>
                    ) : (
                        <></>
                    )}
                </div>
                <button
                    className="btn btn-primary btn-submit"
                    disabled={error || !fileName}
                    type="submit"
                >
                    Upload
                </button>
            </form>
        </>
    );
};

const mapStateToProps = (state) => {
    return {
        uploaded: state.file.uploaded,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        actions: {
            uploadFile: bindActionCreators(fileActions.uploadFile, dispatch),
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(AdminHome);

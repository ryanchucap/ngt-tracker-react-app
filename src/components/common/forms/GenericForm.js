import React, { useEffect, useState } from "react";

import "./forms.css";

const GenericForm = ({ fields, values, onSubmit, onFailure }) => {
    const initializeObject = (fields, fillValue = "") => {
        let result = {};
        for (let f of fields) {
            result = { ...result, [f.name]: fillValue };
        }
        return result;
    };

    const initializeResult = (fields, values) => {
        let result = {};
        for (let f of fields) {
            if (values[f.name]) {
                result = { ...result, [f.name]: values[f.name] };
            } else {
                result = { ...result, [f.name]: "" };
            }
        }
        return result;
    };

    const [result, setResult] = useState(initializeResult(fields, values));
    const [error, setError] = useState(initializeObject(fields));
    const [touched, setTouched] = useState(initializeObject(fields, false));

    const handleChange = (field, event) => {
        if (!(field.rejectChange && field.rejectChange(event.target.value))) {
            setResult({ ...result, [event.target.name]: event.target.value });
        }
        setTouched({ ...touched, [event.target.name]: true });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (validateForm(initializeObject(fields, true))) {
            onSubmit(event, result);
        } else if (onFailure) {
            onFailure(event, result);
        }
    };

    const validateForm = (t = null) => {
        if (!t) {
            t = touched;
        }

        let newError = initializeObject(fields);
        let isValid = true;
        for (let f of fields) {
            if (t[f.name]) {
                if (f.isRequired && result[f.name].length === 0) {
                    newError[f.name] = "*Required Field";
                    isValid = false;
                } else if (f.isValid) {
                    let { valid, message } = f.isValid(result[f.name]);

                    if (!valid) {
                        newError[f.name] = message;
                        isValid = false;
                    }
                }
            }
        }
        setError(newError);
        return isValid;
    };

    useEffect(validateForm, [result, touched, fields]);

    return (
        <form autoComplete="off">
            {fields.map((f, i) => (
                <InputGroup
                    {...f}
                    value={result[f.name]}
                    onChange={(event) => handleChange(f, event)}
                    error={error[f.name]}
                    key={i}
                />
            ))}

            <button
                className="btn btn-primary btn-submit"
                onClick={handleSubmit}
            >
                Submit
            </button>
        </form>
    );
};

const InputGroup = ({
    name,
    type,
    label,
    placeholder,
    value,
    onChange,
    error,
}) => {
    return (
        <div className="form-group generic-input-group">
            <label htmlFor={name} style={{ fontSize: "24px" }}>
                {label}
            </label>
            <input
                type={type || "text"}
                name={name}
                className="form-control"
                placeholder={placeholder != null ? placeholder : ""}
                value={value}
                onChange={onChange}
                onBlur={onChange}
            />
            {error ? <small className="text-danger">{error}</small> : <></>}
        </div>
    );
};

export default GenericForm;

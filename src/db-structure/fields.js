const FIELDS = [
    {
        // column name of underlying database
        colName: "firstName",
        // column header for table
        colTitle: "First Name",
        // form label (above input box)
        formLabel: "First Name:",
        // form input box type, can be omitted (text is default)
        type: "text",
        // form input box placeholder, can be omitted (no default)
        placeholder: "Enter first name",
        // form input box error checking, can be omitted (false is default)
        isRequired: true,
        // sorts table values, can be omitted (no default)
        comparator: (a, b) => b.localeCompare(a),
        // formats table values, can be omitted (no default)
        formatter: (value) => value,
        // additional form validation, can be omitted (no default)
        isValid: (value) => ({ valid: true, message: "" }),
    },

    {
        colName: "lastName",
        colTitle: "Last Name",
        formLabel: "Last Name:",
        type: "text",
        placeholder: "Enter last name",
        isRequired: true,
        comparator: (a, b) => b.localeCompare(a),
    },

    {
        colName: "startDate",
        colTitle: "Start Date",
        formLabel: "Start Date:",
        type: "date",
        isRequired: true,
        formatter: (value) => {
            const d = new Date(value);
            return d.toLocaleDateString("en-US", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
            });
        },
        comparator: (a, b) => {
            const dA = Date.parse(a, "yyyy-MM-dd");
            const dB = Date.parse(b, "yyyy-MM-dd");
            return dA > dB ? 1 : dA < dB ? -1 : 0;
        },
        isValid: (value) => {
            const d = Date.parse(value, "MM-dd-yyyy");
            const now = new Date();
            if (d > now) {
                return {
                    valid: false,
                    message:
                        "Start date must be on or before " +
                        now.toLocaleDateString(),
                };
            } else {
                return { valid: true, message: "" };
            }
        },
    },

    {
        colName: "track",
        colTitle: "Track",
        formLabel: "Technology Track:",
        type: "text",
        placeholder: "Enter track",
        isRequired: true,
    },

    {
        colName: "email",
        colTitle: "Email",
        formLabel: "Email Address:",
        type: "text",
        placeholder: "Enter email",
        isRequired: true,
        isValid: (value) => {
            if (!/^(\w+\.)*\w+@(\w+\.)+\w+$/.test(value)) {
                return { valid: false, message: "Invalid email address." };
            } else {
                return { valid: true, message: "" };
            }
        },
    },

    {
        colName: "phone",
        colTitle: "Phone",
        formLabel: "Phone Number:",
        type: "text",
        placeholder: "Enter phone number",
        isRequired: true,
        rejectChange: (value) => {
            if (/\D/.test(value)) {
                return true;
            } else {
                return false;
            }
        },
    },
];

export default FIELDS;

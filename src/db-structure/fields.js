const FIELDS = [
    {
        colName: "firstName",
        colTitle: "First Name",
        formLabel: "First Name:",
        type: "text",
        placeholder: "Enter first name",
        isRequired: true,
    },

    {
        colName: "lastName",
        colTitle: "Last Name",
        formLabel: "Last Name:",
        type: "text",
        placeholder: "Enter last name",
        isRequired: true,
    },

    {
        colName: "startDate",
        colTitle: "Start Date",
        formLabel: "Start Date:",
        type: "date",
        isRequired: true,
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

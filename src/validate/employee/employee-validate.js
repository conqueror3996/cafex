export default {
    employeeName: {
        validations: {
            required: { value: true, message: "S02003" }
        }
    },
    mailAddress: {
        validations: {
            required: { value: false },
            type: { value: "EmailHalfWidth", message: "S02009" },
            type2: { value: "Email", message: "S02015" }
        },
    },
    branchNumber: {
        validations: {
            required: { value: true, message: "S02012"},
        }
    },
    resetPassword: {
        validations: {
            required: { value: false, message: "S02001" },
            type: { value: "Password", message: "S02001" }
        }
    },
    confirmPassword: {
        validations: {
            required: { value: false, message: "S02001" },
        }
    }
}
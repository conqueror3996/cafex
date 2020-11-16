export default {
    employeeName: {
        validations: {
            required: { value: true, message: "S02003" }
        }
    },
    mailAddress: {
        validations: {
            required: { value: false },
            type: { value: "Email", message: "S02009" },
        },
    },
    // namekana: {
    //     validations: {
    //         required: { value: true, message: "S02004" },
    //         type: { value: "KanaFull", message: "S02005" },
    //     },
    // },
    // postalcode: {
    //     validations: {
    //         required: { value: false },
    //         type: { value: "NumberHalfWidth", message: "S02010" },
    //     },
    // },
    branchNumber: {
        validations: {
            required: { value: true, message: "S02012"},
        }
    },
    loginPassword: {
        validations: {
            required: { value: false, message: "S02001" },
            type: { value: "Password", message: "S02001" }
        }
    }
}
export default {
    fullname: {
        validations: {
            required: { value: true, message: "S02003" }
        }
    },
    namekana: {
        validations: {
            required: { value: true, message: "S02004" },
            type: { value: "KanaFull", message: "S02005" },
        },
    },
    postalcode: {
        validations: {
            required: { value: false },
            type: { value: "NumberHalfWidth", message: "S02010" },
        },
    },
    affiliation: {
        validations: {
            required: { value: true, message: "S02012"},
        }
    },
    password: {
        validations: {
            required: { value: true, message: "S02001" },
            type: { value: "Password", message: "S02001" }
        }
    }
}
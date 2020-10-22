import { required, alphaNum } from 'vuelidate/lib/validators'

const userValidate = {
    fullname: {
        validations: { required },
    },
    name_kana: {
        validations: { required },
    },
    birthday: {
        validations: { required },
    },
    phone11: {
        validations: { required, alphaNum },
    },
    phone12: {
        validations: { required, alphaNum },
    },
    phone13: {
        validations: { required, alphaNum },
    },
}

export default userValidate;
export default  {
  fullname: {
    validations: {
      required: { value: true, message: "S02003" },
    },
  },
  namekana: {
    validations: {
      required: { value: true, message: "S02004" },
      type: { value: "KanaFull", message: "S02005" },
    },
  },
  birthday: {
    validations: {
      required: { value: false },
      type: { value: "Date", message: "S02006" },
    },
  },
  phone1: {
    validations: {
      required: { value: true, message: "S02007" },
      type: { value: "NumberHalfWidth", message: "S02008" },
    },
  },
  phone2: {
    validations: {
      required: { value: false },
      type: { value: "NumberHalfWidth", message: "S02008" },
    },
  },
  email: {
    validations: {
      required: { value: false },
      type: { value: "Email", message: "S02009" },
    },
  },
  postalcode: {
    validations: {
      required: { value: false },
      type: { value: "NumberHalfWidth", message: "S02010" },
    },
  }
};

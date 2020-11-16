export default  {
  consumerName: {
    validations: {
      required: { value: true, message: "S02003" },
    },
  },
  consumerNameKana: {
    validations: {
      required: { value: true, message: "S02004" },
      type: { value: "KanaFull", message: "S02005" },
    },
  },
  birthdate: {
    validations: {
      required: { value: false },
      type: { value: "Date", message: "S02006" },
    },
  },
  phoneNumber1: {
    validations: {
      required: { value: true, message: "S02007" },
      type: { value: "NumberHalfWidth", message: "S02008" },
    },
  },
  phoneNumber2: {
    validations: {
      required: { value: false },
      type: { value: "NumberHalfWidth", message: "S02008" },
    },
  },
  mailAddress: {
    validations: {
      required: { value: false },
      type: { value: "EmailHalfWidth", message: "S02009" },
      type2: { value: "Email", message: "S02015" }
    },
  },
  postalCode: {
    validations: {
      required: { value: false },
      type: { value: "NumberHalfWidth", message: "S02010" },
    },
  }
};

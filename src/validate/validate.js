import validator from "validator";
import messagePattern from './errormessage.js';
import common from './common.js';

function validateInput(validatePattern, validateObject) {

  let error = [];
  Object.keys(validatePattern).forEach((elementName) => {
    const item = validatePattern[elementName];
    
    if (!item.hasOwnProperty("validations")) return;

    const condition = Object.keys(item.validations);
    let errorElementString = [];
    let blankValue = false;
    
    condition.forEach((rule) => {
      if(blankValue) return;
      
      switch (rule) {
        case "required":
          if (item.validations[rule].value === true) {
            // not exists property
            if (!validateObject.hasOwnProperty(elementName)) {
              errorElementString.push(item.validations[rule].message);
              blankValue = true;
              break;
            }
            
            // is empty
            if ( validator.isEmpty(validateObject[elementName])){
              blankValue = true;
              errorElementString.push(item.validations[rule].message);
            }
          } else {
            // not exists property
            if (!validateObject.hasOwnProperty(elementName)) {
              blankValue = true;
              break;
            }

            if ( validator.isEmpty(validateObject[elementName]))
              blankValue = true;
          }
          break;

        case "type":
          if (!checkType(validateObject[elementName], item.validations[rule].value))
            errorElementString.push(item.validations[rule].message);
          break;

        case "maxlength":
          if (
            !validator.isLength(validateObject[elementName], {
              max: item.validations[rule].value,
            })
          )
            errorElementString.push(item.validations[rule].message);
          break;

        default:
          break;
      }
    })

    if (errorElementString.length > 0) {
      error.push({ [elementName]: errorElementString.join(",") });
      return;
    }
  });
  
  return error;
}

function checkType(value, type) {
  switch (type) {
    case "Date":
      return common.isDate(value);

    case "Alphanum":
      return validator.isAlphanumeric(value);

    case "FullWidth":
      return !validator.isHalfWidth(value);

    case "HalfWidth":
      return !validator.isFullWidth(value);

    case "KanaFull":
      return common.isKanaFull(value);

    case "Kanahalf":
      return common.isKanaHalf(value);

    case "AlphaFullWidth":
      if (validator.isHalfWidth(value))
        return false;
      return validator.isAlpha(value);

    case "AlphaHalfWidth":
      if (validator.isFullWidth(value))
        return false;
      return validator.isAlpha(value);

    case "AlphanumFullWidth":
      if (validator.isHalfWidth(value))
        return false;
      return validator.isAlphanumeric(value);

    case "AlphanumHalfWidth":
      if (validator.isFullWidth(value))
        return false;
      return validator.isAlphanumeric(value);

    case "Number":
      return validator.isNumeric(value);

    case "NumberFullWidth":
      if (validator.isHalfWidth(value))
        return false;
      return validator.isNumeric(value);

    case "NumberHalfWidth":
      if (validator.isFullWidth(value))
        return false;
      return validator.isNumeric(value);

    case "Email":
      if (validator.isFullWidth(value.replace("@",'')))
        return false
      return validator.isEmail(value);

    case "Password":
      return common.isPassword(value);

    default:
      break;
  }
}

function getArrayMessageError(arrayCode) {
  let errorMessage = [];
  arrayCode.forEach((item) => {
    let codes = Object.values(item)[0];
    codes.split(',').forEach((code) => {
      errorMessage.push(getMessageErrorFromCode(code));
    });
  })

  return errorMessage;
}

function getMessageErrorFromCode(code) {
  return messagePattern[code];
}


export default {
  validateInput,
  getMessageErrorFromCode,
  getArrayMessageError
};

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
    
    console.log(elementName);
    condition.forEach((rule) => {
      if(blankValue) return;
      
    console.log(rule);
      switch (rule) {
        case "required":
          if (item.validations[rule].value === true) {
            // not exists property
            if (!validateObject.hasOwnProperty(elementName)) {
              errorElementString.push(item.validations[rule].message);
              break;
            }
            
            // is empty
            if ( validator.isEmpty(validateObject[elementName]))
              errorElementString.push(item.validations[rule].message);
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
      return validator.isFullWidth(value);

    case "HalfWidth":
      return validator.isHalfWidth(value);

    case "KanaFull":
      return common.isKanaFull(value);

    case "Kanahalf":
      return common.isKanaHalf(value);

    case "AlphaFullWidth":
      if (validator.isAlpha(value))
      {
        return validator.isFullWidth(value);
      }
      return false;

    case "AlphaHalfWidth":
      if (validator.isAlpha(value))
      {
        return validator.isHalfWidth(value);
      }
      return false;

    case "AlphanumFullWidth":
      if (validator.isAlphanumeric(value))
      {
        return validator.isFullWidth(value);
      }
      return false;

    case "AlphanumHalfWidth":
      if (validator.isAlphanumeric(value))
      {
        return validator.isHalfWidth(value);
      }
      return false;

    case "Number":
      return validator.isNumeric(value);

    case "NumberFullWidth":
      if (validator.isNumeric(value))
      {
        return validator.isFullWidth(value);
      }
      return false;

    case "NumberHalfWidth":
      if (validator.isNumeric(value))
      {
        return validator.isHalfWidth(value);
      }
      return false;

    case "Email":
      return validator.isEmail(value);

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

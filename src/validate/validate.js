import userValidate from './user/user-validate.js';
import * as Validators from 'vuelidate/lib/validators'

function validateInput() {
        Object.keys(userValidate).reduce((rules, elementName) => {
           const item = userValidate[elementName]
           if (!item.hasOwnProperty('validations')) return rules
            
           const validations = {}
           for (let rule in item.validations) {
               
            const params = item.validations[rule].params
            
           console.log("Validators[rule]");
           console.log(Validators[rule]);
             if (params) {
               validations[rule] = Validators[rule](params)
             } else {
               validations[rule] = Validators[rule]
             }
           }
           rules[elementName] = validations
           return rules
        }, {})
}

export default validateInput;
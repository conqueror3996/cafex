import { commonFunctions } from '../common'

export class Consumer {
    consumerName = '';
    consumerNameKana = '';
    birthdate = '';
    phoneNumber1 = '';
    phoneNumber2 = '';
    mailAddress = '';
    postalCode = '';
    address = '';
    consumerMemo = '';

    constructor() {
    }

    setItem(input) {
        this.consumerName = input.consumerName;
        this.consumerNameKana = input.consumerNameKana;
        this.birthdate = commonFunctions.formatDate(input.birthdate);
        this.phoneNumber1 = input.phoneNumber1;
        this.phoneNumber2 = input.phoneNumber2;
        this.mailAddress = input.mailAddress;
        this.postalCode = input.postalCode;
        this.address = input.address;
        this.consumerMemo = input.consumerMemo;
    }

    
}
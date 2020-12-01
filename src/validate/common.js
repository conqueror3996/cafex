import moment from 'moment';

function isHiraFull(value) {
    return /^[ぁ-ん]+$/.test(value);
}

function isKanaFull(value) {
    return /^([ァ-ン]|ー)+$/.test(value);
}

function isKanaHalf(value) {
    return /^[ｧ-ﾝﾞﾟ]+$/.test(value);
}

function isDate(value) {
    const reg = new RegExp("^([0-9][0-9][0-9][0-9])[-/](0?[1-9]|1[0-2])[-/](0?[1-9]|[12][0-9]|3[01])$");

    return reg.test(moment(value).format('yyyy/MM/DD'))
}

function rangeDate(value) {
    var minDate = moment('1900/01/01')
    var today = moment()
    return moment(value) >= minDate && moment(value) <= today;
}

function isEmail(value) {
    return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value);
}

function isPassword(value) {
    let count = 0;
    if(value.length >= 8 && value.length <= 20) {
        if(value.match(".*\\d.*"))  count++;
        if(value.match(".*[a-z].*")) count++;
        if(value.match(".*[!#%&'\/=~`*+?{}^$|\-].*")) count++;
    }
    return count === 3

    // console.log(value);
    // const reg = new RegExp("^(?:(?:(?=.*[0-9])(?=.*[a-z])) |(?:(?=.*[a-z])(?=.*[!#%&'\/=~`*+?{}^$\-|])) |(?:(?=.*[0-9])(?=.*[!#%&'\/=~`*+?{}^$\-|])) |(?:(?=.*[0-9])(?=.*[a-z])(?=.*[!#%&'\/=~`*+?{}^$\-|]))).{8,32}$");
    // console.log(reg.test(value));
    // return reg.test(value);
}

export default {
    isHiraFull,
    isKanaFull,
    isKanaHalf,
    isDate,
    isPassword,
    isEmail,
    rangeDate
}
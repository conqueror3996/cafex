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
    const reg = new RegExp("((?:19|20)\\d\\d)/(0?[1-9]|1[012])/([12][0-9]|3[01]|0?[1-9])");

    return reg.test(value);
}

export default {
    isHiraFull,
    isKanaFull,
    isKanaHalf,
    isDate
}
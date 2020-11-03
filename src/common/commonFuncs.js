import moment from 'moment';

export const commonFunctions = {
    formatDate
}

function formatDate(input) {

    return moment(input).format('yyyy/MM/DD');
}
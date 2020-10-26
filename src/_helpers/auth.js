import axios from "axios";
import moment from 'moment';
import decode from 'jwt-decode';


const AUTH_TOKEN_KEY = 'authToken';

export const auth = {
    sendRequest,
    setAuthToken,
    getAuthToken,
    clearAuthToken,
    isLoggedIn,
    getUserInfo,
    getTokenExpirationDate,

}

function sendRequest(method, url, requestData, inputHeader = {}) {
    var headers =  { 
        ...inputHeader,
        'User-Agent' : '',
        'X-API-Key' : '',
        'X-CX-Date' : formatDateTime(new Date()),
        'X-CX-Channel' : '0',
        'X-CX-Client-Version' : '1.0.0',
        'X-CX-Interaction-Id' : ''
    };
    
    const requestOptions = {
        method,
        url,
        requestData,
        headers
    };
    return axios(requestOptions)
}


function setAuthToken(token) {
    axios.defaults.headers.common['Cookie'] = `${token}`
    localStorage.setItem(AUTH_TOKEN_KEY, token)
}

function getAuthToken() {
    return localStorage.getItem(AUTH_TOKEN_KEY)    
}

function clearAuthToken() {
    axios.defaults.headers.common['Cookie'] = ''
    localStorage.removeItem(AUTH_TOKEN_KEY)
}

function isLoggedIn() {
    let authToken = getAuthToken()
    return !!authToken && !isTokenExpired(authToken)
}

function getUserInfo() {
    if (isLoggedIn()) {
        return decode(getAuthToken())
    }
}

function getTokenExpirationDate(encodedToken) {
    let token = decode(encodedToken)
    if (!token.exp) {
        return null
    }
  
    let date = new Date(0)
    date.setUTCSeconds(token.exp)
  
    return date
}
  
function isTokenExpired(token) {
    let expirationDate = getTokenExpirationDate(token)
    return expirationDate < new Date()
}

function convertDatetimeToMilliseconds(dateTime){
    const dateString = dateTime;
    const changedDate = dateString.replace(/(..)\/(..)\/(....) (..):(..)/, '$3-$2-$1 $4:$5');
    var date = new Date(changedDate);
    return date.getTime();
} 

function formatDateTime(value, strFormat = 'YYYYMMDDhhmmss'){
    if(value){
        return moment(String(value)).format(strFormat);
    }
}
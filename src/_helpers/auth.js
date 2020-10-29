import axios from "axios";
import moment from 'moment';
import config from 'config';

const AUTH_TOKEN_KEY = 'CXSESSIONID';
axios.defaults.baseURL = 'https://api.cafex.kinsol-bit.com';
axios.defaults.withCredentials = true;
export const auth = {
    sendRequest,
    setAuthToken,
    getAuthToken,
    clearAuthToken,
    isLoggedIn,
    getUserInfo,
    getTokenExpirationDate,
    sendRequestForm
}

function sendRequestForm(method, url, requestData, inputHeader = {}) {
    
    var headers =  { 
        ...inputHeader,
        'User-Agent' : '',
        'X-API-Key' : config.API_KEY,
        'X-CX-Date' : formatDateTime(new Date()),
        'X-CX-Channel' : '0',
        'X-CX-Client-Version' : config.VERSION,
        'X-CX-Interaction-Id' : formatDateTime(new Date()),
    };
    const requestOptions = {
        method,
        url,
        data: requestData,
        headers
    };
    
    return axios.request(requestOptions)
}

function sendRequest(method, url, requestData, inputHeader = {}) {
    var headers =  { 
        ...inputHeader,
        'User-Agent' : '',
        'X-API-Key' : config.API_KEY,
        'X-CX-Date' : formatDateTime(new Date()),
        'X-CX-Channel' : '0',
        'X-CX-Client-Version' : config.VERSION,
        'X-CX-Interaction-Id' : formatDateTime(new Date())
    };
    const requestOptions = {
        method,
        url,
        body: requestData,
        headers
    };
    return axios.request(requestOptions)
}

function setAuthToken(token) {
    document.cookie = token;
}

function getAuthToken() {  
    return document.cookie['CXSESSIONID'];  
}

function clearAuthToken() {
    document.cookie = "CXSESSIONID=; Path=/; HttpOnly; Secure";
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
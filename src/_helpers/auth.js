import axios from "axios";
import moment from 'moment';
import config from 'config';
import { router } from './router';

const AUTH_TOKEN_KEY = 'authToken';
axios.defaults.baseURL = config.apiUrl;
// axios.defaults.baseURL = 'http://192.168.11.127:1323';
axios.defaults.withCredentials = true;
// Add a response interceptor
axios.interceptors.response.use((response) => {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  }, (err) => {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    if (err.response) {
        const { status, data } = err.response
        
        if(status === 401) {
            auth.clearAuthToken();
            router.push('/WA01010100')
        }
        
        if(status === 422) {
            router.push('/WA01010200')
        }
    }
    return Promise.reject(err);
  });
  
export const auth = {
    sendRequest,
    setAuthToken,
    getAuthToken,
    clearAuthToken,
    isLoggedIn,
    getUserInfo,
    getTokenExpirationDate,
    sendRequestForm,
    sendRequestParams,
    formatDateTime,
    formatPhoneNumber
}

function sendRequestForm(method, url, requestData, inputHeader = {}) {
    var headers =  { 
        ...inputHeader,
        'User-Agent' : navigator.userAgent,
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
    
    return axios.post(url, requestData, { headers })
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
        url,
        method,
        data: requestData,
        headers
    };

    return axios.request(requestOptions)
}

function sendRequestParams(method, url, requestData, inputHeader = {}) {
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
        params: requestData,
        headers
    };
    return axios.request(requestOptions)
}

function setAuthToken(token) {
    localStorage.setItem(AUTH_TOKEN_KEY, token);
}

function getAuthToken() {  
    return localStorage.getItem(AUTH_TOKEN_KEY);
}

function clearAuthToken() {
    document.cookie = "CXSESSIONID=; Path=/; HttpOnly; Secure";
    localStorage.clear();
}

function isLoggedIn() {
    let authToken = getAuthToken()
    if (authToken) {
        if (authToken.employeeId === '') {
            return false
        }
        return true
    }
    return false
    // return !!authToken && !isTokenExpired(authToken)
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

function formatPhoneNumber(value){
    var x = value.replace(/\D/g, '').match(/(\d{0,3})(\d{0,4})(\d{0,3})/);
    return !x[2] ? x[1] : x[1] + '-' + x[2] + '-' + x[3];
}
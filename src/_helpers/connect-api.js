import axios from "axios";
import config from 'config';

export const connectAPI = {
    sendRequest,
    login,
    setToken,
    getToken
}


function sendRequest(method, url, requestData = null, headers = null) {
    
    const requestOptions = {
        method,
        url: `${config.apiUrl}${url}`,
        requestData,
        headers
    };
    return axios(requestOptions)
}

function login(method, url, requestData = null, headers = null) {

    return sendRequest(method, url, requestData, headers)
}

function setToken(params) {
    localStorage.setItem('access_token', JSON.stringify(params.access_token));
    localStorage.setItem('expires', JSON.stringify(params.expires));
}

function getToken() {
    const token = localStorage.getItem('access_token');
    if (token || token !== '0') {
        return true
    }
    return false
}
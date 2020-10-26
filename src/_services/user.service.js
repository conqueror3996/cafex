import config from 'config';
import { authHeader, connectAPI, allAPI } from '../_helpers';

export const userService = {
    login,
    logout,
    register,
    getAll,
    getById,
    update,
    delete: _delete,
    changePassword
};

function login(username, password) {
    let body =  JSON.stringify({ username, password })
    let headers = { 'Content-Type': 'application/x-www-form-urlencoded' }
    return connectAPI.sendRequest('POST', allAPI.employee_login, body, headers)
}

function logout() {
    // remove user from local storage to log user out
    connectAPI.clearAuthToken();
}

function register(user) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
    };

    return fetch(`${config.apiUrl}/users/register`, requestOptions).then(handleResponse);
}

// function getAll() {
//     // const requestOptions = {
//     //     method: 'GET',
//     //     // headers: authHeader()
//     // };
//     // return fetch(`${config.apiUrl}/v1/consumers`, requestOptions).then(handleResponse);

//     const requestOptions = {
//         method: 'GET',
//         url: `${config.apiUrl}/api/index`,
//         data: JSON.stringify(data),
//         headers: {
//             'Content-Type': 'application/json; charset=UTF-8',
//          }
//       }
//     return Axios(requestOptions).then(handleResponse)

// }
function getAll() {
    // const requestOptions = {
    //     method: 'get',
    //     url: `${config.apiUrl}/v1/consumers`,
    // };
    // return Axios(requestOptions);
    // headers = {
    //     Cookie: 
    // }
    return connectAPI.sendRequest('GET', `${config.apiUrl}/v1/consumers`,null, null)
}


function getById(id) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(`${config.apiUrl}/users/${id}`, requestOptions).then(handleResponse);
}

function update(user) {
    const requestOptions = {
        method: 'PUT',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
    };

    return fetch(`${config.apiUrl}/users/${user.id}`, requestOptions).then(handleResponse);
}

// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id) {
    const requestOptions = {
        method: 'DELETE',
        headers: authHeader()
    };

    return fetch(`${config.apiUrl}/users/${id}`, requestOptions).then(handleResponse);
}

function changePassword(input) {
    const requestOptions = {
        method: 'PUT',
        headers: authHeader(),
        body: JSON.stringify(input)
    }

    return fetch(`${config.apiUrl}/v1/agent/change-password`, requestOptions).then(handleResponse);
}

function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        console.log(data)
        // console.log(text)
        if (!response.ok) {
            if (response.status === 401) {
                // auto logout if 401 response returned from api
                logout();
                location.reload(true);
            }

            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }

        return data;
    });
}
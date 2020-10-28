import config from 'config';
import { authHeader, auth, allAPI } from '../_helpers';

export const consumerService = {
    register,
    getAll,
    getConsumerById,
    postConsumer,
    update,
    delete: _delete,
};


function register(user) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
    };

    return fetch(`${config.apiUrl}/users/register`, requestOptions).then(handleResponse);
}

function getAll(input) {

    return auth.sendRequest('GET', allAPI.get_consumers, input, null)
}


function getConsumerById(id) {
    
    return auth.sendRequest('GET', allAPI.get_consumers_by_id(id), null, null)
}

function postConsumer(input) {
    
    return auth.sendRequest('POST', allAPI.post_consumers_info, input, {'Content-Type': 'application/json'})
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
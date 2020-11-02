import config from 'config';
import { authHeader, auth, allAPI } from '../_helpers';

export const consumerService = {
    register,
    getAll,
    getConsumerById,
    addConsumer,
    updateConsumer,
    deleteConsumer,
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
    let headers = { 'Content-Type': 'application/x-www-form-urlencoded' }

    return auth.sendRequestParams('GET', allAPI.get_consumers, input, headers)
}


function getConsumerById(id) {
    
    return auth.sendRequest('GET', allAPI.get_consumers_by_id(id), null, null)
}

function addConsumer(input) {
    
    return auth.sendRequest('POST', allAPI.post_consumers_info, input, {'Content-Type': 'application/json'})
}

function updateConsumer(id, input) {
    
    return auth.sendRequest('PATCH', allAPI.update_consumers_by_id(id), input, {'Content-Type': 'application/json'})
}

// prefixed function name with underscore because delete is a reserved word in javascript
function deleteConsumer(id,) {

    return auth.sendRequest('DELETE', allAPI.delete_consumers_by_id(id), null, null)
}

// function handleResponse(response) {
//     return response.text().then(text => {
//         const data = text && JSON.parse(text);
//         if (!response.ok) {
//             if (response.status === 401) {
//                 // auto logout if 401 response returned from api
//                 logout();
//                 location.reload(true);
//             }

//             const error = (data && data.message) || response.statusText;
//             return Promise.reject(error);
//         }

//         return data;
//     });
// }
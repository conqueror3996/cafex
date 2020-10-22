import config from 'config';
import { authHeader } from '../_helpers';
import Axios from "axios";

export const fileService = {
    // register,
    getFilesByUserId,
    // getById,
    // update,
    // delete: _delete,
};

function getFilesByUserId(user_id) {
    const data = { user_id }
    // const headers = new Headers({
    //     'Accept': 'application/json',
    //     'Access-Control-Allow-Credentials':true,
    //     'Access-Control-Allow-Origin':true,
    //     'Content-Type': 'application/json',
    // })
    const requestOptions = {
        method: 'POST',
        url: `${config.apiUrl}/v1/agent/get-files`,
        data: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json; charset=UTF-8',
         }
      }
    return Axios(requestOptions).then(handleResponse)
    // return fetch(`${config.apiUrl}/v1/agent/get-files`, requestOptions).then(handleResponse);
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
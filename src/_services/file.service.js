import config from 'config';
import { authHeader, allAPI, auth } from '../_helpers';
import Axios from "axios";

export const fileService = {
    getFileList,
    addFile,
    deleteFile,
};

function getFileList(fileType) {
    
    return auth.sendRequest('GET', allAPI.get_files(fileType), null, null)
}

function addFile(fileType, input) {
    
    return auth.sendRequest('POST', allAPI.get_files(fileType), input, null)
}

function deleteFile(fileType, fileId) {
    
    return auth.sendRequest('DELETE', allAPI.get_files(fileType, fileId), null, null)
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
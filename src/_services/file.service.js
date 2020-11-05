import config from 'config';
import { authHeader, allAPI, auth } from '../_helpers';
import Axios from "axios";

export const fileService = {
    getFileList,
    addFile,
    deleteFile,
    getFileInternal
};

function getFileList(fileType, params) {

    return auth.sendRequestParams('GET', allAPI.get_files(fileType), params, null)
}

function addFile(fileType, input) {
    let headers = { 'Content-Type': 'multipart/form-data' }
    return auth.sendRequest('POST', allAPI.add_files(fileType), input, headers)
}

function deleteFile(fileType, fileId) {
    
    return auth.sendRequest('DELETE', allAPI.delete_files(fileType, fileId), null, null)
}

function getFileInternal(url) {
    return Axios.get(url, { baseURL: config.apiInternalUrl});
}
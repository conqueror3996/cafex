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
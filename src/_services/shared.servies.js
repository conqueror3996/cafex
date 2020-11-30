import config from 'config';
import { authHeader, auth, allAPI } from '../_helpers';

export const sharedService = {
    getBranches
};

function getBranches() {
    let headers = { 'Content-Type': 'application/x-www-form-urlencoded' }
    return auth.sendRequestParams('GET', allAPI.get_branches, {}, {})
}
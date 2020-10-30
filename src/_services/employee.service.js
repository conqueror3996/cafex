import config from 'config';
import { auth, allAPI } from '../_helpers';

export const employeeService = {
    login,
    logout,
    getEmployeeUserinfo,
    changePassword
};

/** Ap010101_従業員ログインAPI */ 
function login(username, password) {
    const form = new FormData();

    form.append('username', username);
    form.append('password', password);
    form.append('company_id', 'H0000');
    form.append('client_id', config.API_KEY);
    form.append('grant_type', 'password');
    form.append('scope', 'employee');
    
    let headers = { 'Content-Type': 'application/x-www-form-urlencoded' }
    
    return auth.sendRequestForm('POST', allAPI.employee_login, form, headers)
    
}

/** Ap010102_従業員ログアウトAPI */ 
function logout() {
    
    let headers = { 'Content-Type': 'application/x-www-form-urlencoded' }
    return auth.sendRequest('POST', allAPI.employee_login, null, headers)
}

/** Ap010201_従業員パスワード変更API */
function changePassword(input) {
    
    const inputHeader = {
        'Content-Type': 'application/json'
    }
    return auth.sendRequest('POST', allAPI.employee_change_password, input, inputHeader)
}

/** Ap010202_従業員情報取得API */
function getEmployeeUserinfo() {
    return auth.sendRequest('GET', allAPI.get_employee_userinfo, null, {})
}


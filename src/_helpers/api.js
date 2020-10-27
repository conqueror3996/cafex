// const REST_ENDPOINT = 'http://192.168.11.139:1323/';
import config from 'config';

export const allAPI = {
    // Employees
    employee_login: `${config.apiUrl}v1/employee/login`,
    employee_logout: `${config.apiUrl}v1/employee/logout`,
    employee_change_password: `${config.apiUrl}v1/employee/password`,
    get_employee_userinfo: `${config.apiUrl}v1/employee/userinfo`,

    // Consumers
    get_consumers: `${config.apiUrl}v1/consumers`,
    get_consumers_by_id: `${config.apiUrl}v1/consumers/:consumerId`,

    post_consumers_info: `${config.apiUrl}v1/consumers`,
    delete_consumers_by_id: `${config.apiUrl}v1/consumers/:consumerId`,
    update_consumers_by_id: `${config.apiUrl}v1/consumers/:consumerId`,

    //Files
    get_files: `${config.apiUrl}v1/files/:fileType`,
}
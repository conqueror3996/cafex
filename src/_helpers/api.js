const REST_ENDPOINT = 'http://192.168.11.139:1323/';

export const allAPI = {
    // Employees
    employee_login: `${REST_ENDPOINT}v1/employee/login`,
    employee_logout: `${REST_ENDPOINT}v1/employee/logout`,
    employee_change_password: `${REST_ENDPOINT}v1/employee/password`,
    get_employee_userinfo: `${REST_ENDPOINT}v1/employee/userinfo`,

    // Consumers
    get_consumers: `${REST_ENDPOINT}v1/consumers`,
    get_consumers_by_id: `${REST_ENDPOINT}v1/consumers/:consumerId`,

    post_consumers_info: `${REST_ENDPOINT}v1/consumers`,
    delete_consumers_by_id: `${REST_ENDPOINT}v1/consumers/:consumerId`,
    update_consumers_by_id: `${REST_ENDPOINT}v1/consumers/:consumerId`,

    //Files
    get_files: `${REST_ENDPOINT}v1/files/:fileType`,
}

const 
export const allAPI = {
    // Employees
    employee_login: `/v1/employee/login`,
    employee_logout: `/v1/employee/logout`,
    employee_change_password: `/v1/employee/password`,
    get_employee_userinfo: `/v1/employee/userinfo`,

    // Consumers
    get_consumers: `/v1/consumers`,
    get_consumers_by_id: `/v1/consumers/:consumerId`,

    post_consumers_info: `/v1/consumers`,
    delete_consumers_by_id: `/v1/consumers/:consumerId`,
    update_consumers_by_id: `/v1/consumers/:consumerId`,

    //Files
    get_files: `/v1/files/:fileType`,
}
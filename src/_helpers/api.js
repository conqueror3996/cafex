export const allAPI = {
    // Employees
    employee_login: `v1/employee/login`, // Ap010101_従業員ログインAPI
    employee_logout: `v1/employee/logout`, // Ap010102_従業員ログアウトAPI
    employee_change_password: `v1/employee/password`, // Ap010201_従業員パスワード変更API
    get_employee_userinfo: `v1/employee/userinfo`, // Ap010202_従業員情報取得API
    get_employees: `/v1/employees`, // Ap010501_従業員一覧取得API
    get_employee_by_id: (employeeId) => `/v1/employees/${employeeId}`,
    register_employees: `v1/employees/csv`, // ... 

    // Consumers
    get_consumers: `v1/consumers`, // Ap010301_顧客一覧取得API
    get_consumers_by_id: (consumerId) => `v1/consumers/${consumerId}`, // Ap010302_顧客取得API

    post_consumers_info: `v1/consumers`, // Ap010303_顧客登録API
    delete_consumers_by_id: (consumerId) => `v1/consumers/${consumerId}`, // Ap010304_顧客削除API
    update_consumers_by_id: (consumerId) => `v1/consumers/${consumerId}`, // Ap010305_顧客更新API

    //Files
    get_files: (fileType) => `v1/files/${fileType}`, // Ap010401_ファイル一覧覧取得API
    add_files: (fileType) => `v1/files/${fileType}`, // Ap010402_ファイル登録API
    delete_files: (fileType, fileId) => `v1/files/${fileType}/${fileId}`, // Ap010403_ファイル削除API
    
}
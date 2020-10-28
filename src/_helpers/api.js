const REST_ENDPOINT = 'https://api.cafex.kinsol-bit.com/';


export const allAPI = {
    // Employees
    employee_login: `${REST_ENDPOINT}v1/employee/login`, // Ap010101_従業員ログインAPI
    employee_logout: `${REST_ENDPOINT}v1/employee/logout`, // Ap010102_従業員ログアウトAPI
    employee_change_password: `${REST_ENDPOINT}v1/employee/password`, // Ap010201_従業員パスワード変更API
    get_employee_userinfo: `${REST_ENDPOINT}v1/employee/userinfo`, // Ap010202_従業員情報取得API

    // Consumers
    get_consumers: `${REST_ENDPOINT}v1/consumers`, // Ap010301_顧客一覧取得API
    get_consumers_by_id: (consumerId) => `${REST_ENDPOINT}v1/consumers/${consumerId}`, // Ap010302_顧客取得API

    post_consumers_info: `${REST_ENDPOINT}v1/consumers`, // Ap010303_顧客登録API
    delete_consumers_by_id: `${REST_ENDPOINT}v1/consumers/:consumerId`, // Ap010304_顧客削除API
    update_consumers_by_id: `${REST_ENDPOINT}v1/consumers/:consumerId`, // Ap010305_顧客更新API

    //Files
    get_files: `${REST_ENDPOINT}v1/files/:fileType`, // Ap010401_ファイル一覧覧取得API
}
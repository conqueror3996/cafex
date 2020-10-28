import { employeeService } from '../_services';
import { router } from '../_helpers';

const employee = JSON.parse(localStorage.getItem('user'));
const state = employee
    ? { status: { loggedIn: true }, employee, err: '' }
    : { status: {}, employee: null, err: '' };

const actions = {
    login({ dispatch, commit }, { username, password }) {
        commit('loginRequest', { username });
    
        employeeService.login(username, password)
            .then(
                info => {
                    console.log(document.cookie)
                    if (info.data) {
                        if (info.data.code) {
                            dispatch('alert/error', info.data.code, { root: true });
                            commit('loginFailure', info)
                        } else {
                            commit('loginSuccess', info)
                            // router.push('/WA01010300');
                        }
                    }
                }
            );
        
    },
    logout({ commit }) {
        employeeService.logout().then((info) => {
            if (info.data.code) {
                dispatch('alert/error', info.data.code, { root: true });
                // commit('getAllFailure', info)
            } else {
                commit('logout');
                auth.clearAuthToken();
            }
            // remove user from local storage to log user out
        });
    },
    register({ dispatch, commit }, employee) {
        commit('registerRequest', employee);
    
        employeeService.register(employee)
            .then(
                employee => {
                    commit('registerSuccess', employee);
                    router.push('/WA01010100');
                    setTimeout(() => {
                        // display success message after route change completes
                        dispatch('alert/success', 'Registration successful', { root: true });
                    })
                },
                error => {
                    commit('registerFailure', error);
                    dispatch('alert/error', error, { root: true });
                }
            );
    },
    changePassword({commit}, input) {
        
        employeeService.changePassword(input).then(
            info => {
                if (info.data) {
                    if (info.data.code) {
                        dispatch('alert/error', info.data.code, { root: true });
                        commit('changePasswordFailed', info.data);
                        dispatch('alert/error', info.data.code, { root: true });
                    } else {
                        // commit('changePasswordSuccess', employee);
                        router.push('/WA01010201');
                        // Xóa hết dữ liệu
                        setTimeout(() => {
                            // display success message after route change completes
                            dispatch('alert/success', 'Change Password successful', { root: true });
                        })
                    }
                }
                
            },
            error => {
                commit('changePasswordFailed', error);
                dispatch('alert/error', error, { root: true });
            }
        );

    }
};

const mutations = {
    loginRequest(state, employee) {
        state.status = { loggingIn: true };
        state.employee = employee;
    },
    loginSuccess(state, employee) {
        state.status = { loggedIn: true };
        state.employee = employee;
    },
    loginFailure(state, error) {
        state.status = {};
        state.employee = null;
        state.err = error;
    },
    logout(state) {
        state.status = {};
        state.employee = null;
    },
    registerRequest(state, employee) {
        state.status = { registering: true };
    },
    registerSuccess(state, employee) {
        state.status = {};
    },
    registerFailure(state, error) {
        state.status = {};
    }
    // changePasswordSuccess(state) {

    // }
};

export const employees = {
    namespaced: true,
    state,
    actions,
    mutations
};
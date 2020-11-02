import { employeeService } from '../_services';
import { auth, router } from '../_helpers';


const state = { status: {}, employee: null, err: '' };
const actions = {
    login({ dispatch, commit }, { username, password }) {
        commit('loginRequest', { username });
        employeeService.login(username, password)
            .then(
                info => {
                    if (info) {
                        if (info.error) {
                            dispatch('alert/error', info.error.code, { root: true });
                            commit('loginFailure', info.error);
                        } else {
                            dispatch('alert/success', info.status + " Login Success", { root: true });
                            commit('loginSuccess', info);
                            dispatch("userInfo").then(() => {
                                console.log("into user info", state.employee)
                                if (state.employee.rollCode === '23') {
                                    router.push('/WA01020300')
                                } else {
                                    router.push('/WA01010300')
                                }
                            })
                        }
                    }
                }
            );
        
    },
    logout({ commit }) {
        employeeService.logout().then((info) => {
            if (info.status !== 200) {
                dispatch('alert/error', info.statusText, { root: true });
            } else {
                console.log(info)
                auth.clearAuthToken();
                commit('logout');
            }
            // remove user from local storage to log user out
        });
    },
    changePassword({commit, dispatch}, input) {
        employeeService.changePassword(input).then(
            info => {
                if (info) {
                    if (info.error) {
                        dispatch('alert/error', info.error.code, { root: true });
                        commit('changePasswordFailed', info.error);
                    } else {
                        router.push('/WA01010201');
                    }
                }
            },
            error => {
                commit('changePasswordFailed', error);
                dispatch('alert/error', error, { root: true });
            }
        );

    },
    userInfo({commit, dispatch}){
        return employeeService.getEmployeeUserinfo().then(
            info => {
                if(info){
                    if(info.error){
                        dispatch('alert/error', info.error.code, { root: true });
                        commit('getUserInfoFailed', info.error);
                    }else{
                        console.log('test', info.data)
                        localStorage.setItem('authToken', JSON.stringify(info.data));
                        commit("getUserInfoSuccess", info.data);
                        
                    }
                }
            },
        )
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
    changePasswordFailed(state, error){
        state.status = {};
        state.err = error;
    },
    getUserInfoSuccess(state, employee){
        state.status = {};
        state.employee = employee;
    },
    getUserInfoFailed(state, error){
        state.status = {};
        state.err = error;
    }
};

export const employees = {
    namespaced: true,
    state,
    actions,
    mutations
};
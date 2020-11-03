import { employeeService } from '../_services';
import { auth, router } from '../_helpers';


const state = { status: {}, employee: null, err: '', all: null };
const actions = {
    login({ dispatch, commit }, { username, password }) {
        commit('loginRequest', { username });
        employeeService.login(username, password)
            .then(
                info => {
                    if (info) {
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
            ).catch((err) => {
                if (err.response) {
                    const { data } = err.response
                    
                    dispatch('alert/error', data.error.code, { root: true });
                    commit('loginFailure', data.error);
                }
            });
        
    },
    logout({ commit }) {
        employeeService.logout().then((info) => {
            if (info.status === 200) {
                console.log(info)
                auth.clearAuthToken();
                commit('logout');
            }
            // remove user from local storage to log user out
        }).catch((err) => {
            if (err.response) {
                const { data } = err.response
                dispatch('alert/error', data.error.code, { root: true });
            }
        });
    },
    changePassword({commit, dispatch}, input) {
        employeeService.changePassword(input).then(
            info => {
                if (info) {
                    router.push('/WA01010201');
                    // if (info.error) {
                    //     dispatch('alert/error', info.error.code, { root: true });
                    //     commit('changePasswordFailed', info.error);
                    // } else {
                    // }
                }
            },
            
        ).catch((err) => {
            if (err.response) {
                const { data } = err.response
                commit('changePasswordFailed', data.error);
                dispatch('alert/error', data.error.code, { root: true });
            }
        });

    },
    userInfo({commit, dispatch}){
        return employeeService.getEmployeeUserinfo().then(
            info => {
                if (info) {
                    localStorage.setItem('authToken', JSON.stringify(info.data));
                    commit("getUserInfoSuccess", info.data);
                }
            },
        ).catch((err) => {
            if (err.response) {
                const { status, data } = err.response
                dispatch('alert/error', data.error.code, { root: true });
                commit('getUserInfoFailed', data.error);
                
                // if(status === 401) {
                //     auth.clearAuthToken();
                //     router.push('/WA01010100')
                // }
            }
        })
    },
    getAll({commit, dispatch}, input){
        return employeeService.getAllEmployees(input).then(
            info => {
                if(info){
                    localStorage.setItem('authToken', JSON.stringify(info.data));
                    commit("getAllEmployeesSuccess", info.data);
                }
            },
        ).catch((err) => {
            const { data } = err.response
            dispatch('alert/error', data.error.code, { root: true });
            commit('getUserInfoFailed', data.error);
        })
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
    },
    getAllEmployeesSuccess(state, data){
        state.status = {};
        state.all = data;
    },
};

export const employees = {
    namespaced: true,
    state,
    actions,
    mutations
};
import { employeeService } from '../_services';
import { auth, router } from '../_helpers';


const state = { status: {}, employee: null, err: '', all: null };
const actions = {
    login({ dispatch, commit }, { username, password }) {
        commit('loginRequest', { username });
        employeeService.login(username, password)
            .then(
                info => {
                    // dispatch('alert/success', info.status + " Login Success", { root: true });
                    commit('loginSuccess', info);
                    dispatch("userInfo").then(() => {
                        console.log("into user info", state.employee)
                        // if(state.employee.lastLoginDate === "") {
                        //     router.push('/WA01010200')
                        //     return;
                        // }
                        if (state.employee.rollCode !== '23') {
                            router.push('/WA01020300')
                        } else {
                            router.push('/WA01010300')
                        }
                    })
                }
            ).catch((err) => {
                if (err.response) {
                    const { data } = err.response
                    commit('loginFailure', data.error);
                    if(data.error.status === 422) {
                        return;
                    }else {
                        dispatch('alert/error', data.error.code, { root: true });
                    }
                }
            });
        
    },
    logout({ commit }) {
        employeeService.logout().then((info) => {
            auth.clearAuthToken();
            commit('logout');
            router.push('/WA01010100');
            // remove user from local storage to log user out
        }).catch((err) => {
            if (err.response) {
                const { data } = err.response
                dispatch('alert/error', data.error.code, { root: true });
            }
        });
    },
    changePassword({commit, dispatch}, input) {
        employeeService.changePassword(input).then((info) => {
                router.push('/WA01010201');
                auth.clearAuthToken();
            }).catch((err) => {
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
                localStorage.setItem('authToken', JSON.stringify(info.data));
                commit("getUserInfoSuccess", info.data);
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
                console.log(info);
                commit("getAllEmployeesSuccess", info.data.employee);
            },
        ).catch((err) => {
            const { data } = err.response
            dispatch('alert/error', data.error.code, { root: true });
            commit('getUserInfoFailed', data.error);
        })
    },
    getEmployeeByID({commit , dispatch}, id) {
        return employeeService.getEmployeeByID(id).then(
            info => {
                console.log(info.data)
                commit("getUserByIdSuccess", info.data);
            }
        ).catch((err) => {
            if (err.response) {
                const { status, data } = err.response
                dispatch('alert/error', data.error.code, { root: true });
                commit('getUserByIdFailed', data.error);
            }
        })
    },
    registerEmployees({commit, dispatch}, inputFile) {
        console.log(inputFile)
        return employeeService.registerEmployees(inputFile).then(
            info => {
                commit ("getAllEmployeesSuccess", info.data)
            }
        ).catch((err) => {
            if (err.response) {
                const { status, data } = err.response
                dispatch('alert/error', data.error.code, { root: true });
            }
        })
    },

    updateEmployee({commit, dispatch}, input) {
        return employeeService.updateEmployee(input.params, input.body).then((info) => {
            console.log(info)
            return info
        }).catch((err) => {
            if (err.response) {
                const { data } = err.response
                dispatch('alert/error', data.error.code, { root: true });
            }
            
        })
    },
    shareDoc({commit, dispatch}, input) {
        return employeeService.shareDoc(input).then((info) => {
            return info.data
        }).catch((err) => {
            if (err.response) {
                const { data } = err.response
                dispatch('alert/error', data.error.code, { root: true });
            }
            
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
    getUserByIdSuccess(state, employee){
        state.status = {};
        state.employee = employee;
    },
    getUserByIdFailed(state, error){
        state.status = {};
        state.err = error;
    },
};

export const employees = {
    namespaced: true,
    state,
    actions,
    mutations
};
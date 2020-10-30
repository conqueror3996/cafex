import { employeeService } from '../_services';
import { auth, router } from '../_helpers';


const state = { status: {}, employee: null, err: '' };
const actions = {
    login({ dispatch, commit }, { username, password }) {
        commit('loginRequest', { username });
        employeeService.login(username, password)
            .then(
                info => {
                    console.log(info)
                    if (info) {
                        if (info.error) {
                            dispatch('alert/error', info.error.code, { root: true });
                            commit('loginFailure', info.error);
                        } else {
                            dispatch('alert/success', info.status + " Login Success", { root: true });
                            commit('loginSuccess', info);
                            dispatch("userInfo");
                            //check permission (first login, manager, sale)
                            // router.push('/WA01010300');
                        }
                    }
                }
            );
        
    },
    logout({ commit }) {
        employeeService.logout().then((info) => {
            if (info.error.code) {
                dispatch('alert/error', info.error.code, { root: true });
            } else {
                commit('logout');
                auth.clearAuthToken();
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
        employeeService.getEmployeeUserinfo().then(
            info => {
                if(info){
                    if(info.error){
                        dispatch('alert/error', info.error.code, { root: true });
                        commit('getUserInfoFailed', info.error);
                    }else{
                        localStorage.setItem('userInfo', info);
                        commit("getUserInfoSuccess", info);
                    }
                }
            },
            error => {
                commit("getUserInfoFailed", error);
            }
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
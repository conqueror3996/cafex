import { userService } from '../_services';
import { router } from '../_helpers';

const user = JSON.parse(localStorage.getItem('user'));
const state = user
    ? { status: { loggedIn: true }, user, err: '' }
    : { status: {}, user: null, err: '' };

const actions = {
    login({ dispatch, commit }, { username, password }) {
        commit('loginRequest', { username });
    
        userService.login(username, password)
            .then(
                user => {
                    commit('loginSuccess', user);
                    router.push('/WA01010300');
                },
                error => {
                    commit('loginFailure', error);
                    dispatch('alert/error', error, { root: true });
                }
            );
    },
    logout({ commit }) {
        userService.logout();
        commit('logout');
    },
    register({ dispatch, commit }, user) {
        commit('registerRequest', user);
    
        userService.register(user)
            .then(
                user => {
                    commit('registerSuccess', user);
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
        userService.changePassword(input).then(
            user => {
                // commit('changePasswordSuccess', user);
                router.push('/WA01010201');
                // Xóa hết dữ liệu
                setTimeout(() => {
                    // display success message after route change completes
                    dispatch('alert/success', 'Change Password successful', { root: true });
                })
            },
            error => {
                commit('changePasswordFailed', error);
                dispatch('alert/error', error, { root: true });
            }
        );

    }
};

const mutations = {
    loginRequest(state, user) {
        state.status = { loggingIn: true };
        state.user = user;
    },
    loginSuccess(state, user) {
        state.status = { loggedIn: true };
        state.user = user;
    },
    loginFailure(state, error) {
        state.status = {};
        state.user = null;
        state.err = error;
    },
    logout(state) {
        state.status = {};
        state.user = null;
    },
    registerRequest(state, user) {
        state.status = { registering: true };
    },
    registerSuccess(state, user) {
        state.status = {};
    },
    registerFailure(state, error) {
        state.status = {};
    }
    // changePasswordSuccess(state) {

    // }
};

export const account = {
    namespaced: true,
    state,
    actions,
    mutations
};
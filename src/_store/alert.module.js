import { errorMsg } from '../common'

const state = {
    type: null,
    message: null,
};

const actions = {
    success({ commit }, message) {
        commit('success', message);
    },
    error({ commit }, code) {
        if (errorMsg.respone_error[code]) {
            commit('error', errorMsg.respone_error[code].detail);
        } else {
            console.log(code)
            commit('error', `内部のエラーとなります。再度実行頂き、継続して発生する場合サポートにお問い合わせください。S${code}`);
        }
    },
    errorMsg({ commit }, message) {
        commit('error', message);
    },
    clear({ commit }) {
        commit('clear');
    }
};

const mutations = {
    success(state, message) {
        state.type = 'alert-success';
        state.message = message;
    },
    error(state, message) {
        state.type = 'alert-danger';
        state.message = message;
    },
    clear(state) {
        state.type = null;
        state.message = null;
    }
};

export const alert = {
    namespaced: true,
    state,
    actions,
    mutations
};

import { consumerService } from '../_services';
import { router } from '../_helpers';

const state = {
    all: {},
    single: {},
    count: 1,
    boo: false,
};

const actions = {
    getAll({ dispatch, commit }, input) {
        commit('getAllRequest');

        consumerService.getAll(input)
            .then(
                datas => {
                    if (datas.data.code) {
                        dispatch('alert/error', datas.data.message, { root: true });
                    } else {
                        commit('getAllSuccessGet', datas)
                    }
                }
            );
    },

    getConsumerByID({ dispatch, commit }, id) {
        commit('getAllRequest');

        consumerService.getConsumerById(id)
            .then(
                datas => {
                    if (datas.data.code) {
                        dispatch('alert/error', datas.data.message, { root: true });
                    } else {
                        commit('getAllSuccessGet', datas)
                    }
                }
                
            );
    },

    deleteConsumer({ commit }, id) {
        commit('deleteRequest', id);

        consumerService.deleteConsumer(id)
            .then(
                user => commit('deleteSuccess', id),
                error => commit('deleteFailure', { id, error: error.toString() })
            );
    },

    postConsumer({ commit, dispatch }, input) {
        consumerService.postConsumer(input).then((info) => {
            if (info.data.code) {
                dispatch('alert/error', info.data.message, { root: true });
            } else {
                // commit('getAllSuccessGet', datas)
            }
        })
    },

    updateConsumer({commit, dispatch}, employeeId, input) {
        consumerService.updateConsumer(employeeId, input).then((info) => {
            if (info.data.code) {
                dispatch('alert/error', info.data.message, { root: true });
            } else {
                // commit('getAllSuccessGet', datas)
            }
        })
    },

    setUserDetail({ commit }, detail) {
        commit('setUserSingle', detail);
    },

    goToFileManagement({ commit }, detail) {
        commit('setUserSingle', detail);
        // Goi service lay thong tin user hoac luu vao localstorage
        router.push('/WA01010500');
    }
};

const mutations = {
    getAllRequest(state) {
        state.all = { loading: true };
    },
    getAllSuccessGet(state, users) {
        state.all = { items: users.data.Customers };
    },
    getAllFailureGet(state, error) {
        state.all = { error };
    },
    getAllSuccessPost(state, users) {
        state.all = { items: users.data.Customers };
    },
    getAllFailurePost(state, error) {
        state.all = { error };
    },
    deleteRequest(state, id) {
        // add 'deleting:true' property to user being deleted
        state.all.items = state.all.items.map(user =>
            user.id === id
                ? { ...user, deleting: true }
                : user
        )
    },
    deleteSuccess(state, id) {
        // remove deleted user from state
        state.all.items = state.all.items.filter(user => user.id !== id)
    },
    deleteFailure(state, { id, error }) {
        // remove 'deleting:true' property and add 'deleteError:[error]' property to user 
        state.all.items = state.items.map(user => {
            if (user.id === id) {
                // make copy of user without 'deleting:true' property
                const { deleting, ...userCopy } = user;
                // return copy of user with 'deleteError:[error]' property
                return { ...userCopy, deleteError: error };
            }

            return user;
        })
    },
    setUserSingle(state, detail) {
            state.single = detail 
    }
};

export const consumers = {
    namespaced: true,
    state,
    actions,
    mutations
};

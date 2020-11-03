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

        return consumerService.getAll(input)
            .then(
                info => {
                    if (info.data.code) {
                        dispatch('alert/error', info.data.message, { root: true });
                    } else {
                        commit('getAllSuccessGet', info)
                    }
                }
            ).catch((err) => {
                console.log(err)
                if (err.response) {
                    const { data } = err.response
                    dispatch('alert/error', data.error.code, { root: true });
                }
            });
    },

    getConsumerByID({ dispatch, commit }, id) {
        commit('getAllRequest');

        return consumerService.getConsumerById(id)
            .then(
                info => {
                    if (info.data.code) {
                        dispatch('alert/error', info.data.message, { root: true });
                    } else {
                        
                        commit('getSingleSuccessGet', info)
                    }
                }
                
            );
    },

    deleteConsumer({ commit }, id) {
        commit('deleteRequest', id);

        return consumerService.deleteConsumer(id)
            .then((info) => {
                    commit('deleteSuccess', info)
                }
            ).catch((err) => {
                if (err.response) {
                    const { data } = err.response
                    commit('deleteFailure', { id, error: data.error.code })
                }
            });
    },

    addConsumer({ commit, dispatch }, input) {
        consumerService.addConsumer(input).then((info) => {
            if (info.data.code) {
                dispatch('alert/error', info.data.message, { root: true });
            } else {
                // commit('getAllSuccessGet', datas)
            }
        })
    },

    updateConsumer({commit, dispatch}, input) {
        return consumerService.updateConsumer(input.params, input.body).then((info) => {
            console.log(info)
            return info
        }).catch((err) => {
            if (err.response) {
                const { data } = err.response
                dispatch('alert/error', data.error.code, { root: true });
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
        state.all = { items: users.data.consumer };
    },
    getAllFailureGet(state, error) {
        state.all = { error };
    },
    getAllSuccessPost(state, users) {
        state.all = { items: users.data.consumer };
    },
    getAllFailurePost(state, error) {
        state.all = { error };
    },
    getSingleSuccessGet(state, users) {
        state.single = { item: users.data };
    },
    getSingleFailureGet(state, error) {
        state.single = { error };
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

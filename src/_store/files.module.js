import { fileService } from '../_services';

const state = {
    all: {}
};

const actions = {

    addFile({ dispatch, commit }, fileType, input) {

        fileService.addFile(fileType, input)
            .then(
                info => {
                    // if (info.error.code) {
                    //     dispatch('alert/error', info.error.code, { root: true });
                    // } else {
                        
                    // }
                }
            ).catch((err) => {
                const { data } = err.response
                dispatch('alert/error', data.error.code, { root: true });
            });
    },

    deleteFile({ commit }, fileType, fileId) {
        commit('deleteRequest', fileId);

        fileService.deleteFile(fileType, fileId)
            .then(
                user => commit('deleteSuccess', id),
            ).catch((err) => {
                const { data } = err.response
                dispatch('alert/error', data.error.code, { root: true });
                // commit('deleteFailure', data.error);
            });
    }
};

const mutations = {
    getAllRequest(state) {
        state.files = { loading: true };
    },
    getAllSuccess(state, files) {
        state.files = { items: files };
    },
    getAllFailure(state, error) {
        state.files = { error };
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
        // state.all.items = state.all.items.filter(file => file.id !== id)
    },
    deleteFailure(state, { id, error }) {
        // remove 'deleting:true' property and add 'deleteError:[error]' property to user 
        // state.all.items = state.items.map(user => {
        //     if (user.id === id) {
        //         // make copy of user without 'deleting:true' property
        //         const { deleting, ...userCopy } = user;
        //         // return copy of user with 'deleteError:[error]' property
        //         return { ...userCopy, deleteError: error };
        //     }

        //     return user;
        // })
    }
};

export const files = {
    namespaced: true,
    state,
    actions,
    mutations
};

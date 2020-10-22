import { fileService } from '../_services';

const state = {
    files: {}
};

const actions = {
    editItem({ commit }, id) {
        commit('getAllRequest');

        fileService.getFilesByUserId(id)
            .then(
                files => commit('getAllSuccess', files),
                error => commit('getAllFailure', error)
            );
    },

    // delete({ commit }, id) {
    //     commit('deleteRequest', id);

    //     userService.delete(id)
    //         .then(
    //             user => commit('deleteSuccess', id),
    //             error => commit('deleteFailure', { id, error: error.toString() })
    //         );
    // }
};

const mutations = {
    getAllRequest(state) {
        state.files = { loading: true };
    },
    getAllSuccess(state, files) {
        state.files = { items: files.FilesList };
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
    }
};

export const files = {
    namespaced: true,
    state,
    actions,
    mutations
};

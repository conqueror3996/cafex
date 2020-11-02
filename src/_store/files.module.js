import { fileService } from '../_services';

const state = {
    all: {}
};

const actions = {

    getDocFile({ dispatch, commit },orgCd) {
        return fileService.getFileInternal(`static/params/${orgCd}/doc-list.json`);
    },

    getAllFile({ dispatch, commit }, input) {
        return fileService.getFileList("0001", input)
    },

    addFile({ dispatch, commit }, fileType, input) {

        fileService.addFile(fileType, input)
            .then(
                info => {
                    if (info.error.code) {
                        dispatch('alert/error', info.error.code, { root: true });
                    } else {
                        
                    }
                }
            );
    },

    deleteFile({ commit }, fileType, fileId) {
        commit('deleteRequest', fileId);

        fileService.deleteFile(fileType, fileId)
            .then(
                user => commit('deleteSuccess', id),
            );
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

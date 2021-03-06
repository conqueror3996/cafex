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

    addFile({ dispatch, commit }, input) {
        return fileService.addFile(input.fileType, input.data).catch((err) => {
                const { data } = err.response
                dispatch('alert/error', data.error.code, { root: true });
            });
    },

    deleteFile({ commit }, file) {
        // commit('deleteRequest', fileId);

        return fileService.deleteFile(file.fileType, file.fileId)
        .catch((err) => {
            const { data } = err.response
            dispatch('alert/error', data.error.code, { root: true });
        });
    }
};

const mutations = {
    getAllRequest(state) {
        state.files = { loading: true };
    },
    getAllSuccess(state, data) {
        state.files = { items: data };
    },
    getAllFailure(state, error) {
        state.files = { error };
    },
    // deleteRequest(state, id) {
    //     // add 'deleting:true' property to user being deleted
    //     state.all.items = state.all.items.map(user =>
    //         user.id === id
    //             ? { ...user, deleting: true }
    //             : user
    //     )
    // },
    // deleteSuccess(state, id) {
        
    // },
    // deleteFailure(state, { id, error }) {

    // }
};

export const files = {
    namespaced: true,
    state,
    actions,
    mutations
};

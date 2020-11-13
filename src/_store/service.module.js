const state = {
    serviceConfig: {},
};

const actions = {
    setServiceConfig({ commit }, config) {
        commit('setServiceConfig', config)
    },
};

const mutations = {
    setServiceConfig(state, config) {
        console.log("set config", config)
        state.serviceConfig = config
        console.log("state.serviceConfig", state.serviceConfig)
    }
};

export const service = {
    namespaced: true,
    state,
    actions,
    mutations
};

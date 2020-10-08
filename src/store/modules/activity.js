export default {
    state: {
        fetching: false
    },
    mutations: {
        setFetching: (state, val) => {
            state.fetching = val;
        }
    },
    actions: {
        startFetch: ({commit}, ) => {
            commit('setFetching', true);
        },
        endFetch: ({commit}, ) => {
            commit('setFetching', false);
        }
    },
};
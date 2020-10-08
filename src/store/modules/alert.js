export default {
    state: {
        message: null
    },
    mutations: {
        setAlert(state, message) {
            state.message = message;
        }
    },
    actions: {
        alert({commit}, message) {
            commit('setAlert', message);
        },
        closeAlert({commit}) {
            commit('setAlert', null);
        }
    }
};
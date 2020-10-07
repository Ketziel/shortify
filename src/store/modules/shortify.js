import ShortifyModel from '../../models/ShortifyModel';

export default {
    state: {
        shortifyFormModel: null
    },
    mutations: {
        setShortifyFormModel: (state, model) => {
            state.shortifyFormModel = model;
        }
    },
    actions: {
        createShortifyFormModel: ({commit}) => {
            commit('setShortifyFormModel', new ShortifyModel());
        }
    },
};
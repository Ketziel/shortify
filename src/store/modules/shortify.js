import ShortifyModel from '../../models/ShortifyModel';

export default {
    state: {
        shortifyFormModel: null,
        shortifyHistory: []
    },
    mutations: {
        setShortifyFormModel: (state, model) => {
            state.shortifyFormModel = model;
        },
        setShortifyFormModelFieldValue: (state, {fieldName, value}) => {
            state.shortifyFormModel.fields[fieldName].value = value;
        },
        pushToHistory: (state, entry) => {
            state.shortifyHistory.unshift(entry);
        }
    },
    actions: {
        createShortifyFormModel: ({commit}) => {
            commit('setShortifyFormModel', new ShortifyModel());
        },
        updateShortifyFormModel: ({commit}, {fieldName, value}) => {
            commit('setShortifyFormModelFieldValue', {fieldName: fieldName, value: value});
        },
        addToHistory: ({commit}, entry) => {
            commit('pushToHistory', entry);
        }
    },
};
import ShortifyModel from '../../models/ShortifyModel';

export default {
    state: {
        shortifyFormModel: null
    },
    mutations: {
        setShortifyFormModel: (state, model) => {
            state.shortifyFormModel = model;
        },
        setShortifyFormModelFieldValue: (state, {fieldName, value}) => {
            state.shortifyFormModel.fields[fieldName].value = value;
        }
    },
    actions: {
        createShortifyFormModel: ({commit}) => {
            commit('setShortifyFormModel', new ShortifyModel());
        },
        updateShortifyFormModel: ({commit}, {fieldName, value}) => {
            commit('setShortifyFormModelFieldValue', {fieldName: fieldName, value: value});
        }
    },
};
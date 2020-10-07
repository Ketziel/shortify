import Vue from 'vue'
import Vuex from 'vuex'

import shortify from './modules/shortify'

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        shortify
    }
})

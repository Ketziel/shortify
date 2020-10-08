import Vue from 'vue'
import Vuex from 'vuex'

import shortify from './modules/shortify'
import alert from './modules/alert'

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        shortify,
        alert
    }
})

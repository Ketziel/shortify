import Vue from 'vue'
import Vuex from 'vuex'

import activity from './modules/activity'
import shortify from './modules/shortify'
import alert from './modules/alert'

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        activity,
        shortify,
        alert
    }
})

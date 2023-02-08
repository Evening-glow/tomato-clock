import Vuex from 'vuex'
import Vue from 'vue'
import clock from './clock'
import list from './list'
Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        clock,
        list
    }
});
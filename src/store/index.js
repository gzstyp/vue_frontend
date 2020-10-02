import Vue from 'vue';
import Vuex from 'vuex';
import tab from "./tab";
Vue.use(Vuex);
export default new Vuex.Store({
    modules : {
        tab//已简写了,默认是 tab : tab
    }
});
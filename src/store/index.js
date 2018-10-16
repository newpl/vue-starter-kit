import Vue from 'vue';
import Vuex from 'vuex';
import loginStore from './login';
import ES6Promise from 'es6-promise';

ES6Promise.polyfill();

Vue.use(Vuex);

const store = new Vuex.Store({
    modules : {
        loginStore : loginStore
    }
});

export default store;
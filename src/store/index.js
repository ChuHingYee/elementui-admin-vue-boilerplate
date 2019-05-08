import Vue from 'vue';
import Vuex from 'vuex';
import app from './mudules/app';
import user from './mudules/user';
import permission from './mudules/permission';
import tabs from './mudules/tabs';
import getters from './getters';

Vue.use(Vuex);
const store = new Vuex.Store({
  modules: {
    app,
    user,
    permission,
    tabs
  },
  getters
});

export default store;

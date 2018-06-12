import Vue from 'vue'
import Vuex from 'vuex';
import coins from './coins';
import user from './user';

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    coins,
    user
  }
});

export default store;
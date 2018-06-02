import Vue from 'vue'
import Vuex from 'vuex';
import coins from './coins';

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    coins
  }
});

export default store;